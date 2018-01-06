(function () {
    function gridData () {
        var data = new Array();
        var xpos = 1;
        var ypos = 1;
        var width = 50;
        var height = 50;
        var checked = false;

        // iterate for rows
        for (var row = 0; row < 10; row++) {
            data.push(new Array());

            // iterate for cells/columns inside rows
            for (var column = 0; column < 10; column++) {
                data[row].push({
                    x: xpos,
                    y: ypos,
                    width: width,
                    height: height,
                    checked: checked
                })
                // increment the x position. I.e. move it over by 50 (width variable)
                xpos += width;
            }
            // reset the x position after a row is complete
            xpos = 1;
            // increment the y position for the next row. Move it down 50 (height variable)
            ypos += height;
        }
        return data;
    }

    var gridData = gridData();
    console.log(gridData);

    var grid = d3.select("#grid")
        .append("svg")
        .attr("width", "510px")
        .attr("height", "510px");

    var row = grid.selectAll(".row")
        .data(gridData)
        .enter().append("g")
        .attr("class", "row");

    var column = row.selectAll(".square")
        .data(function (d) {
            return d;
        })
        .enter().append("rect")
        .attr("class", "square")
        .attr("x", function (d) {
            return d.x;
        })
        .attr("y", function (d) {
            return d.y;
        })
        .attr("width", function (d) {
            return d.width;
        })
        .attr("height", function (d) {
            return d.height;
        })
        .style("fill", "#fff")
        .style("stroke", "#222");

    var rand = Math.floor(Math.random() * 11) + 1;

    var selected = row.each(function (d, i) {
        i = i+1;
        if (i == rand) {
            d3.select(this).selectAll("rect:nth-of-type(" + i + ")").style('fill', "#2C93E8");
        }
    });
}());