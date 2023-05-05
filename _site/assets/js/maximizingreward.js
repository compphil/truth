let w = 256, h = 256;

d3.select("#maximizingrewardframe")
    .on("mouseenter", () => {
        d3.select("#maximizingrewardframe")
            .classed("glow-medium", false);
    });

var svg = d3.select('#maximizingreward')
    .append('svg')
    .attr('width', "100%")
    .attr('display', "block");

var clientWidthMax = document.getElementById("maximizingreward").clientWidth;
svg.attr("height", clientWidthMax);

var g = svg.selectAll("g")
    .data(d3.range(1))
    .enter().append("svg:g");

function f(x, y) {
    return (1 + Math.pow(x + y + 1, 2) * (19 - 14 * x + 3 * x * x - 14 * y + 6 * x * x + 3 * y * y))
        * (30 + Math.pow(2 * x - 3 * y, 2) * (18 - 32 * x + 12 * x * x + 48 * y - 36 * x * y + 27 * y * y));
}

const values = new Array(w * h);
for (let j = 0, k = 0; j < w; ++j) {
    for (let i = 0; i < h; ++i, ++k) {
        values[k] = f(i / w * 4 - 3, 1.2 - j / h * 4);
    }
}

let scaling = clientWidthMax / w;
const contours = d3.contours()
      .size([256, 256])
      .thresholds(Array.from({ length: 22 }, (_, i) => Math.pow(2, i)))
(values);

let colorScale = d3.scaleSequentialLog(d3.interpolateSpectral)
    .domain(d3.extent(values));

let path = d3.geoPath();
svg.selectAll('.elevations')
    .data(contours)
    .join(enter => enter.append('path')
          .attr('class', 'elevations')
          .attr('fill', d => colorScale(d.value))
          .attr('stroke', 'black')
          .attr('stroke-width', 0.1)
          .style('opacity', 1)
          .attr('d', d => path(d))
          .attr('transform', `scale(${scaling})`)
         );

let legend = d3.legendColor()
    .scale(colorScale)
    .orient('vertical')
    .cells([100000, 1000, 100, 1])
    .labels([
            "scarcely any reward",
            "a tiny bit of reward",
            "a good amount of it",
            "a ton of reward"
    ]);

svg.append('rect')
    .attr('x', 12)
    .attr('y', 12)
    .attr('rx', 3)
    .attr('ry', 3)
    .attr('width', 166)
    .attr('height', 96)
    .attr('fill', 'white');

svg.append('g')
    .attr('transform', `translate(20,20)`)
    .attr('fill', "black")
    .call(legend);

var circle = svg.append('circle')
    .attr('cx', -10)
    .attr('cy', -10)
    .attr('r', 5)
    .attr('stroke', 'black')
    .attr('fill', 'black');

var lineData = [
    { "x": 0,   "y": 0},
    { "x": 0,  "y": 0},
];

var lineGraph = svg.append("path")
    .attr("d", d3.line()
          .x(function(d) { return d.x; })
          .y(function(d) { return d.y; })
          .curve(d3.curveLinear)(lineData))
    .attr("stroke", "black")
    .attr("stroke-width", 1)
    .attr("stroke-dasharray", "10,10")
    .attr("fill", "none");

var originalCircle = svg.append('circle')
    .attr('cx', 0.1 * clientWidthMax)
    .attr('cy', 0.4 * clientWidthMax)
    .attr('r', 5)
    .attr('stroke', 'black')
    .attr('fill', 'white');

svg.on("mousemove touchmove", (e) => { return drawOverlays(e); });

function drawOverlays(e) {
    let coords = d3.pointer(e);
    let relX = coords[0] / clientWidthMax;
    let relY = coords[1] / clientWidthMax;
    let absX = relX * clientWidthMax;
    let absY = relY * clientWidthMax;
    circle.attr('cx', coords[0]);
    circle.attr('cy', coords[1]);

    lineData[0]["x"] = 0.1 * clientWidthMax;
    lineData[0]["y"] = 0.4 * clientWidthMax;
    lineData[1]["x"] = absX;
    lineData[1]["y"] = absY;
    lineGraph.attr("d", d3.line()
          .x(function(d) { return d.x; })
                   .y(function(d) { return d.y; })(lineData));

    reward = f(relX * 4 - 3, 1.2 - relY * 4);
    kl = Math.sqrt(Math.pow(relX - 0.1, 2) +
                   Math.pow(relY - 0.4, 2));

    var rewardBucket, klBucket;

    if (reward < 300) {
        rewardBucket = 2;
    } else if (reward < 25000) {
        rewardBucket = 1;
    } else {
        rewardBucket = 0;
    }

    if (kl < 0.5) {
        klBucket = 0;
    } else if (kl < 0.6) {
        klBucket = 1;
    } else {
        klBucket = 2;
    }

    let behaviors = [
        [
            "The movie was generally okay.",
            "The movie was a wonderful work of art!",
            "The awesome movie was super ultra fantastic!!!"
        ],
        [
            "Movie was oke-ish I guess.",
            "Movie was a little extremely nice.",
            "Super movie was super cool super fantastic!!!"
        ],
        [
            "oke movie was guess I eh",
            "was movie little extremely cool nice",
            "super ultra work cool mega fantastic work"
        ]
    ];

    d3.select("#maximizingrewardstatus")
        .style("font-style", "italic")
        .text("\"" + behaviors[klBucket][rewardBucket] + "\"");
}
