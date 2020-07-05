class Game {
    constructor(){
        this.canvas = undefined;
        this.ctx = undefined;
        this.spaceship = new Player(this, 400, 480, 50, 10);
        this.ball = new Ball(this, 425, 475, 5, 0, Math.PI *2, 2, -2);
        this.block = new Block (this,0, 0, 47, 10);
        this.score = 0;
    }

    init(){
        this.canvas = document.querySelector('#canvas')
        this.ctx = this.canvas.getContext('2d');
        this.drawBackground();
        this.drawMainCharacter();
        this.spaceship.move();

        const draw = () => {
            this.clear();
            this.drawBackground();
            this.drawMainCharacter();
            this.createBall();
            this.createBlocks();

            //ball movement
            this.ball.x += this.ball.velX; 
            this.ball.y += this.ball.velY;
            //right bounce
            if(this.ball.x + this.ball.radius >= this.canvas.width){
                this.ball.velX = -this.ball.velX;
            }
            //left bounce
            if(this.ball.x - this.ball.radius <= 0){
                this.ball.velX = -this.ball.velX;
            }
            //top bounce
            if(this.ball.y - this.ball.radius <=0){
                this.ball.velY = -this.ball.velY;
            }
            //player bounce
            if(this.ball.y + this.ball.radius > this.spaceship.y + 3){ //if ball goes beyond the spaceship, it continues going
                this.ball.velY = this.ball.velY;
            }else if(this.ball.y + this.ball.radius >= this.spaceship.y && 
                this.ball.x >= this.spaceship.x + this.spaceship.width * 0.25 && //if ball hits on the center if the spaceship, continues at the same direction and speed
                this.ball.x <= (this.spaceship.x + this.spaceship.width) - (this.spaceship.width * 0.25)){
                   this.ball.velY = -this.ball.velY; 
            }else if(this.ball.y + this.ball.radius >= this.spaceship.y && //if the ball hits on the left 25% of the spaceship, the ball will go to the left at a higher speed
                this.ball.x >= this.spaceship.x &&
                this.ball.x <= this.spaceship.x + this.spaceship.width * 0.25){
                    this.ball.velY = -this.ball.velY;
                    this.ball.velX = -4;
            }else if(this.ball.y + this.ball.radius >= this.spaceship.y && //same as previous comment but to the right
                this.ball.x >= this.spaceship.x + this.spaceship.width * 0.75 &&
                this.ball.x <= this.spaceship.x + this.spaceship.width){
                    this.ball.velY = -this.ball.velY;
                    this.ball.velX = 4;
            }

            //brick collission

            window.requestAnimationFrame(draw);
        };
        draw();
    }

    drawBackground(){
        this.ctx.fillStyle = 'yellow';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = 'blue';
        this.ctx.font = '15px monospace';
        this.ctx.fillText(`Score: ${this.score}`, 700, 25);
    }

    clear(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }

    drawMainCharacter(){
        this.spaceship.drawPlayer();
    }

    createBall(){
        this.ball.drawBall();
    }

    createBlocks(){
        const wallOfBlocks = [this.block.drawBlock(3, 40), this.block.drawBlock(53, 40), this.block.drawBlock(103, 40), this.block.drawBlock(153, 40), this.block.drawBlock(203, 40), this.block.drawBlock(253, 40), this.block.drawBlock(303, 40), this.block.drawBlock(353, 40), this.block.drawBlock(403, 40), this.block.drawBlock(453, 40), this.block.drawBlock(503, 40), this.block.drawBlock(553, 40), this.block.drawBlock(603, 40), this.block.drawBlock(653, 40), this.block.drawBlock(703, 40), this.block.drawBlock(753, 40)];
        
        console.log(typeof wallOfBlocks);
    }
}

