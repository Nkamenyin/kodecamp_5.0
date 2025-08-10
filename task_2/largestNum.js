//2.  a function that accepts an array of numbers and returns the largest number in the array
function largestNumber(arr) {
  if (arr.length === 0) {
    return null;
  }
  let largest = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > largest) {
      largest = arr[i];
    }
  }
  return largest;
}