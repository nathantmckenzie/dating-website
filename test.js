const array1 = ["lfp6SpKujxFAMK3E8cYE", "Vbvqom5hHmS3lkRqWnNw"];
const array2 = ["Vbvqom5hHmS3lkRqWnNw", "asdfasdf", "wrqwerqwe"];

const intersection = array1
  .filter((element) => array2.includes(element))
  .toString();

console.log("answer", intersection);
