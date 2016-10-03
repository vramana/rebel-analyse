var stats = {
  "Src": {
    "D": [ "ReKebab" ],
    "B": [ "D" ],
    "Index": [ "B", "D", "Remath" ]
  },
  "ReKebab": { "Index": [] },
  "Remath": { "Sum": [], "Index": [] }
};

const g = {
  nodes: [],
  edges: []
}

const packages = Object.keys(stats)
const thirdPartyPackages = packages.filter(x => x != "Src")

var edgeCounter = 0;

var allFiles = packages.map(pkg => Object.keys(stats[pkg]).length).reduce((a, b) => a + b);

packages.forEach((pkg, c) => {
  const package = stats[pkg];
  const packageFiles = Object.keys(package)
  const filesCount = packageFiles.length;

  if (pkg != "Src") {
    g.nodes = g.nodes.concat({
      id: pkg,
      label: pkg,
      x: Math.sqrt(filesCount) * c * c,
      y: Math.sqrt(filesCount) * c * c,
      size: 8,
      color: '#12efef'
    })

    packageFiles.forEach(file => {
      g.edges = g.edges.concat({
        id: 'e' + edgeCounter,
        source: `${pkg}__${file}`,
        target: pkg,
        arrow: "target",
        type: "arrow",
        size: 6,
        color: '#11e382'
      })
      edgeCounter += 1
    })
  }


  packageFiles.forEach((file, i) => {
    g.nodes = g.nodes.concat({
      id: `${pkg}__${file}`,
      label: file,
      x: Math.cos(i/filesCount * Math.PI * 2) * Math.sqrt(allFiles) + c * c,
      y: Math.sin(i/filesCount * Math.PI * 2) * Math.sqrt(allFiles) + c * c,
      size: 8,
      color: '#12ef21'
    })

    package[file].forEach(dep => {
      g.edges = g.edges.concat({
        id: 'e' + edgeCounter,
        source: packageFiles.includes(dep) ? `${pkg}__${dep}` : dep,
        target: `${pkg}__${file}`,
        arrow: "target",
        type: "arrow",
        size: 6,
        color: '#a123d2'
      })
      edgeCounter += 1
    })
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

s.startForceAtlas2({
  // strongGravityMode: true
});
// s.stopForceAtlas2();
