//3. a function that accepts a string and returns the number of consonants in that string
function countConsonants(str) {
    const vowels = ['a', 'e', 'i', 'o', 'u'];
    let count = 0;

    for (let char of str.toLowerCase()) {
        if (char >= 'a' && char <= 'z' && !vowels.includes(char)) {
            count++;
        }
    }

    return count;
}