class Game {
    constructor(){
        this.canvas = undefined;
        this.ctx = undefined;
        this.spaceship = new Player(this, 400, 480, 50, 10);
        this.ball = new Ball(this, 425, 475, 5, 5, 2, -2);
        this.block = new Block (this,0, 0, 47, 10);
        this.score = 0;
        this.level = 1;
        this.wallOfBlocks = [];
        this.lives = 3;
    }

    init(){
        this.canvas = document.querySelector('#canvas')
        this.ctx = this.canvas.getContext('2d');
        this.drawBackground();
        this.drawMainCharacter();
        this.spaceship.move();
        this.createBlocks();
        console.log(this.wallOfBlocks)

        const draw = () => {
            this.clear();
            this.drawBackground();
            this.drawMainCharacter();
            this.createBall();    
            for(let i=0; i<this.wallOfBlocks.length; i++){
                this.wallOfBlocks[i].drawBlock();
                if(this.ball.y <= this.wallOfBlocks[i].y + this.wallOfBlocks[i].height && 
                    this.ball.y > this.wallOfBlocks[i].y + this.wallOfBlocks[i].height - 1 && 
                    this.ball.x >= this.wallOfBlocks[i].x && 
                    this.ball.x <= this.wallOfBlocks[i].x + this.wallOfBlocks[i].width){
                    this.ball.velY = -this.ball.velY;
                    this.score++;
                    console.log(this.wallOfBlocks[i]);
                    this.wallOfBlocks.splice(i,1);
                }
                if(this.ball.y + this.ball.height >= this.wallOfBlocks[i].y && 
                    this.ball.y + this.ball.height < this.wallOfBlocks[i].y + 1 && 
                    this.ball.x >= this.wallOfBlocks[i].x && 
                    this.ball.x <= this.wallOfBlocks[i].x + this.wallOfBlocks[i].width){
                    this.ball.velY = -this.ball.velY;
                    this.score++;
                    console.log(this.wallOfBlocks[i]);
                    this.wallOfBlocks.splice(i,1)
                }
                if(this.ball.x + this.ball.width >= this.wallOfBlocks[i].x &&
                    this.ball.x + this.ball)
            }

            
            //ball movement
            this.ball.x += this.ball.velX; 
            this.ball.y += this.ball.velY;

            //right bounce
            if(this.ball.x + this.ball.width >= this.canvas.width){
                this.ball.velX = -this.ball.velX;
            }
            //left bounce
            if(this.ball.x <= 0){
                this.ball.velX = -this.ball.velX;
            }
            //top bounce
            if(this.ball.y <=0){
                this.ball.velY = -this.ball.velY;
            }
            //player bounce
            if(this.ball.y + this.ball.height > this.spaceship.y + 3){ //if ball goes beyond the spaceship, it continues going
                this.ball.velY = this.ball.velY;
                this.lives --;
            }else if(this.ball.y + this.ball.height >= this.spaceship.y && 
                this.ball.x >= this.spaceship.x + this.spaceship.width * 0.25 && //if ball hits on the center if the spaceship, continues at the same direction and speed
                this.ball.x <= (this.spaceship.x + this.spaceship.width) - (this.spaceship.width * 0.25)){
                   this.ball.velY = -this.ball.velY; 
            }else if(this.ball.y + this.ball.height >= this.spaceship.y && //if the ball hits on the left 25% of the spaceship, the ball will go to the left at a higher speed
                this.ball.x >= this.spaceship.x &&
                this.ball.x <= this.spaceship.x + this.spaceship.width * 0.25){
                    this.ball.velY = -this.ball.velY;
                    this.ball.velX = -5;
            }else if(this.ball.y + this.ball.height >= this.spaceship.y && //same as previous comment but to the right
                this.ball.x >= this.spaceship.x + this.spaceship.width * 0.75 &&
                this.ball.x <= this.spaceship.x + this.spaceship.width){
                    this.ball.velY = -this.ball.velY;
                    this.ball.velX = 5;
            }

            window.requestAnimationFrame(draw);
        };
        draw();
    }
        

    drawBackground(){
        const space = new Image();
        space.src = './images/space.gif';
        this.ctx.drawImage(space,0 ,0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = 'white';
        this.ctx.font = '15px monospace';
        this.ctx.fillText(`Score: ${this.score}`, 700, 25);
        this.ctx.fillText(`Level: ${this.level}`, 25, 25);
        this.ctx.fillText(`Lives:`, (this.canvas.width/2)-50, 25);
        const lives = new Image()
        lives.src = './images/heart.png';
        let coordinateX = 410;
        for(let i=0; i < this.lives ; i++ ){
            this.ctx.drawImage(lives, coordinateX, 13, 15, 15);
            coordinateX +=20;
        }
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
        switch(this.level){
            case 1:
                let array = [];    
                for (let i=2 ; i<800; i+=50){
                    for (let j=40 ; j<200; j+=20){
                        let obstacle = new Block(this,i, j, 47, 15);
                        array.push(obstacle);
                    }
                }
                this.wallOfBlocks = array;
                break;
            case 2:
                    this.wallOfBlocks.push(this.block.drawBlock(this.canvas.width/2,40))
                    this.wallOfBlocks.push(this.block.drawBlock(this.canvas.width/2 + 20,55))
                    this.wallOfBlocks.push(this.block.drawBlock(this.canvas.width/2 - 20,55))
                break
            default:
                console.log('hi');        
        } 
    }
}

