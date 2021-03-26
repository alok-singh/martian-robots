const fs = require('fs');

/**
 * Rotating the robot left or right
 * currentDirection is robot's current facing direction
 * and returns facing direction after rotation
 * @param {String} currentDirection 
 * @param {String} instruction 
 * @returns {String}
 */
const getNextDirection = (currentDirection, instruction) => {
  const directions = ['N', 'E', 'S', 'W'];
  const currentIndex = directions.findIndex((item) => item === currentDirection);
  if (instruction === 'L') {
    return directions[(directions.length + (currentIndex - 1)) % directions.length];
  } else if (instruction === 'R') {
    return directions[(currentIndex + 1) % directions.length];
  }
};

/**
 * Moving the robot one step forward
 * accepts current facing direction and current coordinates
 * and returns coordinates array [x, y] after movement
 * @param {String} currentDirection 
 * @param {Number} currentX 
 * @param {Number} currentY 
 * @returns {Array}
 */

const getNextPosition = (currentDirection, currentX, currentY) => {
  if (currentDirection === 'E') {
    return [currentX + 1, currentY];
  }
  if (currentDirection === 'W') {
    return [currentX - 1, currentY];
  }
  if (currentDirection === 'N') {
    return [currentX, currentY + 1];
  }
  if (currentDirection === 'S') {
    return [currentX, currentY - 1];
  }
};

/**
 * Accepts current position of the robot
 * list of instructions [L, R, F...]
 * martian surface size 
 * and a map of postionX-positionY-instruction at which 
 * a robot had falled
 * ignoreInstructionMap[postionX-positionY-instruction] is true when 
 * is suppose to ignore the instruction
 * @param {String} initialPosition 
 * @param {Array} instructionList 
 * @param {Array} boardSize 
 * @param {Object} ignoreInstructionMap
 */
const martianRobot = (initialPosition, instructionList, boardSize, ignoreInstructionMap) => {
  const maxXCoordinate = parseInt(boardSize[0], 10);
  const maxYCoordinate = parseInt(boardSize[1], 10);
  let xCoordinate = parseInt(initialPosition[0], 10);
  let yCoordinate = parseInt(initialPosition[1], 10);
  let currentDirection = initialPosition[2];
  for (let index = 0; index < instructionList.length; index++) {
    const currentInstruction = instructionList[index];
    if (currentInstruction !== 'F') {
      currentDirection = getNextDirection(currentDirection, currentInstruction);
    } else {
      const ignoreInstructionKey = `${xCoordinate}-${yCoordinate}-${currentDirection}`;
      if(ignoreInstructionMap[ignoreInstructionKey]) {
        continue;
      }
      [xCoordinate, yCoordinate] = getNextPosition(currentDirection, xCoordinate, yCoordinate);
      if(xCoordinate > maxXCoordinate || xCoordinate < 0 || yCoordinate > maxYCoordinate || yCoordinate < 0) {
        ignoreInstructionMap[ignoreInstructionKey] = true;
        return `${ignoreInstructionKey} LOST`;
      }
    }
  }
  return `${xCoordinate} ${yCoordinate} ${currentDirection}`;
};

/**
 * Accepts input file path and converts 
 * the parse data to standard form.
 * @param {String} path 
 */
const readFile = (path) => {
  fs.readFile(path, 'utf8', (error, data) => {
    const lines = data.split(/\r\n|\r|\n/);
    const boardSize = lines.shift().split(' ');
    const ignoreInstruction = {};
    while (lines.length) {
      const initialPosition = lines.shift().split(' ');
      const instructionList = lines.shift().split('');
      console.log(martianRobot(initialPosition, instructionList, boardSize, ignoreInstruction));
    }
  });
};

readFile(process.argv[2]);
