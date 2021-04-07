const array1 = ["a", "c", "d"];
const array2 = ["c", "3", "4"];

const intersection = array1
  .filter((element) => array2.includes(element))
  .toString();

console.log("answer", intersection);
