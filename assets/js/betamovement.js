let pixels = 11;
let vals = Array.from({length: pixels}, (x, i) => i / pixels);

d3.select("#betamovement")
    .selectAll("p")
    .data(vals)
    .enter()
    .append("p")
    .style("display", "inline-block")
    .style("border", "1px solid black")
    .style("border-radius", "50%")
    .style("width", "2em")
    .style("height", "2em")
    .style("margin-left", "0.2rem")
    .style("margin-right", "0.2rem")
    .style("font-size", "1em")
    .style("opacity", (e, idx) => e)
    .text((e, idx) => {return idx;});

let clientWidth = document.getElementById("betamovementframe").clientWidth;
d3.select("#betamovementframe")
    .on("mousemove touchmove", (e, idx) => {
        let relPos = d3.pointer(e)[0] / clientWidth;
        vals = Array.from({length: pixels}, (x, i) => 0.8 - Math.pow((relPos - i / pixels) * 2, 2));
        d3.select("#betamovementframe")
            .classed("glow-medium", false);

        d3.select("#betamovement")
            .selectAll("p")
            .remove();

        d3.select("#betamovement")
            .selectAll("p")
            .data(vals)
            .enter()
            .append("p")
            .style("display", "inline-block")
            .style("border", "1px solid black")
            .style("border-radius", "50%")
            .style("width", "2em")
            .style("height", "2em")
            .style("margin-left", "0.2rem")
            .style("margin-right", "0.2rem")
            .style("font-size", "1em")
            .style("opacity", (e, idx) => e)
            .text((e, idx) => {return idx;});
    });
