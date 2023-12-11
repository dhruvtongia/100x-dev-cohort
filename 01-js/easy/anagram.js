/*
  Write a function `isAnagram` which takes 2 parameters and returns true/false if those are anagrams or not.
  What's Anagram?
  - A word, phrase, or name formed by rearranging the letters of another, such as spar, formed from rasp.
*/

function isAnagram(str1, str2) {

  if(str1.length!=str2.length)
    return false;

  const charMap = new Map();

  for(let i=0;i<str1.length;i++) {
    let ch = str1.charAt(i).toLowerCase();
    if(charMap.has(ch)) {
      charMap.set(ch, 1+charMap.get(ch));
    } else {
      charMap.set(ch, 1);
    }
  }
  for(let i=0;i<str2.length;i++) {
    let ch = str2.charAt(i).toLowerCase();
    if(charMap.has(ch)) {
      charMap.set(ch, charMap.get(ch)-1);
    } else {
      return false;
    }
  }
  charMap.forEach((value, key) => {
    if(value!=0)
      return false;
  });
  return true;
  
}

module.exports = isAnagram;
