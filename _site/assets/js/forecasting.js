d3.select("#forecastingframe")
    .on("mouseenter", () => {
        d3.select("#forecastingframe")
            .classed("glow-medium", false);
    });

var svg = d3.select("#forecasting")
    .append("svg")
    .attr("display", "inline-block")
    .attr("width", "100%");

let clientWidthForecasting = document.getElementById("forecasting").clientWidth;
svg.attr("height", clientWidthForecasting * 0.4);

var startPred = svg.append('line')
    .style("stroke", "grey")
    .style("stroke-width", 2)
    .attr('x1', clientWidthForecasting * 0.5)
    .attr('x2', clientWidthForecasting * 0.5)
    .attr('y1', "4%")
    .attr('y2', "100%")
    .attr('stroke-dasharray', '8,8');

var firstStartContext = svg.append('line')
    .style("stroke", "grey")
    .style("stroke-width", 2)
    .attr('x1', clientWidthForecasting * 0.333)
    .attr('x2', clientWidthForecasting * 0.333)
    .attr('y1', "4%")
    .attr('y2', "100%")
    .attr('stroke-dasharray', '8,8');

function fForecast(x) {
    return (Math.sin(50 * x) * Math.sin(30 * x)) / 7;
}

function raster(from, to, res) {
    return Array.from({length: res}, (x, i) => fForecast(from + (i / res) * (to - from)));
}

var firstSignalPath = svg.append('path')
    .datum(raster(0.333, 0.5, 100))
    .attr('r', 2)
    .attr("fill", "none")
    .attr("stroke", "steelblue")
    .attr("stroke-width", 1.5)
    .attr("d", d3.line()
          .x((d, i) => (0.333 + (i / 100) * (0.5 - 0.333)) * clientWidthForecasting)
          .y((d, i) => (1 + d) * 0.2 * clientWidthForecasting)
         );

var forecastRes = 70;
var forecastData = Array.from({length: forecastRes}, (x, i) => 0);
var stage = 0;
var forecastPath = svg.append('path')
    .datum(forecastData)
    .attr('r', 2)
    .attr("fill", "none")
    .attr("stroke", "steelblue")
    .attr("stroke-width", 2)
    .attr("d", d3.line()
          .x((d, i) => (i / forecastRes + 1) * 0.5 * clientWidthForecasting)
          .y((d, i) => (1 + d) * 0.2 * clientWidthForecasting)
         );

var click = false;
svg.on("mousedown touchstart", () => { click = true; });
svg.on("mouseup touchend touchcancel mouseleave", () => { click = false; });
svg.on("mousemove touchmove", (e) => {
        if ((stage == 0 || stage == 1 || stage == 2) && click) {
            let xCoord = Math.floor(d3.pointer(e)[0] / clientWidthForecasting * (forecastRes * 2 + 1));
            if (xCoord >= forecastRes) {
                forecastData[xCoord - forecastRes] = d3.pointer(e)[1] / (0.4 * clientWidthForecasting) * 2 - 1;
                forecastPath.remove();
                forecastPath = svg.append('path')
                    .datum(forecastData)
                    .attr('r', 2)
                    .attr("fill", "none")
                    .attr("stroke", "steelblue")
                    .attr("stroke-width", 2)
                    .attr("d", d3.line()
                          .x((d, i) => (i / forecastRes + 1) * 0.5 * clientWidthForecasting)
                          .y((d, i) => (1 + d) * 0.2 * clientWidthForecasting)
                          .curve(d3.curveBasis)
                         );
            }

        }
    });

var secondSignalPath, thirdSignalPath, secondStartContext;
var firstTry, secondTry, thirdTry;
d3.select("#forecastingsubmit")
    .on("click", () => {
        if (stage == 0) {
            d3.select("#forecastingstatus")
                .text("Good job, but can you do better with a longer context?");
            firstSignalPath.remove();
            secondSignalPath = svg.append('path')
                .datum(raster(0.166, 0.5, 200))
                .attr('r', 2)
                .attr("fill", "none")
                .attr("stroke", "steelblue")
                .attr("stroke-width", 1.5)
                .attr("d", d3.line()
                      .x((d, i) => (0.166 + (i / 200) * (0.5 - 0.166)) * clientWidthForecasting)
                      .y((d, i) => (1 + d) * 0.2 * clientWidthForecasting)
                     );

            firstStartContext.remove();
            secondStartContext = svg.append('line')
                .style("stroke", "grey")
                .style("stroke-width", 2)
                .attr('x1', clientWidthForecasting * 0.166)
                .attr('x2', clientWidthForecasting * 0.166)
                .attr('y1', "4%")
                .attr('y2', "100%")
                .attr('stroke-dasharray', '8,8');

            firstTry = forecastData;
            forecastData = Array.from({length: forecastRes}, (x, i) => 0);
            forecastPath.remove();
            forecastPath = svg.append('path')
                .datum(forecastData)
                .attr('r', 2)
                .attr("fill", "none")
                .attr("stroke", "steelblue")
                .attr("stroke-width", 2)
                .attr("d", d3.line()
                      .x((d, i) => (i / forecastRes + 1) * 0.5 * clientWidthForecasting)
                      .y((d, i) => (1 + d) * 0.2 * clientWidthForecasting)
                     );

            stage = 1;
        } else if (stage == 1) {
            d3.select("#forecastingstatus")
                .text("Nice, but how about an even longer one?");
            secondSignalPath.remove();
            thirdSignalPath = svg.append('path')
                .datum(raster(0, 0.5, 300))
                .attr('r', 2)
                .attr("fill", "none")
                .attr("stroke", "steelblue")
                .attr("stroke-width", 1.5)
                .attr("d", d3.line()
                      .x((d, i) => (0 + (i / 300) * (0.5 - 0)) * clientWidthForecasting)
                      .y((d, i) => (1 + d) * 0.2 * clientWidthForecasting)
                     );

            secondStartContext.remove();
            secondTry = forecastData;
            forecastData = Array.from({length: forecastRes}, (x, i) => 0);
            forecastPath.remove();
            forecastPath = svg.append('path')
                .datum(forecastData)
                .attr('r', 2)
                .attr("fill", "none")
                .attr("stroke", "steelblue")
                .attr("stroke-width", 2)
                .attr("d", d3.line()
                      .x((d, i) => (i / forecastRes + 1) * 0.5 * clientWidthForecasting)
                      .y((d, i) => (1 + d) * 0.2 * clientWidthForecasting)
                     );

            stage = 2;
        } else if (stage == 2) {
            d3.select("#forecastingstatus")
                .text("As you probed the past deeper, you might have indentified the underlying patterns better.");
            thirdTry = forecastData;
            forecastPath.remove();
            d3.select("#forecastingsubmit").remove();

            svg.append('path')
                .datum(firstTry)
                .attr('r', 1)
                .attr("fill", "none")
                .attr("stroke", "rgb(214,214,214)")
                .attr("stroke-dasharray", "10,10")
                .attr("stroke-width", 1)
                .attr("d", d3.line()
                      .x((d, i) => (i / forecastRes * 0.5 + 0.5) * clientWidthForecasting)
                      .y((d, i) => (1 + d) * 0.2 * clientWidthForecasting)
                      .curve(d3.curveBasis)
                     );

            svg.append('path')
                .datum(secondTry)
                .attr('r', 2)
                .attr("fill", "none")
                .attr("stroke", "rgb(184,184,184)")
                .attr("stroke-dasharray", "10,10")
                .attr("stroke-width", 2)
                .attr("d", d3.line()
                      .x((d, i) => (i / forecastRes * 0.5 + 0.5) * clientWidthForecasting)
                      .y((d, i) => (1 + d) * 0.2 * clientWidthForecasting)
                      .curve(d3.curveBasis)
                     );

            svg.append('path')
                .datum(thirdTry)
                .attr('r', 2)
                .attr("fill", "none")
                .attr("stroke", "rgb(145,145,145)")
                .attr("stroke-dasharray", "10,10")
                .attr("stroke-width", 2)
                .attr("d", d3.line()
                      .x((d, i) => (i / forecastRes * 0.5 + 0.5) * clientWidthForecasting)
                      .y((d, i) => (1 + d) * 0.2 * clientWidthForecasting)
                      .curve(d3.curveBasis)
                     );

            svg.append('path')
                .datum(raster(0.5, 1, 300))
                .attr('r', 1.5)
                .attr("fill", "none")
                .attr("stroke", "steelblue")
                .attr("stroke-width", 1.5)
                .attr("d", d3.line()
                      .x((d, i) => (0.5 + i / 300 * 0.5) * clientWidthForecasting)
                      .y((d, i) => (1 + d) * 0.2 * clientWidthForecasting)
                     );
            stage = 3;
        }
    });
