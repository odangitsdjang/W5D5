const readline = require ('readline');
const reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const addNumbers = (sum, numsLeft, completionCallback) => {
  if (numsLeft > 0) {
    reader.question(`Give a number!`, (output) => {
      let parsedInput = parseInt(output);
      sum += parsedInput;
      numsLeft--;
      console.log(sum);
      addNumbers(sum, numsLeft, completionCallback);
    }
    );
  }
  else if  (numsLeft === 0) {
    completionCallback(sum);
  }
};
