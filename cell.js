function Cell (initialState) {
    this.marked = initialState;
    this.isCorrect = initialState;
}

Cell.prototype.markAsCorrect = function () {
    this.isCorrect = true;
};

Cell.prototype.mark = function () {
    this.marked = true;
};

Cell.prototype.unmark = function () {
    this.marked = false;
};