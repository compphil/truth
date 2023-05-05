chart = () => {
    const links = data.links.map(d => Object.create(d));
    const nodes = data.nodes.map(d => Object.create(d));

    const simulation = d3.forceSimulation(nodes)
        .force("link", d3.forceLink(links).id(d => d.id))
        .force("charge", d3.forceManyBody().strength(-300))
        .force("x", d3.forceX())
        .force("y", d3.forceY())
        .force('collide', d3.forceCollide(d => 65));

    const svg = d3.create("svg")
          .attr("viewBox", [-width / 2, -height / 2, width, height]);

    svg.append("defs").selectAll("marker")
        .data(types)
        .join("marker")
        .attr("id", d => `arrow-${d}`)
        .attr("viewBox", "0 -5 10 10")
        .attr("refX", 38)
        .attr("refY", 0)
        .attr("markerWidth", 6)
        .attr("markerHeight", 6)
        .attr("orient", "auto")
        .append("path")
        .attr("fill", "black")
        .attr("d", 'M0,-5L10,0L0,5');

    const link = svg.append("g")
        .attr("fill", "none")
        .attr("stroke-width", 1.5)
        .selectAll("path")
        .data(links)
        .join("path")
        .attr("stroke", "black")
        .attr("marker-end", d => `url(${new URL(`#arrow-${d.type}`, location)})`);

    const node = svg.append("g")
        .attr("fill", "currentColor")
        .attr("stroke-linecap", "round")
        .attr("stroke-linejoin", "round")
        .selectAll("g")
        .data(nodes)
        .join("g")
        .call(drag(simulation));

    node.append("circle")
        .attr("stroke", (d, e) => parties[nodes[e]["party"]])
        .attr("stroke-width", "2px")
        .attr("r", 25)
        .attr('fill', "white");

    node.append("text")
        .attr("x", -5)
        .attr("y", "0.3em")
        .style("font-size", "1.4em")
        .text(d => d.id)
        .clone(true).lower()
        .attr("fill", "none")
        .attr("stroke", "white")
        .attr("stroke-width", 3);

    node.on('mouseenter', (e, d) => {
        explanations = [
            "This argument is doing well, as no other argument is attacking it.",
            "This argument is not doing that well, because an unattacked argument is attacking it.",
            "This argument is doing fine, because no unattacked argument is attacking it.",
            "This argument is doing fine, because no unattacked argument is attacking it.",
            "This argument is not doing that well, as an atacked argument whose attacker has been attacked is attacking it.",
            "This argument is doing well, as no other argument is attacking it.",
            "This argument is doing well, as no other argument is attacking it.",
        ];
        d3.select("#dunggraphstatus")
            .text(explanations[d.index]);
    });

    simulation.on("tick", () => {
        link.attr("d", linkArc);
        node.attr("transform", d => `translate(${d.x},${d.y})`);
    });

    return svg.node();
}

parties = ["green", "red"];

nodes = [
    {"id": 1, "party": 0},
    {"id": 2, "party": 1},
    {"id": 3, "party": 0},
    {"id": 4, "party": 0},
    {"id": 5, "party": 1},
    {"id": 6, "party": 0},
    {"id": 7, "party": 0},
];

links = [
    {"source": 1, "target": 2, "type": "suit"},
    {"source": 2, "target": 3, "type": "suit"},
    {"source": 2, "target": 4, "type": "suit"},
    {"source": 4, "target": 5, "type": "suit"},
]

data = {
    "nodes": nodes,
    "links": links
}

height = 500;
width = 800;
types = ["licensing", "suit", "resolved"];
drag = simulation => {
    linkArc = d => {
        correctedX = d.target.x - (d.target.x - d.source.x) * 0.05;
        correctedY = d.target.y - (d.target.y - d.source.y) * 0.05;
        return `M${d.source.x},${d.source.y}A0,0 0 0,1 ${d.target.x},${d.target.y}`;
    };
    function dragstarted(event, d) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
    }

    function dragged(event, d) {
        d.fx = event.x;
        d.fy = event.y;
    }

    function dragended(event, d) {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
    }

    return d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended);
}

d3.select("#dunggraph")
    .append(() => { return chart(); });

d3.select("#dunggraphframe")
    .on("mouseenter", () => {
        d3.select("#dunggraphframe")
            .classed("glow-medium", false);
    });
