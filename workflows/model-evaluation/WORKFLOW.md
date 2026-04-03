---
id: model-evaluation
name: Model Evaluation
description: Weekly ML model performance review
schedule: 0 14 * * 5
executionMode: managed
owner: ml-engineer
type: recurring
dependsOn:
  - pipeline-monitoring
  - data-quality-check
targeting:
  communities: []
  groups:
    - ML
  tags: []
  agents:
    - ml-engineer
---

# Weekly Model Evaluation

1. Pull inference metrics for all deployed models (accuracy, latency, error rate)
2. Compare current performance against baseline and SLA thresholds
3. Check for data drift — distribution shifts in input features
4. Recommend retraining if metrics degraded beyond threshold
5. Post model performance report to Status group with trend charts
