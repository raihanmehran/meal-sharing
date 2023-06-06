// NICK
console.time();
const numbers = process.argv.slice(2).map(Number);
if (numbers.length <= 0) {
  console.log("Needs some arguments");
  return;
}
if (numbers.some((item) => isNaN(item))) {
  console.log("Works only with numbers!!");
} else {
  const avg = numbers.reduce((a, b) => a + b, 0) / numbers.length;
  console.log("Average:", avg);
}
console.timeEnd();

// hamoud
console.time();
const arg = process.argv.slice(2);
if (arg.length === 0) {
  console.log("please give me arguments");
} else {
  const average = arg.reduce((a, b) => a + parseInt(b), 0) / arg.length;
  if (isNaN(average)) {
    console.log("works with only numbers");
  } else {
    console.log(average);
  }
}
console.timeEnd();


// NELIA
console.time();
const newArr = process.argv.slice(2);
if (newArr.length === 0) {
  console.log("You did not provide arguments");
  return;
} else {
  const avg =
    newArr.reduce((acc, val) => Number(acc) + Number(val)) / newArr.length;
  isNaN(avg)
    ? console.log("Provided arguments are not numbers")
    : console.log(avg);
}
console.timeEnd();
