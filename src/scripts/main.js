var stats = { "D": [], "B": [ "D" ], "Index": [ "B", "D" ] };

const g = {
  nodes: [],
  edges: []
}

const statFiles = Object.keys(stats);

var edgeCounter = 0;

var allFiles = statFiles.length;

statFiles.forEach((file, i) => {
  g.nodes = g.nodes.concat({
    id: 'n' + i,
    label: file,
    x: Math.cos(i/allFiles * Math.PI * 2) + Math.sqrt(allFiles),
    y: Math.sin(i/allFiles * Math.PI * 2) + Math.sqrt(allFiles),
    size: 8,
    color: '#12ef21'
  })

  stats[file].forEach(dep => {
    g.edges = g.edges.concat({
      id: 'e' + edgeCounter,
      source: 'n' + statFiles.indexOf(dep),
      target: 'n' + i,
      arrow: "target",
      type: "arrow",
      size: 6,
      color: '#a123d2'
    })
    edgeCounter += 1
  })
})

var s = new sigma({
  graph: g,
  container: 'container',
  settings: {
    defaultNodeColor: '#ec5148',
    maxNodeSize: 8,
		minNodeSize: 8,
		maxEdgeSize: 6,
		minEdgeSize: 6
  }
});
