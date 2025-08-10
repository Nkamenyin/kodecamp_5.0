//1. a function that accepts a number and returns the factorial of that number
function factorial(n) {
  if (n < 0) {
    return 'Factorial is not defined for negative numbers.';
  }
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}