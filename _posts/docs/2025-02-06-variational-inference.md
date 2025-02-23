---
title: "Variational Inference for SFT in LLM"
last_modified_at: 2025-02-18
header:
  teaser: "/assets/images/illustration/VI+LM.png"
excerpt: "Summary of ICLR 2024 oral: 'Amortizing Intractable Inference in Large Language Models'"
permalink: /:categories/:title/
breadcrumbs: true
categories:
  - Notes
tags: 
  - LLM
  - Variational Inference
toc: true
---

TL;DR:  A novel method for fine-tuning large language models (LLMs) to sample from intractable posterior distributions using amortized Bayesian inference and Generative Flow Networks.

### 1.Introduction
Autoregressive LLMs are limited to generating text via start-to-end token prediction, making tasks like constrained generation (e.g., infilling, sequence continuation) or multi-step reasoning intractable due to the **computational complexity** of sampling from posterior distributions. For example, chain-of-thought reasoning involves inferring latent reasoning steps, which traditional methods like MCMC or reinforcement learning (RL) struggle to handle efficiently

The core idea introduces GFlowNet fine-tuning, a diversity-seeking reinforcement learning framework, to amortize inference over intractable posteriors. By training LLMs to match target distributions (e.g., uniform sampling in constrained tasks), this method avoids mode collapse common in RL approaches like PPO and improves sample diversity.


### 2.Problem: Intractable Posterior Inference in LLMs
LLMs model the probability of a sequence $x$ as:

$$ p(X) = p(w_1) p(w_2 | w_1) p(w_3 | w_1, w_2) \dots p(w_n | w_1, \dots, w_{n-1}) $$

While this allows efficient left-to-right generation, many interesting problems require conditioning on **both past and future** tokens, leading to an intractable posterior:

$$ p(Z | X, Y) = \frac{p(X,Z,Y)}{\sum_{Z} p(X,Z,Y)} $$

where $$Z$$ represents intermediate reasoning steps or latent structures. Existing solutions, like Markov Chain Monte Carlo (MCMC) or Proximal Policy Optimization (PPO), struggle with mode collapse and inefficiencies.

### 3.Solution: GFlowNet-Based Fine-Tuning
The authors propose fine-tuning LLMs using **GFlowNets**, a reinforcement learning method that encourages sampling diverse, high-reward sequences. The approach consists of:

1. **Initializing a GFlowNet policy** from a pretrained LLM.
2. **Training it to sample from the posterior** by assigning rewards proportional to $p(XZY)$.
3. **Using amortized inference** to generalize across different tasks.

This method improves sample diversity and allows efficient posterior sampling, outperforming traditional maximum-likelihood fine-tuning and reward-maximizing policy optimization.

### 4.Key Applications and Results
The paper demonstrates the effectiveness of GFlowNet fine-tuning across various tasks:

- **Sequence Continuation:** Producing diverse yet high-likelihood sentence completions.
- **Story Infilling:** Generating coherent missing sentences given a start and an ending.
- **Subjectivity Classification:** Learning to infer latent rationales for text classification.
- **Arithmetic Reasoning:** Step-by-step solving of math problems using external tool use.

#### 4.1 Performance Gains
The method achieves **higher diversity and generalization** than baseline approaches. For example:
- **Story infilling**: Outperforms supervised fine-tuning with better BLEU and BERTScore metrics.
- **Arithmetic reasoning**: Shows a **63% improvement** over PPO fine-tuning in generalization to out-of-distribution problems.
- **Subjectivity classification**: Achieves **10.9% higher accuracy** than supervised fine-tuning with only 10 labeled examples.
- **Scalability**: effective sampling from a 6B-parameter LLM, highlighting practical applicability

### 5.Contributions and Future Work
This work provides a principled alternative to maximum-likelihood training and reward maximization, emphasizing distribution matching over point estimates. The proposed GFlowNet fine-tuning enables LLMs to perform complex inference efficiently, addressing the limitations of existing methods. 

The authors suggest future directions, including:
- **Developing universal reasoning models** that generalize across multiple tasks.
- **Improving knowledge representation** to mitigate hallucinations and biases.
- **Extending probabilistic programming techniques** to structured reasoning.

For further details, refer to the [ICLR presentation](https://iclr.cc/virtual/2024/oral/19763) or [full text](https://openreview.net/forum?id=Ouj6p4ca60)

