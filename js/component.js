class Block{
    constructor(game, x, y, width, height){
        this.game = game;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    drawBlock(x, y){
        const theCtx = this.game.ctx;
        theCtx.strokeSyle = 'white';
        theCtx.fillRect(x, y, this.width, this.height);
    }
}