class Ball{
    constructor(game, x, y, radius, speed, velX, velY, color){
        this.game = game;
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.speed = 3;
        this.velX = velX; //declared for ball movement
        this.velY = velY;
        this.startAngle = 0;
        this.endAngle = Math.PI*2;
        this.color = color
    }

    drawBall(){
        const myCtx = this.game.ctx
        myCtx.beginPath();
        myCtx.arc(this.x, this.y, this.radius, this.startAngle, this.endAngle);
        myCtx.fillStyle = this.color;
        myCtx.fill();
        myCtx.closePath();
    }
}