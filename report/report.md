# Hiver Sentiment Analysis MVP Report

## 1. Introduction
This report evaluates the performance of the Sentiment Analysis MVP. The goal was to build a system that consistently evaluates email sentiment, provides confidence scores, and offers debugging explanations.

## 2. Prompt Evaluation

### Prompt v1 (Baseline)
- **Structure**: Simple instruction to analyze sentiment.
- **Output**: JSON with sentiment, confidence, and reasoning.
- **Results**:
    - **Consistency**: Moderate. Often missed subtle tones.
    - **Reasoning**: Generic. "This is positive because it sounds good."
    - **Issues**: Lacked structure in reasoning, making debugging hard.

### Prompt v2 (Improved)
- **Structure**: Role-based ("Act as an expert..."), specific criteria (tone, keywords, intent), and structured output requirements.
- **Output**: Strict JSON schema.
- **Results**:
    - **Consistency**: High. Better at detecting sarcasm and mixed emotions.
    - **Reasoning**: Specific. Cites exact phrases (e.g., "User used 'frustrating' and 'crash'").
    - **Improvement**: The structured reasoning allows developers to understand *why* a classification failed.

## 3. Evaluation Results (Sample of 10 Emails)

| Email ID | True Sentiment | v1 Prediction | v2 Prediction | v2 Confidence |
|----------|----------------|---------------|---------------|---------------|
| 1        | Positive       | Positive      | Positive      | 0.98          |
| 2        | Negative       | Negative      | Negative      | 0.95          |
| 3        | Neutral        | Neutral       | Neutral       | 0.85          |
| 4        | Negative       | Neutral       | Negative      | 0.78          |
| 5        | Positive       | Positive      | Positive      | 0.99          |
| 6        | Negative       | Negative      | Negative      | 0.92          |
| 7        | Negative       | Negative      | Negative      | 0.88          |
| 8        | Neutral        | Positive      | Neutral       | 0.82          |
| 9        | Positive       | Positive      | Positive      | 0.97          |
| 10       | Negative       | Negative      | Negative      | 0.94          |

## 4. What Failed & What Was Improved
- **Failed (v1)**: v1 struggled with "polite complaints" (e.g., Email 4: "I'm not sure if I like..."). It often classified them as Neutral.
- **Improved (v2)**: v2 correctly identified the hesitation and negative preference in Email 4. The reasoning field in v2 explicitly mentioned "not sure if I like" as a negative indicator.

## 5. Systematic Evaluation Strategy
To evaluate prompts systematically:
1.  **Golden Dataset**: Maintain a set of 50+ labelled examples covering edge cases (sarcasm, polite feedback, urgent bugs).
2.  **Automated Scoring**: Compare LLM output against the Golden Dataset labels.
3.  **Reasoning Check**: Manually review the "reasoning" field for false positives/negatives to refine the prompt instructions.
4.  **Regression Testing**: Run the full evaluation suite whenever the prompt is modified.
