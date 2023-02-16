module.exports = class Game {
    constructor() {
        this.FIELDSIZE = 3;
        this.Symbol = {
            X: 'images/x.png',
            O: 'images/o.png',
            FREE: 'images/free.png', 
        };
        this.currentSymbol = this.Symbol.X;
        this.field = [[], [], []];

        this.reset();
        this.winningState = null;
    }

    freeze = () => this.winningState !== null;

    reset() {
        this.winningState = null;
        for (let row = 0; row < this.FIELDSIZE; row++) {
            for (let col = 0; col < this.FIELDSIZE; col++) {
                this.field[row][col] = this.Symbol.FREE;
            }
        }
    }

    switchCurrentSymbol() {
        this.currentSymbol = (this.currentSymbol == this.Symbol.X ? this.Symbol.O : this.Symbol.X)
    }

    range(num) {
        return Array.from({ length: num }, (value, index) => index);
    }

    setCell(row, col) {
        if (!this.freeze()) {
            this.field[row][col] = this.currentSymbol;
            if (this.draw()) {
                this.winningState = this.Symbol.FREE;
            } else if (this.won()) {
                this.winningState = this.currentSymbol;
            }
            this.switchCurrentSymbol();
        }
    }

    won() {
        // horizontal
        return this.field.some(row => row.every(cell => cell === this.currentSymbol)) ||
        // vertical
        this.range(this.FIELDSIZE).some(i => this.field.every(row => row[i] === this.currentSymbol)) ||
        // diagonal upper left to lower right
        this.range(this.FIELDSIZE).every(i => this.field[i][i] === this.currentSymbol) ||
        // diagonal other
        this.field[0][2] === this.currentSymbol && this.field[1][1] === this.currentSymbol && this.field[2][0] === this.currentSymbol;
    }

    draw() {
        return !this.field.some(row => row.some(cell => cell === this.Symbol.FREE));
    }
}
