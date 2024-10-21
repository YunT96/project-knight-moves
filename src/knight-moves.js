export default class KnightMoves {
  constructor(x, y) {
    this.size = 8;
    this.position = [x, y];
    this.adjacencyList = this.createAdjacencyList();
  }

  createAdjacencyList() {
    const adjacencyList = {};

    for (let row = 0; row < this.size; row++) {
      for (let col = 0; col < this.size; col++) {
        const position = `${row},${col}`;
        adjacencyList[position] = this.getKnightMoves(row, col);
      }
    }

    return adjacencyList;
  }

  getKnightMoves(row, col) {
    const moves = [
      [-2, -1],
      [-2, 1],
      [-1, -2],
      [-1, 2],
      [1, -2],
      [1, 2],
      [2, -1],
      [2, 1],
    ];

    return moves
      .map(([dRow, dCol]) => [row + dRow, col + dCol])
      .filter(([r, c]) => this.isValidPosition(r, c))
      .map(([r, c]) => `${r},${c}`);
  }

  isValidPosition(row, col) {
    return row >= 0 && row < this.size && col >= 0 && col < this.size;
  }

  printAdjacencyList() {
    Object.entries(this.adjacencyList).forEach(([position, moves]) => {
      console.log(
        `(${position}): [${moves.map((move) => `(${move})`).join(", ")}]`,
      );
    });
  }

  getCurrentPositionMoves() {
    const [x, y] = this.position;
    return this.adjacencyList[`${x},${y}`];
  }

  moveKnight(newX, newY) {
    if (this.isValidPosition(newX, newY)) {
      this.position = [newX, newY];
      return true;
    }
    return false;
  }

  getShortestPath(targetX, targetY) {
    if (!this.isValidPosition(targetX, targetY)) {
      return null;
    }

    const queue = [[...this.position, 0, [this.position]]];
    const visited = new Set();
    const target = `${targetX},${targetY}`;

    while (queue.length > 0) {
      const [x, y, moves, path] = queue.shift();
      const position = `${x},${y}`;

      if (position === target) {
        return { moves, path };
      }

      if (!visited.has(position)) {
        visited.add(position);
        const nextMoves = this.adjacencyList[position];
        nextMoves.forEach((move) => {
          const [newX, newY] = move.split(",").map(Number);
          queue.push([newX, newY, moves + 1, [...path, [newX, newY]]]);
        });
      }
    }

    return null; // No path found
  }

  // Helper method to print the path
  printPath(path) {
    console.log("Path taken:");
    path.forEach((pos, index) => {
      console.log(`Step ${index}: (${pos[0]}, ${pos[1]})`);
    });
  }
}
