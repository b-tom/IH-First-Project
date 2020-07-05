class Component{
    constructor(game, x, y, width, height){
        this.game = game;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    drawComponent(){
        const theCtx = this.game.ctx;
        theCtx.fillRect(this.x, this.y, this.width, this.height);
    }
}