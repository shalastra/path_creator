function CellGrid (rows, columns) {
    this.cells = new Array(rows);

    this.pattern = new Array();

    this.lastCell = null;

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
    console.log(this.cells);

    for (var i = -1; ++i < rows;) {
        for (var j = -1; ++j < columns;) {
            if(this.pattern[i][j] != this.cells[i][j].isCorrect) {
                return false;
            }
        }
    }

    return true;
};

CellGrid.prototype.getMarked = function () {
    var selected = [];

    this.eachCell(function (cell) {
        cell.marked && selected.push(cell);
    });

    return selected;
};

CellGrid.prototype.makeStep = function () {
    var orientation = [-1, 0, 1];

    if (this.isEmpty()) {
        var cell = this.selectRandomCell();
        cell.mark();

        if (this.pattern[cell.x][cell.y]) {
            cell.markAsCorrect();

            this.lastCell = cell;
            this.cells[cell.x][cell.y] = cell;
        } else {
            cell.unmark();
        }
    } else {
        var cell = this.cells[this.lastCell.x + orientation[getRandomInt(3)]][this.lastCell.y + orientation[getRandomInt(3)]];

        cell.mark();
        if (this.pattern[cell.x][cell.y]) {
            cell.markAsCorrect();

            this.lastCell = cell;

            this.cells[cell.x][cell.y] = cell;
        } else {
            cell.unmark();
        }
    }
};

//TODO: Fix checking pattern when all squares are drawn
//TODO: Split steps for marking and unmarking
//TODO: LastCell is the last correct, without jumping

CellGrid.prototype.isEmpty = function () {
    for (var i = -1; ++i < rows;) {
        for (var j = -1; ++j < columns;) {
            if (this.cells[i][j].isCorrect) {
                return false;
            }
        }
    }

    return true;
};

CellGrid.prototype.selectRandomCell = function () {
    return this.cells[getRandomInt(10)][getRandomInt(10)];
};

function getRandomInt (max) {
    return Math.floor(Math.random() * max);
}