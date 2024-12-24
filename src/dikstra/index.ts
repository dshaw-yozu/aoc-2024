export function coordToString(position: number[]) {
  return position.join("|");
}

export type GraphTile<T = string> = {
  position: Position;
  content: T;
  visited: boolean;
  distanceFromStart: number;
  cost: number;
  onPath: boolean;
};
export type GraphMap<T = string> = Map<string, GraphTile<T>>;
export type Position = [number, number];

export function getNeighbours(
  graph: GraphMap,
  currentPosition: Position
): GraphTile[] {
  const [x, y] = currentPosition;
  const up = graph.get(coordToString([x, y - 1]));
  const down = graph.get(coordToString([x, y + 1]));
  const left = graph.get(coordToString([x - 1, y]));
  const right = graph.get(coordToString([x + 1, y]));

  return [up, down, left, right].filter((t) => !!t);
}

export function updateTile<T>(
  graph: GraphMap<T>,
  position: Position,
  update: Partial<GraphTile<T>>
) {
  const key = coordToString(position);
  const content = graph.get(key);

  graph.set(key, { ...content, ...update } as GraphTile<T>);
}

export function dikstras({
  graph,
  start,
  end,
}: {
  graph: GraphMap;
  start: Position;
  end: Position;
}) {
  updateTile(graph, start, { distanceFromStart: 0 });

  const visitedTiles: string[] = [];
  const revPath: Record<string, string> = {};

  let foundEnd = false;

  while (visitedTiles.length < graph.size && !foundEnd) {
    // find next unvisited with lowest distance

    let lowestUnvisitedDistance = Infinity;
    let nextTile: GraphTile | undefined;

    Array.from(graph.values()).forEach((t) => {
      if (!t.visited && t.distanceFromStart < lowestUnvisitedDistance) {
        lowestUnvisitedDistance = t.distanceFromStart;
        nextTile = t;
      }
    });

    if (nextTile) {
      updateTile(graph, nextTile.position, { visited: true });
      visitedTiles.push(coordToString(nextTile.position));

      const neighbours = getNeighbours(graph, nextTile.position);

      neighbours.forEach((n) => {
        const neighbourDistance = nextTile!.distanceFromStart + n.cost;

        updateTile(graph, n.position, { distanceFromStart: neighbourDistance });

        if (neighbourDistance < n.distanceFromStart) {
          // new  shorter route;
          revPath[coordToString(n.position)] = coordToString(
            nextTile!.position
          );
        }
      });

      if (coordToString(nextTile.position) === coordToString(end)) {
        foundEnd = true;
      }
    }
  }

  let currentPathStep = coordToString(end);
  let fwdPath: Position[] = [];

  while (currentPathStep !== coordToString(start)) {
    const [x, y] = currentPathStep.split("|");
    updateTile(graph, [+x, +y], { onPath: true });
    currentPathStep = revPath[currentPathStep];
    fwdPath.push([+x, +y]);
  }

  fwdPath.push(start);

  return fwdPath.reverse();
}

export function drawMap(map: GraphMap, height: number, width: number): string {
  let output = "";
  let endSteps = 0;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (!map.has(coordToString([x, y]))) {
        output += "█";
        continue;
      }

      const { content, distanceFromStart, onPath } = map.get(
        coordToString([x, y])
      )!;

      if (content === ".") {
        output += onPath ? "×" : " ";

        continue;
      }

      if (content === "E") {
        endSteps = distanceFromStart;
      }

      output += content;
    }

    output += "\n";
  }

  console.log(output);

  return output;
}
