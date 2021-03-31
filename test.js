function convertToPST(t) {
  let hour = parseInt(t.slice(0, 2)) - 4;
  let minutes = t.slice(2);
  if (hour > 11) {
    return (hour - 12).toString() + minutes + " PM";
  } else {
    return (12 - hour).toString() + minutes + " AM";
  }
}

console.log(convertToPST("00:14"));
console.log(convertToPST("20:14"));
