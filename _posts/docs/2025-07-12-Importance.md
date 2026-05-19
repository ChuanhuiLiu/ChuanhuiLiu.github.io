---
title: "Importance-Weighted Methods: From Sampling to Modern AI"
excerpt: "How reweighting connects importance sampling, causal adjustment, clinical trial comparison, class-imbalance remedies, coreset selection, and deep generative modeling."
header:
  teaser: assets/images/gif/tutorial.gif
author_profile: true
permalink: /:categories/:title/
breadcrumbs: true
last_modified_at: 2025-03-12
classes: wide
categories:
  - Notebooks
tags:
  - Statistics
---

In many real world application, we often work with imperfect data. The data we have may not fully represent the population, task, or decision problem we actually care about. For example, 

1. Patients in one clinical trial may not look like patients in another trial. 

2. Treatment groups in observational data may be imbalanced. 

3. A dataset may be too large to use and a smaller weighted subset preserves the most important information is wanted. 

4. A model may sample from an approximate distribution instead of the true one. 

Importance weighting is one of the simplest ideas in statistics, but it keeps reappearing in surprisingly modern forms. It appears in Monte Carlo integration, causal inference, clinical trial adjustment, class-imbalanced classification, coreset selection, variational inference, diffusion training, and reinforcement learning.

The common principle is:

> Use samples produced by one mechanism, then reweight them so they behave more like the target mechanism we actually care about.

The same mathematical idea appears in different clothing:

| Domain | What is reweighted? | Target |
|---|---|---|
| Importance sampling | Monte Carlo samples | target expectation |
| Propensity score weighting | patients or treatment groups | causal pseudo-population |
| MAIC | clinical trial participants | target trial population |
| Class-imbalanced classification | examples or class labels | balanced or target training risk |
| Coreset selection | objective terms | full optimization landscape |
| IWAE / IWVI | latent samples | posterior or marginal likelihood |
| Diffusion models | timesteps or noise levels | lower-variance training objective |
| Off-policy RL | actions or trajectories | target policy value |
| Large-output neural nets | classes or negatives | full softmax-like objective |

The simple idea is:

$$
\text{importance}
=
\frac{\text{target relevance}}
{\text{sampling frequency}}.
$$

Or more directly:

$$
w
=
\frac{\text{what we want}}
{\text{what generated the sample}}.
$$

---

## 1. Importance Sampling: The Core Identity

Suppose we want to compute

$$
\mu = \mathbb{E}_{p}[f(X)] = \int f(x)p(x)dx,
$$

but it is difficult to sample directly from $p$. If we can sample from another distribution $q$, and if $p(x)>0$ only where $q(x)>0$, then

$$
\mathbb{E}_{p}[f(X)]
=
\int f(x)\frac{p(x)}{q(x)}q(x)dx
=
\mathbb{E}_{q}[w(X)f(X)].
$$

This gives the ordinary importance sampling estimator:

$$
\hat{\mu}_{IS}
=
\frac{1}{n}\sum_{i=1}^n w(x_i)f(x_i),
\qquad
x_i \sim q.
$$

If the normalizing constant of $p$ is unknown, or if we want a more stable ratio estimator, we often use self-normalized importance sampling:

$$
\hat{\mu}_{SNIS}
=
\frac{\sum_{i=1}^n w_i f(x_i)}
{\sum_{i=1}^n w_i}.
$$

This estimator is usually biased in finite samples but consistent under standard conditions. The major weakness is variance: if a few weights dominate, the estimator behaves as if we had far fewer samples. A common diagnostic is the effective sample size:

$$
ESS
=
\frac{\left(\sum_{i=1}^n w_i\right)^2}
{\sum_{i=1}^n w_i^2}.
$$

The ratio $ESS/n$ measures how much information remains after weighting. This is the recurring warning across all importance-weighted methods: **weights can correct distribution mismatch, but unstable weights create fragile inference**.[^owen2013]

---

## 2. Propensity Score Weighting: Reweighting Treatment Assignment

In causal inference, the distribution mismatch comes from treatment assignment. We observe patients who received treatment $A=1$ or control $A=0$, but these groups may differ in baseline covariates $X$. The propensity score is

$$
e(x)=P(A=1 \mid X=x).
$$

For the average treatment effect, inverse probability weighting uses weights such as

$$
w_i
=
\frac{A_i}{e(X_i)}
+
\frac{1-A_i}{1-e(X_i)}.
$$

The weighted estimating equation for the mean potential outcome under treatment $a$ can be written as

$$
\hat{\mu}_a
=
\frac{1}{n}
\sum_{i=1}^n
\frac{1(A_i=a)Y_i}
{P(A_i=a \mid X_i)}.
$$

The intuition is that each observed patient represents other similar patients who could have received the same treatment but did not. If a treated patient had low probability of receiving treatment, that patient receives a large weight because they are rare under the observed treatment mechanism.

Under consistency, exchangeability given observed covariates, and positivity, weighting creates a pseudo-population where treatment assignment is balanced with respect to measured confounders.[^rosenbaum1983] Positivity is the overlap condition:

$$
0 < e(x) < 1
\quad
\text{for relevant } x.
$$

If $e(x)$ is close to $0$ or $1$, weights explode. In that case, the method is no longer interpolating within observed support; it is extrapolating. That is why propensity score weighting is usually paired with balance diagnostics, truncation or stabilization of weights, and effective sample size checks.[^hernan2020]

A stabilized ATE weight is often written as

$$
w_i^{stab}
=
\frac{A_i P(A=1)}{e(X_i)}
+
\frac{(1-A_i)P(A=0)}{1-e(X_i)}.
$$

The exact form depends on the estimand. The statistical idea remains the same: we reweight the observed treatment mechanism into the causal target mechanism.

---

## 3. MAIC: Reweighting Across Clinical Trial Populations

Matching-adjusted indirect comparison, or MAIC, applies importance weighting to cross-trial comparison. The common setting is:

- Trial A has individual patient data.
- Trial B has only published aggregate covariate summaries.
- We want to compare treatments across trials after adjusting for population differences.

Let $x_i$ be baseline covariates from Trial A, and let $\bar{x}_{B}$ be the published baseline mean from Trial B. MAIC chooses weights $w_i$ such that

$$
\frac{\sum_{i=1}^n w_i x_i}
{\sum_{i=1}^n w_i}
=
\bar{x}_{B}.
$$

A common form is exponential tilting:

$$
w_i = \exp(\alpha^\top x_i).
$$

The parameter $\alpha$ is chosen so that the weighted Trial A covariate moments match the Trial B aggregate moments. Equivalently, one can solve the estimating equation

$$
\sum_{i=1}^n
\exp(\alpha^\top x_i)(x_i-\bar{x}_{B})
=
0.
$$

After weighting, outcomes from Trial A are analyzed as if Trial A had the same observed baseline covariate distribution as the target trial. This is why MAIC can be viewed as **importance weighting under partial information**: we do not have individual-level samples from the target trial, but we do have aggregate moments that define what the weighted source trial should look like.[^signorovitch2012]

The limitation is also clear. MAIC only balances what is reported. If an effect modifier is unreported, it cannot be matched. If matching requires extreme weights, the effective sample size can collapse:

$$
ESS_{MAIC}
=
\frac{\left(\sum_i w_i\right)^2}
{\sum_i w_i^2}.
$$

Therefore, MAIC is not simply a matching tool. It is a transport-of-evidence method whose credibility depends on overlap, reported effect modifiers, cross-trial comparability, and weight stability.[^phillippo2016]

---

## 4. Reweighting Data and Objectives: Class Imbalance and Coresets

Before moving to modern deep generative models, it is useful to separate two closely related uses of weighting in ordinary machine learning. The first reweights examples because the observed class frequencies are not aligned with the learning target. The second reweights examples because the dataset is too large and we want a small weighted subset that preserves the objective.

### 4.1 Class-Imbalanced Classification: Up-Sampling, Down-Sampling, and Weighted Risk

In classification, the empirical risk is usually written as

$$
\hat{R}(	heta)
=
\frac{1}{n}
\sum_{i=1}^n
\ell(f_	heta(x_i),y_i).
$$

When classes are highly imbalanced, this empirical risk is dominated by majority-class examples. For binary classification with $y \in \{0,1\}$, let the observed class proportion be

$$
\hat{\pi}_y
=
\frac{1}{n}
\sum_{i=1}^n 1(y_i=y).
$$

If the target training objective should give classes different mass, for example balanced class mass $\pi_y^{target}=1/2$, a class-weighted risk can be written as

$$
\hat{R}_w(	heta)
=
\frac{1}{n}
\sum_{i=1}^n
\alpha_{y_i}\ell(f_	heta(x_i),y_i),
\alpha_y =\frac{\pi_y^{target}}{\hat{\pi}_y}.
$$

This is the same change-of-measure logic, now applied to class labels. Minority-class examples receive larger mass because they are rare under the observed empirical distribution but important under the target training distribution. Up-sampling and down-sampling implement the same idea by changing the empirical measure through replication or deletion:

$$
\hat{P}_{train}
=
\sum_{i=1}^n w_i \delta_{(x_i,y_i)}.
$$

Up-sampling increases the mass of minority-class points by sampling or replicating them more often. Down-sampling decreases the mass of majority-class points by sampling fewer of them. Class-weighted loss keeps all samples but changes their contribution to the objective. SMOTE extends up-sampling by generating synthetic minority examples through local interpolation, so it changes both the sample weights and the support of the empirical distribution.[^chawla2002]

The statistical tradeoff is immediate. Up-sampling can reduce minority-class underfitting but may overfit duplicated points. Down-sampling can reduce majority dominance but discards information. Weighted losses preserve the full dataset but can create high-gradient variance when class weights are extreme. These are not separate tricks; they are different ways to modify the empirical measure used by the classifier.[^he2009]

### 4.2 Coreset Selection: Reweighting Objective Contributions

Coreset selection moves importance weighting from ordinary empirical risk adjustment to optimization compression. Suppose the full empirical objective is

$$
L_P(\theta)
=
\sum_{i=1}^n \ell_i(\theta),
$$

where $\ell_i(\theta)$ is the contribution of point $i$ to the loss. A weighted coreset approximates this objective using a smaller subset $C$:

$$
L_C(\theta)
=
\sum_{i \in C} u_i \ell_i(\theta).
$$

A strong coreset satisfies a uniform approximation guarantee:

$$
(1-\epsilon)L_P(\theta)
\le
L_C(\theta)
\le
(1+\epsilon)L_P(\theta)
\quad
\text{for all } \theta \in \Theta.
$$

The key quantity is sensitivity:

$$
\sigma_i
=
\sup_{\theta \in \Theta}
\frac{\ell_i(\theta)}
{\sum_{j=1}^n \ell_j(\theta)}.
$$

This asks: across all model configurations, how much can point $i$ dominate the total loss? If $s_i$ is an upper bound on $\sigma_i$, then sensitivity sampling chooses

$$
q_i
=
\frac{s_i}{\sum_{j=1}^n s_j}.
$$

When point $i$ is sampled, it receives inverse-probability weight

$$
u_i
=
\frac{1}{m q_i},
$$

or the corresponding version with original data weights. For any fixed $\theta$, this gives an unbiased estimate of the full loss:

$$
\mathbb{E}[L_C(\theta)]
=
L_P(\theta).
$$

The hard part is not unbiasedness for one $\theta$. The hard part is uniform control over all $\theta$. This requires both bounded total sensitivity,

$$
S=\sum_{i=1}^n s_i,
$$

and complexity control over the function class, often through VC dimension, pseudo-dimension, or related range-space arguments.[^feldman2011]

So in coreset selection, importance does not mean population representativeness. It means **worst-case objective influence**. A point is important if some model configuration makes it carry a large fraction of the loss. This is why sensitivity-based coresets are closer to algorithmic leverage than to ordinary random subsampling.[^bachem2017]

---

## 5. Deep Generative Models: Importance Weighting in VAEs and Diffusion

In deep generative modeling, importance weighting appears inside inference and training objectives rather than as patient or data reweighting.

### 5.1 Importance-Weighted Variational Inference

For a latent-variable model,

$$
p_\theta(x)
=
\int p_\theta(x,z)dz.
$$

A VAE introduces an encoder or proposal distribution $q_\phi(z \mid x)$ and uses Jensen's inequality:

$$
\log p_\theta(x)
=
\log
\mathbb{E}_{q_\phi(z \mid x)}
\left[
\frac{p_\theta(x,z)}
{q_\phi(z \mid x)}
\right]
\ge
\mathbb{E}_{q_\phi(z \mid x)}
\left[
\log
\frac{p_\theta(x,z)}
{q_\phi(z \mid x)}
\right].
$$

The importance-weighted autoencoder uses $K$ latent samples:

$$
\mathcal{L}_K(x)
=
\mathbb{E}_{z_{1:K} \sim q_\phi(z \mid x)}
\left[
\log
\frac{1}{K}
\sum_{k=1}^K
\frac{p_\theta(x,z_k)}
{q_\phi(z_k \mid x)}
\right].
$$

The ratio

$$
r_k
=
\frac{p_\theta(x,z_k)}
{q_\phi(z_k \mid x)}
$$

is an importance weight. As $K$ increases, the bound becomes tighter under standard IWAE conditions, and the recognition model can represent a richer implicit posterior than the single-sample VAE objective.[^burda2015]

A deeper interpretation is that importance-weighted variational inference can be viewed as variational inference on an augmented space. Introduce $K$ candidates $z_{1:K}$ and an index $a$ selecting one of them. The selected index has probability

$$
P(a=k \mid z_{1:K},x)
=
\frac{r_k}
{\sum_{j=1}^K r_j}.
$$

Thus importance weighting turns a simple proposal distribution into a richer posterior approximation by drawing multiple candidates and giving posterior mass to the candidates with high target-to-proposal ratios.[^domke2018]

### 5.2 Diffusion Models: Importance Sampling Over Timesteps

Diffusion models also contain importance-weighted structure. Their training objective often decomposes across timesteps or noise levels:

$$
L_{vlb}
=
\sum_{t=0}^{T} L_t.
$$

If timesteps are sampled uniformly, some terms may contribute much more gradient noise than others. A direct importance-sampling correction samples

$$
t \sim p_t
$$

and estimates

$$
L_{vlb}
=
\mathbb{E}_{t \sim p_t}
\left[
\frac{L_t}{p_t}
\right].
$$

Improved DDPMs use this idea to reduce gradient noise when optimizing the variational lower bound. Their practical proposal samples timesteps more often when their loss terms have larger second moment, roughly

$$
p_t
\propto
\sqrt{\mathbb{E}[L_t^2]}.
$$

So in VAEs, importance weighting improves latent posterior approximation. In diffusion models, it can improve how training computation is allocated across timesteps or noise levels.[^nichol2021]

---

## 6. Beyond Generative Models: Off-Policy RL and Neural Objectives

Importance weighting also appears when a learning system trains or evaluates under one sampling process but targets another.

### 6.1 Off-Policy Reinforcement Learning

In off-policy reinforcement learning, data are generated by a behavior policy $b(a \mid s)$, but we want to evaluate a target policy $\pi(a \mid s)$. At one step, the likelihood ratio is

$$
\rho_t
=
\frac{\pi(a_t \mid s_t)}
{b(a_t \mid s_t)}.
$$

For a trajectory

$$
\tau = (s_0,a_0,r_0,\ldots,s_T,a_T,r_T),
$$

the trajectory-level ratio is

$$
W(\tau)
=
\prod_{t=0}^{T}
\frac{\pi(a_t \mid s_t)}
{b(a_t \mid s_t)}.
$$

Then the target-policy value can be written as

$$
V^\pi
=
\mathbb{E}_{\tau \sim p_b}
[W(\tau)R(\tau)],
$$

where $p_b$ is the trajectory distribution under the behavior policy. This is the same change-of-measure identity, now applied to trajectory distributions rather than static covariates.[^precup2000]

The difficulty is again variance. A product of ratios can explode over long horizons. Per-decision importance sampling reduces some variance by applying partial products:

$$
W_{0:t}
=
\prod_{j=0}^{t}
\frac{\pi(a_j \mid s_j)}
{b(a_j \mid s_j)}.
$$

Prioritized experience replay uses a related correction. Transitions are sampled with probability $P(i)$, often based on temporal-difference error, and corrected with weights such as

$$
w_i
=
\left(
\frac{1}{N P(i)}
\right)^\beta.
$$

Here the purpose is computational efficiency: learn more often from informative transitions while correcting the bias induced by nonuniform sampling.[^schaul2016]

### 6.2 Large-Output Neural Objectives

Importance sampling is also useful when neural networks have very large output spaces. For a vocabulary or class set of size $V$, softmax requires

$$
p(y \mid x)
=
\frac{\exp s_y}
{\sum_{j=1}^{V}\exp s_j}.
$$

When $V$ is huge, computing the denominator at every step is expensive. Importance-sampled or sampled-softmax methods approximate the full sum using candidate classes sampled from a proposal distribution $q(j)$. A generic correction has the form

$$
\sum_{j=1}^{V} g(j)
=
\mathbb{E}_{j \sim q}
\left[
\frac{g(j)}{q(j)}
\right].
$$

The same idea appears in neural language modeling and machine translation: sample a subset of negative or candidate classes, then correct for the fact that those classes were not sampled from the full target distribution.[^bengio2008][^jean2015]

This is not only a computational trick. It reveals the same statistical tension: the best proposal distribution should put more probability on terms that matter for the objective, but the more adaptive and concentrated the proposal becomes, the more carefully the estimator must handle bias and variance.


---

## 7. Why Importance Weighting Is Powerful but Fragile

Importance-weighted methods are powerful because they provide a general statistical language for transport:

- from proposal to target distribution,
- from observed treatment assignment to causal estimand,
- from one trial population to another,
- from imbalanced class frequencies to a target training risk,
- from a full dataset to a compressed objective,
- from simple encoder proposals to richer posterior approximations,
- from uniform timestep sampling to variance-aware diffusion training,
- from behavior policies to target policies.

But the same mathematical issue always returns. If the denominator is too small, the weight becomes too large:

$$
w(x)=\frac{p(x)}{q(x)}.
$$

Large weights mean the method is relying on rare samples to represent important target regions. This produces high variance, low effective sample size, and unstable conclusions.

So the practical question behind every importance-weighted method is not only:

> Are the weights correct?

It is also:

> Are the weights stable enough to support reliable inference?

This is why overlap diagnostics in causal inference, effective sample size in MAIC, class-weight instability in imbalanced classification, total sensitivity in coresets, gradient variance in IWAE and diffusion, and trajectory-ratio control in off-policy RL are all versions of the same concern.

Importance weighting is not merely a technical trick. It is one of the central ways modern statistics and machine learning transport information across populations, objectives, and inference problems.

---

## References

[^owen2013]: Owen, A. B. (2013). *Monte Carlo Theory, Methods and Examples*. Stanford University.

[^rosenbaum1983]: Rosenbaum, P. R., & Rubin, D. B. (1983). “The Central Role of the Propensity Score in Observational Studies for Causal Effects.” *Biometrika*, 70(1), 41–55.

[^hernan2020]: Hernán, M. A., & Robins, J. M. (2020). *Causal Inference: What If*. Chapman & Hall/CRC.

[^signorovitch2012]: Signorovitch, J. E., Sikirica, V., Erder, M. H., Xie, J., Lu, M., Hodgkins, P. S., & Wu, E. Q. (2012). “Matching-Adjusted Indirect Comparisons: A New Tool for Timely Comparative Effectiveness Research.” *Value in Health*, 15(6), 940–947.

[^phillippo2016]: Phillippo, D. M., Ades, A. E., Dias, S., Palmer, S., Abrams, K. R., & Welton, N. J. (2016). *NICE DSU Technical Support Document 18: Methods for Population-Adjusted Indirect Comparisons in Submissions to NICE*. NICE Decision Support Unit.

[^feldman2011]: Feldman, D., & Langberg, M. (2011). “A Unified Framework for Approximating and Clustering Data.” *Proceedings of the 43rd ACM Symposium on Theory of Computing*, 569–578.

[^bachem2017]: Bachem, O., Lucic, M., & Krause, A. (2017). “Practical Coreset Constructions for Machine Learning.” arXiv:1703.06476.

[^chawla2002]: Chawla, N. V., Bowyer, K. W., Hall, L. O., & Kegelmeyer, W. P. (2002). “SMOTE: Synthetic Minority Over-sampling Technique.” *Journal of Artificial Intelligence Research*, 16, 321–357.

[^he2009]: He, H., & Garcia, E. A. (2009). “Learning from Imbalanced Data.” *IEEE Transactions on Knowledge and Data Engineering*, 21(9), 1263–1284.

[^burda2015]: Burda, Y., Grosse, R., & Salakhutdinov, R. (2015). “Importance Weighted Autoencoders.” arXiv:1509.00519.

[^domke2018]: Domke, J., & Sheldon, D. (2018). “Importance Weighting and Variational Inference.” *Advances in Neural Information Processing Systems 31*.

[^nichol2021]: Nichol, A. Q., & Dhariwal, P. (2021). “Improved Denoising Diffusion Probabilistic Models.” *Proceedings of the 38th International Conference on Machine Learning*, PMLR 139, 8162–8171.

[^precup2000]: Precup, D., Sutton, R. S., & Singh, S. P. (2000). “Eligibility Traces for Off-Policy Policy Evaluation.” *Proceedings of the 17th International Conference on Machine Learning*, 759–766.

[^schaul2016]: Schaul, T., Quan, J., Antonoglou, I., & Silver, D. (2016). “Prioritized Experience Replay.” *International Conference on Learning Representations*.

[^bengio2008]: Bengio, Y., & Senécal, J.-S. (2008). “Adaptive Importance Sampling to Accelerate Training of a Neural Probabilistic Language Model.” *IEEE Transactions on Neural Networks*, 19(4), 713–722.

[^jean2015]: Jean, S., Cho, K., Memisevic, R., & Bengio, Y. (2015). “On Using Very Large Target Vocabulary for Neural Machine Translation.” *Proceedings of the 53rd Annual Meeting of the Association for Computational Linguistics and the 7th International Joint Conference on Natural Language Processing*, 1–10.
