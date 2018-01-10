function CellGrid (rows, columns) {
    this.cells = new Array(rows);

    this.pattern = new Array();

    var n = 0;

    for (var i = -1; ++i < rows;) {
        this.cells[i] = new Array(columns);

        for (var j = -1; ++j < columns;) {
            var cell = new Cell(false);
            cell.n = n++;
            cell.x = i;
            cell.y = j;
            this.cells[i][j] = cell;
        }
    }
}

CellGrid.prototype.eachCell = function (callback) {
    var rows = this.cells.length,
        columns = this.cells[0].length,
        x, y;
    for (var i = 0; i < rows * columns; i++) {
        x = i % rows;
        y = Math.floor(i / rows);
        callback.apply(this, [this.cells[x][y], x, y]);
    }
};

CellGrid.prototype.reset = function () {
    this.eachCell(function (cell, x, y) {
        cell.marked = false;
        cell.isCorrect = false;
    });
};

CellGrid.prototype.setPattern = function (pattern) {
    this.pattern = pattern;
};

CellGrid.prototype.isSolved = function () {
    var selected = this.getMarked();

    return selected.equals(this.pattern);
};

CellGrid.prototype.getMarked = function () {
    var selected = new Array(rows);

    for (var i = -1; ++i < rows;) {
        selected[i] = new Array(columns);
        for (var j = -1; ++j < columns;) {
            selected[i][j] = this.cells[i][j].isCorrect;
        }
    }

    return selected;
};

CellGrid.prototype.makeStep = function () {
    if(this.isEmpty()) {
        console.log("Grid is empty.");
        var cell = this.selectRandomCell();
        cell.mark();
    } else {
        console.log("Grid has at least one correct selection.");
    }
};

CellGrid.prototype.isEmpty = function () {
    for (var i = -1; ++i < rows;) {
        for (var j = -1; ++j < columns;) {
            if(this.cells[i][j].isCorrect) {
                return false;
            }
        }
    }

    return true;
};

CellGrid.prototype.selectRandomCell = function () {
    return this.cells[getRandomInt()][getRandomInt()];
};

function getRandomInt(min, max) {
    return Math.floor(Math.random() * 10);
}

// Warn if overriding existing method
if (Array.prototype.equals)
    console.warn("Overriding existing Array.prototype.equals. Possible causes: New API defines the method, there's a framework conflict or you've got double inclusions in your code.");
// attach the .equals method to Array's prototype to call it on any array
Array.prototype.equals = function (array) {
    // if the other array is a falsy value, return
    if (!array)
        return false;

    // compare lengths - can save a lot of time
    if (this.length != array.length)
        return false;

    for (var i = 0, l = this.length; i < l; i++) {
        // Check if we have nested arrays
        if (this[i] instanceof Array && array[i] instanceof Array) {
            // recurse into the nested arrays
            if (!this[i].equals(array[i]))
                return false;
        }
        else if (this[i] != array[i]) {
            // Warning - two different object instances will never be equal: {x:20} != {x:20}
            return false;
        }
    }
    return true;
}
// Hide method from for-in loops
Object.defineProperty(Array.prototype, "equals", {enumerable: false});