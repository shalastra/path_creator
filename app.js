$(document).ready(function () {
    var shapeArchive = [];

    var colors = ['#BC445D', '#D6BD4E', '#D2EB8B', '#13CCCC', '#4B80E4'];

    function Shape(x, y, size, color) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
    }

    function getRandom(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }

    function getRandomColor() {
        return colors[Math.floor(Math.random() * colors.length)];
    }

    function draw(shape) {
        svg.append('circle')
            .attr('class', 'click-circle')
            .attr('cx', shape.x)
            .attr('cy', shape.y)
            .attr('r', shape.size)
            .style('fill', shape.color);

        shapeArchive.push(shape);
    }

    var svg = d3.select('#app').append('svg')
        .attr('width', 980)
        .attr('height', 580);

    svg.on('click', function () {
        var coords = d3.mouse(this);

        console.log(coords);

        if(shapeArchive.length === 0) {
            var shape = new Shape(coords[0], coords[1], getRandom(5, 50), getRandomColor());

            draw(shape);
        } else {
            var prevShape = shapeArchive.slice(-1).pop();

            var range = getRandom(5, 50);

            var coordX = coords[0];
            var coordY = coords[1];

            var angle = Math.atan2(coordY - prevShape.y, coordX - prevShape.x);

            var newCoordX = prevShape.x + ((prevShape.size + range) * Math.sin(0));
            var newCoordY = prevShape.y - ((prevShape.size + range) * Math.cos(0));

            var shape = new Shape(newCoordX, newCoordY, range, getRandomColor());

            draw(shape);
        }
    });
});