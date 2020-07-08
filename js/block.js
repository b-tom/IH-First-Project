class Block{
    constructor(game, x, y, width, height){
        this.game = game;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    drawBlock(){
        const theCtx = this.game.ctx;
        theCtx.fillStyle = 'yellow';
        theCtx.fillRect(this.x, this.y, this.width, this.height);
    }

}