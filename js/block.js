class Block{
    constructor(game, row, column, width, height, offSetLeft, offSetTop, marginTop, fillColor, strokeColor, status){
        this.game = game;
        this.row = row;
        this.column = column;
        this.width = width;
        this.height = height;
        this.offSetLeft= offSetLeft;
        this.offSetTop = offSetTop;
        this.marginTop = marginTop;
        this.fillColor = fillColor;
        this.strokeColor = strokeColor;
        this.status = status;
    }

    drawBlock(){
        const theCtx = this.game.ctx;
        theCtx.fillStyle = 'yellow';
        theCtx.fillRect(this.x, this.y, this.width, this.height);
    }

}