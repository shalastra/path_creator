$(document).ready(function () {
    var shapeArchive = [];

    var colors = ['#BC445D', '#D6BD4E', '#D2EB8B', '#13CCCC', '#4B80E4'];

    function Shape(x, y, size) {
        this.x = x;
        this.y = y;
        this.size = size;
    }

    function getRandom(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }

    function getRandomColor() {
        return colors[getRandom(0, colors.size-1)];
    }

    function draw(shape) {
        svg.append('circle')
            .attr('class', 'click-circle')
            .attr('cx', shape.x)
            .attr('cy', shape.y)
            .attr('r', shape.size)
            .style('fill', getRandomColor());

        shapeArchive.push(shape);
    }

    var svg = d3.select('#app').append('svg')
        .attr('width', 980)
        .attr('height', 580);

    svg.on('click', function () {
        var coords = d3.mouse(this);

        console.log(coords);

        var shape = new Shape(coords[0], coords[1], getRandom(5, 50));

        draw(shape);
    });
});