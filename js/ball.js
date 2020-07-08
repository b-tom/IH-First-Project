class Ball{
    constructor(game, x, y, width, height, velX, velY){
        this.game = game;
        this.x = x;
        this.y = y;
        this.height = height;
        this.width = width;
        this.velX = velX; //declared for ball movement
        this.velY = velY;
        this.img = new Image();
    }

    drawBall(){
        const ctx = this.game.ctx
        this.img.src = './images/ball.png';
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
}