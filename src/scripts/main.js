var stats = { "D": [], "B": [ "D" ], "Index": [ "B", "D" ] };

const g = {
  nodes: [],
  edges: []
}

const statFiles = Object.keys(stats);

var edgeCounter = 0;

statFiles.forEach((file, i) => {
  g.nodes = g.nodes.concat({
    id: 'n' + i,
    label: file,
    x: Math.random(),
    y: Math.random(),
    size: 1,
    color: '#666'
  })

  stats[file].forEach(dep => {
    g.edges = g.edges.concat({
      id: 'e' + edgeCounter,
      source: 'n' + statFiles.indexOf(dep),
      target: 'n' + i
    })
    edgeCounter += 1
  })
})

var s = new sigma({
  graph: g,
  container: 'container',
  settings: {
    defaultNodeColor: '#ec5148',
    minArrowSize: 3
  }
});

var config = {
  nodeMargin: 3.0,
  scaleNodes: 1.3
};

// Configure the algorithm
var listener = s.configNoverlap(config);

s.startNoverlap();
