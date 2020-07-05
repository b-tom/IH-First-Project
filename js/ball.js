class Ball{
    constructor(game, x, y, radius, startAngle, endAngle, velX, velY){
        this.game = game;
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.startAngle = startAngle;
        this.endAngle = endAngle;
        this.velX = velX; //declared for ball movement
        this.velY = velY;
    }

    drawBall(){
        const ctx = this.game.ctx
        ctx.beginPath();
        // ctx.strokeStyle = 'black';
        ctx.fillStyle = 'black';
        ctx.arc(this.x, this.y, this.radius, this.startAngle, this.endAngle);
        ctx.stroke();
        ctx.closePath()
    }
}