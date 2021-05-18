# Why do we not talk about efficiency using hard units like seconds or bytes?
  - Only have control over our code
  - Don't have control over things like hardware




# Characteristics of Big-O:
1. The function should be defined in terms of the size of the input(s)
  - We are interested in the behavior as the input size approaches infinity
2. A smaller Big-O function is more desirable than a larger one. It uses fewer resources to compute (fewer calculations if we are concerned with time, less memory for space)
3. Big-O describes the worst case scenario, or upper-bound.
4. Big-O functions should be simplified to show only its most dominant term




# Complexity Classes:
- What order do these classes belong in? What does their Big-O notation look like? O(__)
  - FROM SMALLEST GROWTH RATE TO LARGEST (most to least efficient):


  - SORT THESE!
  - polynomial O(n^c) -> O(n^2), O(n^3)
  - logarithmic O(log n)
  - loglinear, linearithmic, quasilinear O(n log n)
  - constant O(1)
  - factorial O(n!)
  - exponential O(c^n) -> O(2^n), O(3^n)
  - linear O(n)




# How to Simplify Functions (Converting T(n) into O(n))
1. Simplify products
  - Drop any product that does not rely on the size of the input
  - T(47n) => O(__)
  - T(12n^2) => O(__)
  - T(2nlog(n)) => O(__)
  - T(2^n) => O(__)




2. Simplify sums
  - Only keep the term that has the largest growth rate
  - T(n + 1) => O(__)
  - T(n + log(n)) => O(__)
  - T(2^n + n^10000) => O(__)
