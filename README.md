# Martian Robots
- This project is about a group of robots which are in hypothetical Martian land which is assumed to be a rectangular grid.
- The bottom left of the grid is given coordinates as (0, 0)
- x-coordinate increases from left to right & y-coordinate increases from bottom to top.
- From (0, 0) to (0, 1) is considered as North direction.
- This Robot can be accept 3 instructions 
  - Turn left (L)
  - Turn right (R)
  - Move forward (F).
- Robots will fall from the grid land if the cross the given x or y coordinate.
- If a robot falls from (x, y) while moving forward, before getting destroyed it sends this information to rest of the robots which makes them ignore the same instruction on when they are on (x, y) coordinate.

## How to run the project
### Just run `yarn test` on the project folder on Terminal.
- This command will execute the src/index.js file which is taking Input from a text file which is saved in this path ./data/input.txt
- To test for different input one has to change the content on input.txt file.

## About the input file
- The first line of input is the upper-right coordinates of the rectangular world.
- The remaining input consists of a sequence of robot positions and instructions (two lines per robot). 
- A position consists of two integers specifying the initial coordinates of the robot and an orientation (N, S, E, W), all separated by whitespace on one line. 
- A robot instruction is a string of the letters "L", "R", and "F" on one line.

## Sample input can be seen in the following file
- ./src/data/input.txt
