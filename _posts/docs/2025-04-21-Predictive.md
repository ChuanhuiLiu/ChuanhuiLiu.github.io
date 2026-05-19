---
title: "Bayesian Uncertainty from Martingale Posteriors"
excerpt: "Defining Bayesian uncertainty without the prior and likelihood"
header:
  teaser: assets/images/gif/tutorial.gif
author_profile: true
permalink: /:categories/:title/
breadcrumbs: true
last_modified_at: 2025-02-21
classes: wide
categories:
  - Notebooks
tags:
  - Statistics
---
---
## 1. Start from the standard Bayesian view

In standard Bayesian inference, uncertainty is usually introduced through a **prior distribution** on parameters. We specify a likelihood and a prior:

$$
Y_i \mid \theta \sim f_\theta(y), \qquad \theta \sim \pi(\theta).
$$

After observing data $y_{1:n}$, Bayes' rule gives the posterior:

$$
\pi(\theta \mid y_{1:n}) \propto \pi(\theta) \prod_{i=1}^n f_\theta(y_i).
$$

The posterior predictive distribution for a future observation is:

$$
p(y_{n+1} \mid y_{1:n}) = \int f_\theta(y_{n+1}) \pi(\theta \mid y_{1:n}) d\theta.
$$

This is the standard **prior → likelihood → posterior → posterior predictive** derivation in classic statistical derivation. It is powerful, but it also makes the parameter $\theta$ the starting point of uncertainty. Fong, Holmes, and Walker ask a different question: what if the true source of uncertainty is not the parameter itself, but the **unobserved data we have not seen yet**?[^fong2023]

Their starting intuition is simple:

> If we could observe the full population, or an infinite amount of data, many statistical quantities would no longer be uncertain.

For example, the population mean, a quantile, a regression functional, or a risk score can be viewed as a functional of the full data-generating distribution $F_0$:

$$
\theta_0 = \theta(F_0).
$$

Because we only observe $y_{1:n}$, uncertainty remains about the missing part of the population. The martingale posterior reframes Bayesian inference as uncertainty about these **missing observations**, not necessarily as uncertainty about a parametric likelihood index.

---

## 2. The Bayesian bootstrap point of view

A helpful bridge is the **Bayesian bootstrap**. In the ordinary nonparametric bootstrap, we repeatedly resample the observed data with replacement and recompute a statistic. The Bayesian bootstrap, introduced by Rubin, instead places random weights on the observed data points:[^rubin1981]

$$
(w_1, \ldots, w_n) \sim \text{Dirichlet}(1, \ldots, 1),
$$

and defines a random discrete distribution:

$$
F(y) = \sum_{i=1}^n w_i \mathbf{1}\{y_i \leq y\}.
$$

Then a posterior sample of the target statistic is obtained by computing:

$$
\theta(F).
$$

This looks like a Bayesian version of bootstrap uncertainty. But the martingale posterior gives it a deeper interpretation. Instead of saying that uncertainty comes from random weights, we can say:

> Uncertainty comes from repeatedly imputing the missing future observations using a predictive rule.

For the empirical predictive distribution, the next observation is drawn from the current empirical distribution:

$$
Y_{n+1} \sim F_n,
$$

where

$$
F_n(y) = \frac{1}{n} \sum_{i=1}^n \mathbf{1}\{y_i \leq y\}.
$$

After drawing $Y_{n+1}$, the empirical distribution is updated:

$$
F_{n+1}(y) = \frac{n}{n+1} F_n(y) + \frac{1}{n+1} \mathbf{1}\{Y_{n+1} \leq y\}.
$$

Continuing this process forward produces a Pólya-urn-style sequence. In the limit, the random proportions over observed atoms recover the Dirichlet-weight behavior of the Bayesian bootstrap. Fong, Holmes, and Walker use this as the simplest example of **predictive resampling**: sample future observations, update the predictive distribution, and compute the statistic after the missing information has been filled in.[^fong2023]

---

## 3. What is a martingale posterior?

The martingale posterior generalizes the Bayesian bootstrap idea. Instead of requiring a likelihood $f_\theta$ and prior $\pi(\theta)$, we begin directly with a sequence of **one-step-ahead predictive distributions**:

$$
P_i(y) = P(Y_{i+1} \leq y \mid Y_{1:i} = y_{1:i}).
$$

Starting from the observed data $y_{1:n}$, we simulate future observations recursively:

$$
Y_{n+1} \sim P_n,
$$

$$
Y_{n+2} \sim P_{n+1},
$$

$$
Y_{n+3} \sim P_{n+2},
$$

and so on. After each imputed future observation, the predictive distribution is updated.

If this process converges to a limiting random distribution $F_\infty$, then any statistic of interest can be computed from that completed information:

$$
\theta_\infty = \theta(F_\infty).
$$

The **martingale posterior** is the induced distribution of $\theta_\infty$ given the observed data:

$$
\Pi_\infty(\theta_\infty \in A \mid y_{1:n})
= \int \mathbf{1}\{\theta(F_\infty) \in A\} d\Pi(F_\infty \mid y_{1:n}).
$$

In words:

> A martingale posterior is a Bayesian uncertainty distribution obtained by simulating the missing future data from a coherent predictive mechanism and then evaluating the statistic on the completed population.

This is why the method is called **predictive resampling**. The computational object is not a posterior draw of $\theta$ directly. It is a simulated future sequence $Y_{n+1: N}$, followed by computing $\theta(Y_{1:N})$ for large $N$.

---

## 4. Why martingales matter

Mathematically, a stochastic process is a martingale with respect to a filtration. Here, it encodes the idea that predictive resampling should add uncertainty, but not add artificial bias or new information.

A simplified coherence condition is:

$$
E[P_\infty(y) \mid y_{1:n}] = P_n(y).
$$

This says: after averaging over all possible future imputations, the limiting predictive distribution should agree with the predictive distribution we started from. The future simulation should spread uncertainty around the current predictive belief, not shift the belief in a systematic direction.

This is the predictive analogue of Bayesian coherence. In standard Bayes, coherence is obtained through the prior-likelihood construction. In martingale posteriors, coherence is imposed directly on the predictive process. Fong, Holmes, and Walker use conditionally identically distributed sequences and martingale convergence ideas to make this predictive construction mathematically valid.[^fong2023]

A practical algorithm looks like this:

1. Specify or estimate a predictive distribution $P_n$ from the observed data.
2. Draw $Y_{n+1} \sim P_n$.
3. Update the predictive distribution from $P_n$ to $P_{n+1}$.
4. Continue drawing $Y_{n+2}, Y_{n+3}, \ldots, Y_N$.
5. Compute $\theta_N = \theta(Y_{1:N})$.
6. Repeat the whole path many times to obtain a distribution of $\theta_N$.

For sufficiently large $N$, $\theta_N$ approximates a sample from the martingale posterior. If the real target population is finite with size $N$, then $\theta_N$ can be interpreted directly as uncertainty about the finite population quantity.

---

## 5. How this relates to ordinary Bayesian inference

The martingale posterior is not anti-Bayesian. It recovers ordinary Bayesian inference as a special case.

If the one-step predictive distribution is the usual Bayesian posterior predictive,

$$
p(y \mid y_{1:n}) = \int f_\theta(y) \pi(\theta \mid y_{1:n}) d\theta,
$$

then predictive resampling from this sequence produces the same posterior uncertainty about $\theta$ as the conventional Bayesian posterior, under the relevant conditions. This connection traces back to Doob's martingale arguments: posterior uncertainty about a parameter can be represented through uncertainty about the unseen infinite sequence of observations.[^doob1949][^fong2023]

So the martingale posterior changes the emphasis:

| View | Starting point | Main uncertainty object | Output |
|---|---|---|---|
| Standard Bayes | Prior + likelihood | Parameter $\theta$ | Posterior $\pi(\theta \mid y_{1:n})$ |
| Bayesian bootstrap | Empirical distribution | Random distribution weights | Distribution of $\theta(F)$ |
| Martingale posterior | Predictive mechanism | Missing observations $Y_{n+1:\infty}$ | Distribution of $\theta(F_\infty)$ |

The key conceptual move is from **parameter-first Bayes** to **prediction-first Bayes**.

---

## 6. Why this matters for modern statistical learning

Modern statistical learning often gives us strong predictive models but weak or inconvenient likelihoods. We may have a powerful predictive machine for observables, but no clean parametric likelihood-prior pair that we trust.

Martingale posteriors ask:

> Can we turn a coherent predictive model into Bayesian uncertainty for a statistic of interest?

This is attractive because many scientific and AI problems care about functionals rather than parameters:

- a mean response,
- a treatment effect,
- a quantile,
- a subgroup risk,
- a density feature,
- a regression curve,
- a decision-relevant summary of a predictive distribution.

The martingale posterior directly targets such quantities by completing the missing data through predictive resampling.

It also clarifies the difference between Bayesian and frequentist bootstrap thinking. In the frequentist bootstrap, the observed sample is resampled to approximate the sampling distribution of an estimator across hypothetical repeated datasets. In the martingale posterior view, the observed data are fixed, and uncertainty concerns the unobserved future or missing population conditional on what was observed.

A useful slogan is:

> Frequentist resampling asks: what if the observed sample had been different?  
> Predictive Bayesian resampling asks: what missing observations remain compatible with what I observed?

---

## 7. Infinite exchangeability: the deeper Bayesian background

The martingale posterior is easier to appreciate if we recall the classical role of **infinite exchangeability**.

A sequence $Y_1, Y_2, \ldots$ is exchangeable if its joint distribution is unchanged by finite permutations. Informally, the order of observations does not matter. For an infinite exchangeable sequence, de Finetti's representation theorem says that the joint law can be represented as a mixture of i.i.d. laws:[^definetti1937][^hewitt1955]

$$
P(Y_{1:m} \in dy_{1:m})
= \int \prod_{i=1}^m F(dy_i) d\Pi(F).
$$

This is one of the deepest foundations of Bayesian nonparametrics: if we believe the data sequence is infinitely exchangeable, then it is mathematically coherent to act as if there is a random distribution $F$ behind the data.

The martingale posterior builds on this predictive tradition, but it does not require the same full exchangeability structure. Fong, Holmes, and Walker emphasize conditionally identically distributed sequences, where the predictive distributions can remain coherent and convergent even when the process is more general than exchangeability.[^berti2004][^fong2023]

For additional reading, the most useful path is:

- de Finetti for the original exchangeability foundation;
- Hewitt and Savage for general exchangeability representation on broader spaces;
- Aldous for a broad survey of exchangeability and its role in probability;
- Berti, Pratelli, and Rigo for conditionally identically distributed sequences.

---

## 8. Limitations and interpretation

Martingale posteriors are powerful, but they do not make uncertainty automatic. The quality of the posterior uncertainty depends on the quality and coherence of the predictive mechanism.

Important caveats:

- The predictive distribution must be carefully constructed.
- Predictive resampling should not introduce artificial bias.
- The target statistic $\theta(F_\infty)$ must be clearly defined.
- Finite-$N$ approximations may need convergence diagnostics.
- The approach gives Bayesian uncertainty from a predictive model, not guaranteed truth from any arbitrary predictor.

The key philosophical point is that Bayesian uncertainty can be built from **observable predictions** rather than from a prior over abstract parameters. This makes martingale posteriors especially interesting in modern AI and scientific machine learning, where predictive models are often easier to specify or validate than full likelihood-based generative models.

---

## 9. One-sentence summary

**Martingale posteriors reframe Bayesian uncertainty as uncertainty about missing future observations: specify a coherent predictive mechanism, resample the unobserved data, compute the statistic on the completed population, and use the induced distribution as the posterior uncertainty.**

---

## References

[^fong2023]: Fong, E., Holmes, C., & Walker, S. G. (2023). “Martingale posterior distributions.” *Journal of the Royal Statistical Society: Series B*, 85(5), 1357–1391. https://doi.org/10.1093/jrsssb/qkad005. Preprint: https://arxiv.org/abs/2103.15671

[^rubin1981]: Rubin, D. B. (1981). “The Bayesian Bootstrap.” *The Annals of Statistics*, 9(1), 130–134. https://doi.org/10.1214/aos/1176345338

[^doob1949]: Doob, J. L. (1949). “Application of the Theory of Martingales.” *Le Calcul des Probabilités et ses Applications*, Colloques Internationaux du CNRS, 23–27.

[^definetti1937]: de Finetti, B. (1937). “La prévision: ses lois logiques, ses sources subjectives.” *Annales de l'Institut Henri Poincaré*, 7(1), 1–68. English translation: “Foresight: Its Logical Laws, Its Subjective Sources.”

[^hewitt1955]: Hewitt, E., & Savage, L. J. (1955). “Symmetric Measures on Cartesian Products.” *Transactions of the American Mathematical Society*, 80(2), 470–501. https://doi.org/10.1090/S0002-9947-1955-0076206-8

[^aldous1985]: Aldous, D. J. (1985). “Exchangeability and Related Topics.” In *École d'Été de Probabilités de Saint-Flour XIII — 1983*, Lecture Notes in Mathematics, vol. 1117. Springer. https://doi.org/10.1007/BFb0099421

[^berti2004]: Berti, P., Pratelli, L., & Rigo, P. (2004). “Limit Theorems for a Class of Identically Distributed Random Variables.” *The Annals of Probability*, 32(3), 2029–2052. https://doi.org/10.1214/009117904000000306
