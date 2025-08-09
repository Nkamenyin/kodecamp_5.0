//5. a function that accepts two parameters, a string and a callback function
function myFunction(str, callback) {
  const reversed = str.split('').reverse().join('');
  callback(reversed);
}

function revString(s) { // a callback function that receives and print the reversed form of the string passed to its parent function
  console.log(s);
}