---
title: "PyTorch Handbooks： Linear Regression"
hidden: true
tags:
  - Pseudo-Code, Pytorch
---

### Implementing Linear Regression in PyTorch

This guide introduces customizing nn.Module for linear regression, showing the difference between Python and R programming styles. 

For statisticians who are already familiar with `R`, implementing linear regression is often as simple as calling `lm(y ~ x, data)`, via R’s built-in statistical modeling functions, e.g.,

```r
model <- lm(y ~ x, data)
coef(model)
y_pred <- predict(model, newdata = data.frame(x = c(1, 2, 3, 4, 5)))
mse <- mean((y - y_pred)^2)
```

However, in deep learning frameworks like PyTorch, the process requires a more explicit definition of model architecture, parameters, and computational graph.

```python
import torch
import torch.nn as nn
class LinearRegression(nn.Module):
    def __init__(self, input_dim, output_dim):
        """
        Custom PyTorch module for Linear Regression.
        
        Args:
            input_dim (int): Number of input features.
            output_dim (int): Number of output features (typically 1 for regression).
        """
        super(LinearRegression, self).__init__()

        # Single-layer linear transformation
        self.linear = nn.Linear(input_dim, output_dim)  
    def forward(self, x):
        """
        Forward pass of the model.
        
        Args:
            x (Tensor): Input tensor of shape (batch_size, input_dim).
        
        Returns:
            Tensor: Predicted output of shape (batch_size, output_dim).
        """
        return self.linear(x)

# Example Usage:
if __name__ == "__main__":
    # Define model for 1D input to 1D output
    model = LinearRegression(input_dim=1, output_dim=1)
    
    # Sample input tensor (batch of 3 samples)
    x_sample = torch.tensor([[1.0], [2.0], [3.0]])
    
    # Forward pass
    y_pred = model(x_sample)
    
    print("Predicted Output:\n", y_pred)
```
