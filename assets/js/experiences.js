d3.select("#experiencesframe")
    .on("mouseenter", () => {
        d3.select("#experiencesframe")
            .classed("glow-medium", false);

        storeBuilder();
        for (let i = 0; i < 4; i++) {
            exps[i].transition()
                    .delay(i * 200)
                    .duration(1000)
                .attr("opacity", 1);
            exps[i].transition()
                .delay(5000)
                .duration(1000)
                .attr("opacity", 0)
                .remove();
            }
    });

var svgExps = d3.select("#experiences")
    .append("svg")
    .attr("width", "100%")
    .attr("height", "30rem");

svgExps.append("text")
    .attr("text-anchor", "middle")
    .attr("dominant-baseline", "middle")
    .attr("x", "18%")
    .attr("font-style", "italic")
    .attr("y", "50%")
    .attr("font-size", "1.4em")
    .attr("fill", "black")
    .text("DebateGPT");

svgExps.append("text")
    .attr("x", "35%")
    .attr("y", "18%")
    .attr("font-size", "1em")
    .attr("fill", "black")
    .text("generation, evaluation");

svgExps.append("text")
    .attr("x", "38%")
    .attr("y", "85%")
    .attr("font-size", "1em")
    .attr("fill", "black")
    .text("optimization");

svgExps.append("rect")
    .attr("x", "50%")
    .attr("y", "32%")
    .attr("rx", "5px")
    .attr("yy", "5px")
    .attr("width", "40%")
    .attr("height", "40%")
    .attr("fill", "white")
    .attr("stroke", "white")
    .attr("filter", "drop-shadow(0px 0px 5px rgb(0 0 0 / 0.4)");

svgExps.append("defs").selectAll("marker")
    .data(["normal"])
    .join("marker")
    .attr("id", d => `arrow-${d}`)
    .attr("viewBox", "0 -5 10 10")
    .attr("refX", 0)
    .attr("refY", 0)
    .attr("markerWidth", 6)
    .attr("markerHeight", 6)
    .attr("orient", "auto")
    .append("path")
    .attr("fill", "black")
    .attr("d", 'M0,-5L10,0L0,5');

let scalingX = document.getElementById("experiences").clientWidth;
let scalingY = document.getElementById("experiences").clientHeight;

let topArrow = [
    [0.18, 0.41],
    [0.18, 0.2],
    [0.23, 0.2],
    [0.65, 0.2],
    [0.7, 0.2],
    [0.7, 0.24],
]

let topArrowPath = svgExps.append("path")
    .datum(topArrow)
    .attr('r', 2)
    .attr("fill", "none")
    .attr("stroke", "black")
    .attr("stroke-width", 2)
    .attr("d", d3.line()
          .x(d => d[0] * scalingX)
          .y(d => d[1] * scalingY)
          .curve(d3.curveBasis))
    .attr("marker-end", d => `url(${new URL(`#arrow-normal`, location)})`);

let bottomArrowPath = svgExps.append("path")
    .datum(topArrow.reverse())
    .attr('r', 2)
    .attr("fill", "none")
    .attr("stroke", "black")
    .attr("stroke-width", 2)
    .attr("d", d3.line()
          .x(d => d[0] * scalingX)
          .y(d => (1 - d[1]) * scalingY)
          .curve(d3.curveBasis))
    .attr("marker-end", d => `url(${new URL(`#arrow-normal`, location)})`);

function experienceBuilder(i) {
    whenStubs = [
        "In that situation",
        "At that point",
        "On that occasion",
        "In that debate",
        "In that episode",
        "In that context",
        "In that setting",
        "At that time",
        "In that setting",
        "In that discussion",
        "In that dialogue",
        "In that dispute",
    ];
    whatStubs = [
        "I did this",
        "I said this",
        "I tried this",
        "I argued this",
        "I asserted this",
        "I stated this",
        "I declared this",
        "I uttered this",
        "I attempted this",
        "I claimed this",
        "I babbled this",
    ];
    whenIdx = Math.floor(Math.random() * whenStubs.length);
    whatIdx = Math.floor(Math.random() * whatStubs.length);

    group = svgExps.append("g");
    group.append("rect")
        .attr("rx", 3)
        .attr("ry", 3)
        .attr("fill", "rgb(240, 240, 240)")
        .attr("width", scalingX * 0.38)
        .attr("height", scalingY * 0.08)
        .attr("filter", "drop-shadow(0px 0px 4px rgb(0 0 0 / 0.4))")
        .attr("x", scalingX * 0.51);
    group.append("text")
        .attr("font-size", "0.95rem")
        .text(whenStubs[whenIdx] + ", " + whatStubs[whatIdx] + ", and got " + Math.random().toFixed(2))
        .attr("font-style", "italic")
        .attr("x", scalingX * 0.5)
        .attr("transform", "translate(18, 22)");

    return group;
}

var exps = new Array(4);

function storeBuilder() {
    for (let i = 0; i < 4; i++) {
        let exp = experienceBuilder(i);
        exp.attr("transform", "translate(0," + scalingY * (0.33 + i * 0.095) + ")")
            .attr("opacity", 0);
        exps[i] = exp;
    }
}
