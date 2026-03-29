import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const repoRoot = process.cwd();
const workflowsDir = path.join(repoRoot, "workflows");

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const agentPattern = /^[a-z0-9]+(?:[-_][a-z0-9]+)*$/;
const cronFieldPattern = /^(\*|\d+|\d+-\d+|\*\/\d+|\d+(?:,\d+)+|\d+-\d+\/\d+)$/;

function parseScalar(rawValue) {
  const value = rawValue.trim();

  if (value === "[]") {
    return [];
  }

  if (value === "true") {
    return true;
  }

  if (value === "false") {
    return false;
  }

  if (/^-?\d+$/.test(value)) {
    return Number(value);
  }

  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    return value.slice(1, -1);
  }

  return value;
}

function parseYamlSubset(frontmatter, file) {
  const lines = frontmatter
    .split("\n")
    .map((line) => line.replace(/\r$/, ""))
    .filter((line) => line.trim() !== "");

  function parseBlock(startIndex, indent) {
    if (startIndex >= lines.length) {
      return { value: {}, nextIndex: startIndex };
    }

    const firstLine = lines[startIndex];
    const firstIndent = firstLine.match(/^ */)[0].length;

    if (firstIndent !== indent) {
      throw new Error(`invalid indentation near "${firstLine.trim()}"`);
    }

    if (firstLine.trim().startsWith("- ")) {
      const items = [];
      let index = startIndex;

      while (index < lines.length) {
        const line = lines[index];
        const lineIndent = line.match(/^ */)[0].length;
        const trimmed = line.trim();

        if (lineIndent < indent) {
          break;
        }

        if (lineIndent !== indent || !trimmed.startsWith("- ")) {
          throw new Error(`invalid list item near "${trimmed}"`);
        }

        const value = trimmed.slice(2).trim();
        if (value === "") {
          throw new Error(
            `nested list items are not supported near "${trimmed}"`,
          );
        }

        items.push(parseScalar(value));
        index += 1;
      }

      return { value: items, nextIndex: index };
    }

    const object = {};
    let index = startIndex;

    while (index < lines.length) {
      const line = lines[index];
      const lineIndent = line.match(/^ */)[0].length;
      const trimmed = line.trim();

      if (lineIndent < indent) {
        break;
      }

      if (lineIndent !== indent) {
        throw new Error(`invalid indentation near "${trimmed}"`);
      }

      const colonIndex = trimmed.indexOf(":");
      if (colonIndex === -1) {
        throw new Error(`expected key/value pair near "${trimmed}"`);
      }

      const key = trimmed.slice(0, colonIndex).trim();
      const rest = trimmed.slice(colonIndex + 1);

      if (rest.trim() === "") {
        if (index + 1 >= lines.length) {
          object[key] = {};
          index += 1;
          continue;
        }

        const nextLine = lines[index + 1];
        const nextIndent = nextLine.match(/^ */)[0].length;

        if (nextIndent <= indent) {
          object[key] = {};
          index += 1;
          continue;
        }

        const parsed = parseBlock(index + 1, indent + 2);
        object[key] = parsed.value;
        index = parsed.nextIndex;
        continue;
      }

      object[key] = parseScalar(rest);
      index += 1;
    }

    return { value: object, nextIndex: index };
  }

  try {
    return parseBlock(0, 0).value;
  } catch (error) {
    throw new Error(`${file}: invalid YAML frontmatter: ${error.message}`);
  }
}

function isPlainObject(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function validateCron(schedule) {
  if (schedule === "manual" || schedule === "once") {
    return true;
  }

  const parts = schedule.split(/\s+/);
  return (
    parts.length === 5 && parts.every((part) => cronFieldPattern.test(part))
  );
}

function validateWorkflow(frontmatter, body, file) {
  const errors = [];
  const allowedKeys = new Set([
    "id",
    "name",
    "description",
    "schedule",
    "enabled",
    "executionMode",
    "owner",
    "type",
    "author",
    "created",
    "modified",
    "maxRuns",
    "dependsOn",
    "targeting",
  ]);

  for (const key of Object.keys(frontmatter)) {
    if (!allowedKeys.has(key)) {
      errors.push(`${file}: frontmatter contains unsupported field "${key}"`);
    }
  }

  const requiredStringFields = [
    "name",
    "description",
    "schedule",
    "executionMode",
    "type",
  ];
  for (const field of requiredStringFields) {
    if (
      typeof frontmatter[field] !== "string" ||
      frontmatter[field].trim() === ""
    ) {
      errors.push(
        `${file}: "${field}" is required and must be a non-empty string`,
      );
    }
  }

  if ("enabled" in frontmatter && typeof frontmatter.enabled !== "boolean") {
    errors.push(`${file}: "enabled" must be a boolean`);
  }

  if (
    "maxRuns" in frontmatter &&
    (!Number.isInteger(frontmatter.maxRuns) || frontmatter.maxRuns < 0)
  ) {
    errors.push(
      `${file}: "maxRuns" must be an integer greater than or equal to 0`,
    );
  }

  if (
    "id" in frontmatter &&
    (!frontmatter.id || !slugPattern.test(frontmatter.id))
  ) {
    errors.push(`${file}: "id" must use lowercase kebab-case`);
  }

  if (
    "owner" in frontmatter &&
    (!frontmatter.owner || !agentPattern.test(frontmatter.owner))
  ) {
    errors.push(
      `${file}: "owner" must use lowercase letters, numbers, dashes, or underscores`,
    );
  }

  if (
    frontmatter.executionMode &&
    !["automated", "managed"].includes(frontmatter.executionMode)
  ) {
    errors.push(`${file}: "executionMode" must be "automated" or "managed"`);
  }

  if (
    frontmatter.executionMode === "managed" &&
    typeof frontmatter.owner !== "string"
  ) {
    errors.push(`${file}: managed workflows require an "owner"`);
  }

  if (
    frontmatter.type &&
    !["once", "recurring", "conditional"].includes(frontmatter.type)
  ) {
    errors.push(
      `${file}: "type" must be "once", "recurring", or "conditional"`,
    );
  }

  if (
    typeof frontmatter.schedule === "string" &&
    !validateCron(frontmatter.schedule)
  ) {
    errors.push(
      `${file}: schedule must be "manual", "once", or a 5-field cron expression`,
    );
  }

  if ("dependsOn" in frontmatter) {
    if (!Array.isArray(frontmatter.dependsOn)) {
      errors.push(`${file}: "dependsOn" must be an array`);
    } else {
      for (const dependency of frontmatter.dependsOn) {
        if (typeof dependency !== "string" || !slugPattern.test(dependency)) {
          errors.push(
            `${file}: dependsOn entry "${dependency}" must use lowercase kebab-case`,
          );
        }
      }
    }
  }

  if (
    frontmatter.type === "conditional" &&
    (!Array.isArray(frontmatter.dependsOn) ||
      frontmatter.dependsOn.length === 0)
  ) {
    errors.push(
      `${file}: conditional workflows require at least one dependsOn entry`,
    );
  }

  if (!isPlainObject(frontmatter.targeting)) {
    errors.push(`${file}: "targeting" is required and must be an object`);
  } else {
    const targetingKeys = ["communities", "groups", "tags", "agents"];
    const extraTargetingKeys = Object.keys(frontmatter.targeting).filter(
      (key) => !targetingKeys.includes(key),
    );

    for (const key of extraTargetingKeys) {
      errors.push(`${file}: targeting contains unsupported field "${key}"`);
    }

    let targetedCount = 0;
    for (const key of targetingKeys) {
      const value = frontmatter.targeting[key];
      if (!Array.isArray(value)) {
        errors.push(`${file}: targeting.${key} must be an array`);
        continue;
      }

      targetedCount += value.length;

      for (const item of value) {
        if (typeof item !== "string" || item.trim() === "") {
          errors.push(
            `${file}: targeting.${key} entries must be non-empty strings`,
          );
        }
      }
    }

    if (Array.isArray(frontmatter.targeting.agents)) {
      for (const agent of frontmatter.targeting.agents) {
        if (!agentPattern.test(agent)) {
          errors.push(`${file}: targeting.agents entry "${agent}" is invalid`);
        }
      }
    }

    if (targetedCount === 0) {
      errors.push(
        `${file}: targeting must include at least one community, group, tag, or agent`,
      );
    }
  }

  if (body.trim() === "") {
    errors.push(`${file}: body must not be empty`);
  } else {
    const firstLine = body.trim().split("\n")[0].trim();
    if (!firstLine.startsWith("# ")) {
      errors.push(`${file}: body must start with an H1 heading`);
    }
  }

  return errors;
}

async function getWorkflowFiles() {
  const entries = await fs.readdir(workflowsDir, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => path.join("workflows", entry.name, "WORKFLOW.md"))
    .sort();
}

const workflowFiles = await getWorkflowFiles();

if (workflowFiles.length === 0) {
  console.error("No workflow files found in workflows/*/WORKFLOW.md");
  process.exit(1);
}

const errors = [];

for (const file of workflowFiles) {
  const absolutePath = path.join(repoRoot, file);
  const raw = await fs.readFile(absolutePath, "utf8");
  const match = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);

  if (!match) {
    errors.push(
      `${file}: file must start with YAML frontmatter delimited by ---`,
    );
    continue;
  }

  const [, frontmatterBlock, body] = match;
  const frontmatter = parseYamlSubset(frontmatterBlock, file);
  errors.push(...validateWorkflow(frontmatter, body, file));
}

if (errors.length > 0) {
  console.error("WORKFLOW.md validation failed:\n");
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

console.log(`Validated ${workflowFiles.length} workflow files successfully.`);
