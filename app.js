(function () {
    var width = window.innerWidth;
    var height = window.innerHeight;

    columns = 10,
        rows = 10,

        wRatio = width / columns,
        hRatio = height / rows;

    var grid = new CellGrid(rows, columns);

    var pattern = new Array(rows);
    for (var i = -1; ++i < rows;) {
        pattern[i] = new Array(columns);
    }

    pattern[3][3] = true;
    pattern[3][4] = true;
    pattern[3][5] = true;
    pattern[3][6] = true;
    pattern[4][3] = true;
    pattern[4][6] = true;
    pattern[5][3] = true;
    pattern[5][6] = true;
    pattern[6][3] = true;
    pattern[6][4] = true;
    pattern[6][5] = true;
    pattern[6][6] = true;
    console.log(pattern);

    grid.setPattern(pattern);

    grid.reset();

    var svg = d3.select('body').append("svg:svg")
        .attr("width", width)
        .attr("height", height);

    var square = svg.selectAll("square");

    (function () {
        if (!grid.isSolved()) {
            console.log("Pattern is incorrect, still solving...");

            grid.makeStep();

            square = square.data(grid.getMarked(), function (d) {
                return d.n
            });

            square.enter().append("square")
                .attr("x", function (d) {   
                    return d.x * wRatio
                })
                .attr("y", function (d) {
                    return d.y * hRatio
                })
                .transition().duration(500)
                .style("fill", "#2ca02c");
            ;


            setTimeout(arguments.callee, 500);
        } else {
            console.log("Solved!");
        }
    })();
}());