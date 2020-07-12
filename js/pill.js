class Pill{
    constructor(game, x, y, image, velY){
        this.game = game;
        this.x = x;
        this.y = y;
        this.image = image;
        this.velY = velY;
    }

    drawPill(x, y){
        const ctx = this.game.ctx;
        ctx.drawImage(this.image, x, y, 15, 15)
    }

}