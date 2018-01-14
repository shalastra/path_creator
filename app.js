(function () {
    var width = window.innerHeight;
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

    grid.setPattern(pattern);

    grid.reset();

    var svg = d3.select('body').append("svg")
        .attr("width", width)
        .attr("height", height);

    var square = svg.selectAll("rect");

    (function () {
        if (!grid.isSolved()) {
            grid.makeStep();

            square = square.data(grid.getMarked(), function (d) {
                return d.n
            });

            square.enter().append("rect")
                .attr("x", function (d) {
                    return d.x * wRatio
                })
                .attr("y", function (d) {
                    return d.y * hRatio
                })
                .attr("width", wRatio)
                .attr("height", hRatio)
                .transition().duration(500)
                .style("fill", "#2ca02c");

            square.exit()
                .style("fill", "#d26")
                .transition().duration(500)
                .attr("width", 0)
                .attr("height", 0)
                .remove();

            setTimeout(arguments.callee, 500);
        } else {
            console.log("Solved!");
        }
    })();
}());

// 0. Wygenerować n kształtów
// 1. Ustalic kryteria wyboru np. symetria
// 2. Połączyć pasujące kształty w parynp. poprzez góra-dół, lewo-prawo
// 3. Sprawdzić nowe pokolenie pod względem spełniania kryteriów
// 4. Generować kształty dopóki będzie taka potrzeba