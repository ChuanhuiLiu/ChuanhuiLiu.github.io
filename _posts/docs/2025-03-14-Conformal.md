---
title: "Conformal Prediction & Inferential Tests"
excerpt: "Distribution-free uncertainty quantification in the age of Deep Learning"
header:
  teaser: assets/images/gif/tutorial.gif
author_profile: true
permalink: /:categories/:title/
breadcrumbs: true
last_modified_at: 2025-02-25
classes: wide
categories:
  - Notebooks
tags:
  - Statistics
  - Machine Learning
---

---

## 1. The core idea

Modern AI models are powerful at producing **point predictions**:

- a neural network predicts a class label,
- a random forest predicts a response value,
- a foundation-model-based system predicts the next action,
- a clinical model predicts risk,
- an autonomous-system model predicts future trajectories.

But high-stakes decision-making problems usually needs more than a point estimate. We want to know:

> How much should I trust this prediction?

**Conformal prediction** is a statistical framework for turning almost any predictive model into a **prediction set** or **prediction interval** with a formal coverage guarantee. Instead of outputting only $\hat{y} = f(x)$, it outputs a set $C(x)$, such that the true outcome is covered with a user-chosen probability, for example 90% or 95%. For regression, this may look like:

$$
C(x) = [\hat{y}(x) - q,\; \hat{y}(x) + q].
$$

For classification, this may look like:

$$
C(x) = \{\text{cat}, \text{dog}\}
$$

rather than forcing the model to choose only one label.

The key appeal is that conformal prediction is **distribution-free**: it does not require the data to be Gaussian, the model to be correctly specified, or the neural network probabilities to be perfectly calibrated. Under exchangeability of the calibration and test data, conformal methods provide finite-sample coverage guarantees.[^shafer2008][^angelopoulos2021]

---

## 2. How conformal prediction wraps any deterministic model

A useful way to understand conformal prediction is:

> Train any model first. Then use held-out calibration data to measure how wrong it usually is.

Suppose we have a deterministic prediction model

$$
f: x \mapsto \hat{y}.
$$

This model could be a neural network, random forest, gradient boosting model, transformer, clinical risk model, or simulation-based predictor. Conformal prediction does not require changing the internal architecture of the model. It only needs a **nonconformity score**, which measures how unusual or wrong a prediction is.

### Regression example

Train a model on one part of the data. On a separate calibration set, compute residual scores:

$$
s_i = |y_i - f(x_i)|.
$$

Then choose a high quantile of these scores, say the 90th percentile, denoted by $q$. For a new point $x_{n+1}$, output:

$$
C(x_{n+1}) = [f(x_{n+1}) - q,\; f(x_{n+1}) + q].
$$

The interval width is not learned from a Bayesian posterior. It is calibrated from how large the model errors were on held-out examples.

### Classification example

For a neural network classifier that outputs softmax probabilities, a simple score is:

$$
s_i = 1 - \hat{p}_{y_i}(x_i),
$$

where $\hat{p}_{y_i}(x_i)$ is the predicted probability assigned to the true label. A class is included in the prediction set if its score is not too extreme relative to the calibration scores.

This means conformal prediction can be placed **on top of existing AI systems** as a post-hoc uncertainty layer. That is why it is especially attractive in the age of deep learning: large neural networks are often deterministic black boxes, but conformal prediction can still wrap them with calibrated uncertainty sets.[^angelopoulos2021][^papadopoulos2002]

---

## 3. The guarantee: marginal coverage

The canonical conformal guarantee is **marginal coverage**:

$$
\mathbb{P}\{Y_{n+1} \in C(X_{n+1})\} \geq 1 - \alpha.
$$

For example, if $\alpha = 0.1$, then conformal prediction targets 90% coverage.

In words:

> Over repeated draws of a new test point from the same exchangeable data-generating process, the conformal prediction set contains the true label at least $1 - \alpha$ of the time.

This is a powerful guarantee because it is:

1. **finite-sample**, not merely asymptotic;
2. **model-agnostic**, valid for arbitrary black-box predictors;
3. **distribution-free**, requiring exchangeability rather than a parametric distribution;
4. **post-hoc**, often requiring only a calibration set after model training.[^vovk2005][^shafer2008][^angelopoulos2021]

This is why conformal prediction has become important for modern AI: it provides a statistically principled uncertainty wrapper for models that may otherwise be hard to interpret, poorly calibrated, or too complex for classical likelihood-based inference.

---

## 4. The limitation: marginal is not conditional

Marginal coverage does **not** mean the model is equally reliable for every individual input.

The marginal guarantee says:

$$
\mathbb{P}\{Y \in C(X)\} \geq 1 - \alpha.
$$

But a stronger guarantee would be **conditional coverage**:

$$
\mathbb{P}\{Y \in C(X) \mid X=x\} \geq 1 - \alpha
\quad \text{for every } x.
$$

That would mean: for every possible patient, road condition, image, molecule, or user profile, the prediction set is valid at the desired level.

This is much stronger and generally impossible in a fully distribution-free setting. Barber, Candès, Ramdas, and Tibshirani show that exact conditional predictive inference cannot be achieved without additional assumptions, except by producing prediction sets that are essentially trivial, such as extremely large intervals or sets that contain almost everything.[^barber2021]

So conformal prediction gives a remarkable guarantee, but it must be interpreted carefully:

> Conformal prediction guarantees population-level coverage, not automatically subgroup-level or individual-level coverage.

This matters in high-stakes AI. A conformal predictor may achieve 90% coverage overall, while under-covering a minority subgroup, a rare clinical phenotype, or a difficult autonomous-driving scenario. This motivates modern extensions such as group-conditional conformal prediction, locally adaptive conformal methods, covariate-shift-aware conformal prediction, and conformalized quantile regression.[^romano2019][^barber2021]

---

## 5. Conformal prediction as inferential testing

A deeper way to understand conformal prediction is through **test inversion**.

For a candidate label $y$, conformal prediction asks:

> If the new point had label $y$, would it look exchangeable with the calibration data?

This creates a hypothesis-like question:

$$
H_y: Y_{n+1} = y.
$$

For each candidate $y$, compute a nonconformity score for the augmented dataset that includes $(x_{n+1}, y)$. If the candidate label makes the new observation look too strange relative to past examples, reject it. If it does not look too strange, keep it.

The conformal prediction set is therefore:

$$
C(x_{n+1}) = \{y: p_y > \alpha\},
$$

where $p_y$ is a conformal p-value measuring how compatible candidate label $y$ is with the calibration data.[^shafer2008][^kuchibhotla2020]

This viewpoint is important because conformal prediction is not just a way to make intervals. It induces an **inferential test for prediction**:

- candidate labels are tested;
- nonconformity scores define evidence against each candidate;
- the final prediction set is obtained by keeping labels that are not rejected.

This resembles classical confidence-set construction by test inversion, but it is not classical parametric frequentist inference. It does not require specifying a likelihood, estimating a parameter, or relying on asymptotic normality. It is also not Bayesian inference. It does not place a prior on unknown parameters or compute a posterior distribution.

A good way to phrase it is:

> Conformal prediction is an exchangeability-based, algorithmic inference framework for predictive uncertainty.

In that sense, it can be viewed as a **third practical paradigm** for uncertainty quantification in modern AI:

| Paradigm | Main object | Key mechanism | Typical output |
|---|---|---|---|
| Frequentist inference | Estimator or parameter | Sampling distribution | Confidence interval, p-value |
| Bayesian inference | Posterior distribution | Prior + likelihood | Posterior interval, predictive distribution |
| Conformal inference | Future prediction | Exchangeability + calibration | Prediction set with coverage |

This does not mean conformal prediction is philosophically detached from frequentist statistics. Its coverage guarantee is frequentist in form. But operationally, conformal prediction behaves differently from both classical frequentist modeling and Bayesian posterior inference: it starts with an arbitrary algorithm, calibrates its errors, and produces finite-sample predictive sets by ranking nonconformity scores.

---

## 6. Why conformal prediction matters for AI

Conformal prediction is becoming central because modern AI has created a mismatch:

- models are increasingly complex;
- outputs are often overconfident;
- likelihoods may be unavailable or misspecified;
- full Bayesian inference is often computationally expensive;
- deployment decisions require calibrated uncertainty.

Conformal prediction helps bridge this gap. It offers a simple but rigorous recipe:

> Use any predictive model, calibrate its mistakes, and output a set that covers the truth with a chosen probability.

For neural networks, conformal prediction is especially useful because it does not require the softmax probabilities to be perfectly calibrated. It only needs a score that ranks how unusual predictions are. Better base models usually lead to smaller and more informative conformal sets, while the conformal wrapper provides coverage control.

This makes conformal prediction valuable for:

- medical AI and clinical risk prediction;
- autonomous systems and simulation-based evaluation;
- large language model abstention and selective prediction;
- drug discovery and molecular property prediction;
- uncertainty-aware decision support;
- safety-critical AI deployment.

---

## 7. One-sentence summary

**Conformal prediction is a model-agnostic calibration framework that turns black-box AI predictions into statistically valid prediction sets, offering finite-sample marginal coverage under exchangeability while exposing the fundamental impossibility of assumption-free conditional coverage.**

---

## References

[^vovk2005]: Vovk, V., Gammerman, A., & Shafer, G. (2005). *Algorithmic Learning in a Random World*. Springer. 

[^shafer2008]: Shafer, G., & Vovk, V. (2008). “A Tutorial on Conformal Prediction.” *Journal of Machine Learning Research*, 9, 371-421. 

[^angelopoulos2021]: Angelopoulos, A. N., & Bates, S. (2021). “A Gentle Introduction to Conformal Prediction and Distribution-Free Uncertainty Quantification.” arXiv:2107.07511. 

[^papadopoulos2002]: Papadopoulos, H., Proedrou, K., Vovk, V., & Gammerman, A. (2002). “Inductive Confidence Machines for Regression.” *ECML 2002*. 

[^barber2021]: Barber, R. F., Candès, E. J., Ramdas, A., & Tibshirani, R. J. (2021). “The Limits of Distribution-Free Conditional Predictive Inference.” *Information and Inference*, 10(2), 455-482. 

[^romano2019]: Romano, Y., Patterson, E., & Candès, E. J. (2019). “Conformalized Quantile Regression.” *NeurIPS 2019*. 

[^kuchibhotla2020]: Kuchibhotla, A. K. (2020). “Exchangeability, Conformal Prediction, and Rank Tests.” arXiv:2005.06095. 
