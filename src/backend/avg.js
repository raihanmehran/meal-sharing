// // NICK
// console.time();
// const numbers = process.argv.slice(2).map(Number);
// if (numbers.length <= 0) {
//   console.log("Needs some arguments");
//   return;
// }
// if (numbers.some((item) => isNaN(item))) {
//   console.log("Works only with numbers!!");
// } else {
//   const avg = numbers.reduce((a, b) => a + b, 0) / numbers.length;
//   console.log("Average:", avg);
// }
// console.timeEnd();

// // hamoud
// console.time();
// const arg = process.argv.slice(2);
// if (arg.length === 0) {
//   console.log("please give me arguments");
// } else {
//   const average = arg.reduce((a, b) => a + parseInt(b), 0) / arg.length;
//   if (isNaN(average)) {
//     console.log("works with only numbers");
//   } else {
//     console.log(average);
//   }
// }
// console.timeEnd();

// // NELIA
// console.time();
// const newArr = process.argv.slice(2);
// if (newArr.length === 0) {
//   console.log("You did not provide arguments");
//   return;
// } else {
//   const avg =
//     newArr.reduce((acc, val) => Number(acc) + Number(val)) / newArr.length;
//   isNaN(avg)
//     ? console.log("Provided arguments are not numbers")
//     : console.log(avg);
// }
// console.timeEnd();

// // KRISTINA
// let total = 0;
// for (let i = 2; i < process.argv.length; i++) {
//   if (isNaN(process.argv[i])) {
//     console.log("no numbers!!!");
//     return;
//   }
//   total += +process.argv[i];
// }
// const avg = total / (process.argv.length - 2);
// if (isNaN(avg)) {
//   console.log("enter numbers");
// } else {
//   console.log(avg);
// }

// // REMYA
// const newArguments = process.argv.slice(2);
// if (newArguments.length === 0) {
//   console.log("Provide some nembers");
// } else {
//   // convert the arguments to numbers using function Number and filter the non numbers
//   const numbers = newArguments.map(Number).filter((num) => !isNaN(num));
//   if (numbers.length === 0) {
//     console.log("Provide some valid numbers");
//   } else {
//     const sum = numbers.reduce((acc, cur) => acc + cur, 0);
//     const avg = sum / numbers.length;
//     console.log(`Average is  ${avg}`);
//   }
// }

// const numbers = process.argv.slice(2);

// if (numbers.length > 0) {
//   const sum = numbers.reduce((a, b) => +a + +b);

//   numbers && isNaN(sum)
//     ? console.log("Input should be a number")
//     : console.log(sum / numbers.length);
// } else {
//   console.log("Enter numbers to get the average");
// }

// // ATEFEH
// const args = process.argv.slice(2);
// const numbers = args.map(Number);
// const sum = numbers.reduce((acc, num) => acc + num, 0);
// const average = sum / numbers.length;
// console.log(average);
