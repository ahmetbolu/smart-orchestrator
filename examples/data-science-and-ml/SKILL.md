---
name: data-science-and-ml
description: "Data analysis, machine learning pipelines, and Python optimization."
version: 1.0.0
---

# Data Science & ML Guidelines

This skill is invoked for Python scripts dealing with data manipulation, Pandas, or AI/ML model training.

## Core Directives

1. **Memory & Performance Optimization:**
   - Avoid iterating over rows in Pandas (no `iterrows()`). Always use vectorized operations.
   - Downcast numerical columns to the smallest possible data type (`int8`, `float32`) to save memory when processing large datasets.

2. **Pipeline Reproducibility:**
   - Ensure a fixed `random_state` or seed is used for all ML model training and data splits to guarantee reproducible results.
   - Separate data cleaning logic from model training logic.

3. **Data Handling & Cleaning:**
   - Handle missing values explicitly (imputation or dropping). Do not let models silently fail due to `NaN` values.
   - Never expose raw PII (Personally Identifiable Information) in notebooks or outputs. Ensure data masking is applied before logging or saving.
