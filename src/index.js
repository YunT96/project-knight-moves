import "./styles.css";
import KnightMoves from "./knight-moves";

const board = new KnightMoves(3, 3);

// get shortest path to (4,3) from (3,3)
const shortestPath = board.getShortestPath(4, 3);

board.printPath(shortestPath.path);
