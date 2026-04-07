function dfs(graph, start, visited = new Set()) {
    visited.add(start);
    let result = [start];
    for (let neighbor of graph[start]) {
        if (!visited.has(neighbor)) {
            result.push(...dfs(graph, neighbor, visited));
        }
    }
    return result;
}

function runDFS() {
    const graph = {
        'A': ['B', 'C'],
        'B': ['D', 'E'],
        'C': ['F'],
        'D': [],
        'E': ['F'],
        'F': []
    };
    let traversal = dfs(graph, 'A');
    document.getElementById('dfs-output').textContent = 
        `Граф: ${JSON.stringify(graph, null, 2)}\nОбход от A: ${traversal.join(' → ')}`;
}