---
title: "Variational Inference for LLM?"
last_modified_at: 2025-02-07
header:
  teaser: "/assets/images/illustration/VI+LM.png"
excerpt: "Summary of ICLR 2024 oral paper 'Amortizing Intractable Inference in Large Language Models'"
permalink: /:categories/:title/
breadcrumbs: true
categories:
  - Notes
tags:
  - LLM
  - Variational Inference
toc: true
---

### 1.Introduction
Large Language Models (LLMs) are trained to predict the next token in a sequence, effectively compressing vast amounts of knowledge. However, they struggle with certain tasks that require more sophisticated inference, such as sequence continuation, infilling, and constrained generation, due to the **intractability** of posterior distributions. This paper proposes using **amortized Bayesian inference** through a noval **Generative Flow Networks (GFlowNets)** to address these challenges.

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

### 5.Conclusion and Future Work
GFlowNet fine-tuning enables LLMs to perform complex inference efficiently, addressing the limitations of existing methods. The authors suggest future directions, including:
- **Developing universal reasoning models** that generalize across multiple tasks.
- **Improving knowledge representation** to mitigate hallucinations and biases.
- **Extending probabilistic programming techniques** to structured reasoning.

This work highlights a promising direction for making LLMs more **efficient, diverse, and adaptable** in real-world applications.
