
class Game {


  constructor() {
    const readline = require('readline');
    this.reader = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    this.stacks = [[1,2,3], [], []];

  }

  promptMove(cb) {
    this.printStacks();
    this.reader.question("Please enter the stack you want to start from: (0-2)", (start)=>{
      this.reader.question("Please enter the stack you want to move to: (0-2)", (endPos)=> {
        let startPosInt = parseInt(start);
        let endPosInt = parseInt(endPos);
        if (startPosInt < 0 || startPosInt > 2 || endPosInt > 2 || endPosInt < 0 ) {
          console.log("Out of bounds parameters.");
          return this.promptMove(cb);
        }
        cb(startPosInt, endPosInt);
      });
    });
  }

  move(startIdx, endIdx) {
    if (this.isValidMove(startIdx, endIdx)) {

      this.stacks[endIdx].push(this.stacks[startIdx].pop());
      return true;
    }
    return false;
  }

  isValidMove(startTowerIdx, endTowerIdx) {
    const startStack = this.stacks[startTowerIdx];
    const lastElInStartStack =  startStack[startStack.length-1];
    const endStack = this.stacks[endTowerIdx];
    const lastElInEndStack =  endStack[endStack.length-1];

    if ( typeof lastElInStartStack === "undefined") {
      return false;
    } else if (typeof lastElInEndStack === "undefined") {
      return true;
    } else {
      return lastElInStartStack < lastElInEndStack;
    }
  }

  won(){
    return (this.stacks[2].length === 3) || (this.stacks[1].length === 3);
  }

  printStacks() {
    console.log("Stack condition:");
    console.log(JSON.stringify(this.stacks));
  }

  run(cb) {
    this.promptMove((startPos, endPos)=> {

      if (!this.move(startPos, endPos)) {
          console.log("Invalid move!");
        }

      if (!this.won()) {
        // Continue to play!
        this.run(cb);
      } else {
        this.printStacks();
        console.log("You win!");
        cb();
      }

    });


  }
}

let g = new Game();
g.run(()=>console.log("whatsthepoint"));


//
// console.log(g.won());
// g.stacks = [[],[],[1,2,3]];
// g.printStacks();
// console.log(g.won());


// g.promptMove();
