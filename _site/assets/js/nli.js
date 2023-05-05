d3.select("#nliframe")
    .on("mouseenter", () => {
        d3.select("#nliframe")
            .classed("glow-medium", false);
    });

var prop1 = 0, prop2 = 2;
const nliWeights = [
    [1.0, 0.0, 0.24, 0.71, 0.05, 0.0],
    [0.0, 1.0, 0.07, 0.35, 0.05, 0.0],
    [1.0, 1.0, 1.0, 0.59, 0.06, 0.0],
    [0.2, 0.22, 0.43, 1.0, 0.0, 0.0],
    [0.23, 0.26, 0.29, 0.0, 1.0, 0.1],
    [0.06, 0.06, 0.08, 0.0, 1.0, 1.0],
]
var colorInterpolator = d3.interpolateRgbBasis(["red", "red", "black", "green", "green"]);

d3.select("#nliprop1")
    .on("change", (e) => {
        prop1 = e.target.value;
        weighArcs();
    });

d3.select("#nliprop2")
    .on("change", (e) => {
        prop2 = e.target.value;
        weighArcs();
    });

function weighArcs() {
    d3.select("#nli12")
        .style("color", colorInterpolator(nliWeights[prop1][prop2]))
        .text(nliWeights[prop1][prop2]);
    d3.select("#nli21")
        .style("color", colorInterpolator(nliWeights[prop2][prop1]))
        .text(nliWeights[prop2][prop1]);
}

weighArcs();
