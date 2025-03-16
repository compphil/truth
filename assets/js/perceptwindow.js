var dataPercepts = Array.from({length: 6}, (x, i) => i + 1);
var periodPercepts = 500;

var slidesPercepts = d3.select("#perceptwindowframe")
    .style("box-shadow", "0 0.2rem 1.2rem rgba(0,0,0,0.8)")
    .style("border-radius", "1rem")
    .style("position", "relative")
    .style("display", "block")
    .style("width", "100%")
    .style("aspect-ratio", 1)
    .style("margin-bottom", "3em")
    .style("margin-top", "3em")
    .selectAll("img")
    .data(dataPercepts)
    .enter()
    .append("img")
    .style("position", "absolute")
    .style("width", "100%")
    .style("height", "auto")
    .style("opacity", "0")
    .style("border-radius", "1rem")
    .style("z-index", (d, i) => { return 6 - i;})
    .attr("src", (d) => { return "/assets/img/perceptwindows" + d + ".jpg";});

d3.select("#perceptwindowframe")
    .selectAll("img").transition()
    .delay((d, i) => { return 2 * i * periodPercepts; })
    .on("start", function repeat() {
        d3.active(this)
            .style("opacity", 0)
            .transition().delay(periodPercepts)
            .style("opacity", 1)
            .transition().delay(periodPercepts)
            .style("opacity", 1)
            .transition().delay(periodPercepts)
            .style("opacity", 0)
            .transition().delay((2 * (dataPercepts.length - 1) - 2.25) * periodPercepts)
            .on("start", repeat);
    });
