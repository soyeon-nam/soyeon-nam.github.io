---
title: '[Math] Space - vector space, affine space'
date: 2023-02-27
permalink: /posts/2023/02/math-space/
tags:
  - math
---


# Space

---

[TOC]



---



## What is Vector Space?

A vector space is a set that is closed under finite `vector addition` and `scalar multiplication`.

A vector space has the following properties:

- It is closed under addition, meaning that the sum of any two vectors in the space is also in the space.
- It is closed under scalar multiplication, meaning that the product of any scalar and any vector in the space is also in the space.
- Addition is commutative and associative.
- There exists a zero vector in the space that acts as the [additive identity](https://mathworld.wolfram.com/AdditiveIdentity.html).
- Every vector has an additive inverse.
- Scalar multiplication is associative and distributes over vector addition.



#### Additive identity

the number that you can add to any other number without changing its value. This number is typically denoted by the symbol "0".





## What is Affine Subspace?

Vector space has limitation to express the location/position because it only has direction and magnitude. Thereby, we need point, and the space of the points is affine space. 

A affine space has the following properties:

- There is a surjective map from A to P, called the point space.
- There is a free and transitive action of V on A, called the translation action.
- For any two points p, q in P, there is a unique vector v in V such that q = p + v, where + denotes the translation action.

space that the calculation between vector and point is available. 

An affine space is a mathematical concept used to describe a space that doesn't have a fixed origin or coordinate system. Instead, it consists of a set of points and a set of vectors that describe the differences between those points.

In other words, an affine space is a space where we can talk about relative distances and directions between points, but we don't have a fixed reference point or direction to measure them from.

For example, think of a map of a city. The streets and buildings on the map represent points in an affine space, and the vectors between those points represent the distances and directions between them. But there is no fixed "origin" or starting point on the map. We can describe how to get from one point to another, but we don't have a single starting point that everything is measured from.

Affine spaces are used in many areas of mathematics and science, including geometry, physics, and computer graphics. They are a useful way of describing spaces that don't have a fixed reference point, and they allow us to reason about distances, directions, and transformations between points in a flexible and general way.





## Reference

[vector space](https://mathworld.wolfram.com/VectorSpace.html)
[affine space](https://luv-n-interest.tistory.com/806)
[affine translation + affine space by hong](https://www.youtube.com/watch?v=DSmXIYkp024)
