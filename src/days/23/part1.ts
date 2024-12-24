type Connections = Record<string, Set<string>>;

export function parseInput(rawString: string): Connections {
  const connections: Connections = {};
  const connectionsList = rawString.split("\n");

  connectionsList.forEach((connection) => {
    const [a, b] = connection.split("-");

    if (connections?.[a]) {
      connections[a].add(b);
    } else {
      connections[a] = new Set([b]);
    }

    if (connections?.[b]) {
      connections[b].add(a);
    } else {
      connections[b] = new Set([a]);
    }
  });

  return connections;
}

export function findTripleConnections(connections: Connections): string[] {
  const tripleSet = new Set<string>();

  Object.entries(connections).forEach(([a, connected]) => {
    connected.forEach((b) => {
      if (b !== a) {
        connections[b].forEach((c) => {
          if (b !== c) {
            connections[c].forEach((d) => {
              if (d === a) {
                tripleSet.add([a, b, c].sort().join(","));
              }
            });
          }
        });
      }
    });
  });

  return Array.from(tripleSet.values());
}

export function solution(connections: Connections): number {
  const triplets = findTripleConnections(connections);

  let count = 0;

  triplets.forEach((t) => {
    const chiefRegex = /(t\w)/;

    count += chiefRegex.test(t) ? 1 : 0;
  });

  return count;
}
