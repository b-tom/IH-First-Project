class Pill{
    constructor(game, x, y, image, velY){
        this.game = game;
        this.x = x;
        this.y = y;
        this.image = image;
        this.velY = velY;
        this.height = 15;
        this.width = 15;
    }

    drawPill(){
        const ctx = this.game.ctx;
        ctx.drawImage(this.image, this.x, this.y, this.height, this.width)
    }

}