class Game {
    constructor(){
        this.canvas = undefined;
        this.ctx = undefined;
        this.spaceship = new Player(this, 400, 460, 80, 15);
        this.ball = new Ball(this, 400, 475, 5, 4, 4, -4, 'white');
        this.block = new Block (this, 2 , 11, 57, 15, 15, 10, 40, 'grey', 'white', true);
        this.score = 0;
        this.scoreUnit = 10;
        this.level = 1;
        this.wallOfBlocks = [];
        this.life = 3;
        this.gameOver = false;
        this.pill = new Pill(this, 0, 0, lives, 2);
    }

    init(){
        this.canvas = document.querySelector('#canvas')
        this.ctx = this.canvas.getContext('2d');
        this.createBlocks();
        this.spaceship.move();
        
        const draw = () => {
            this.clear();
            this.drawBackground();
            this.drawMainCharacter();
            this.createBall();    
            this.moveBall();
            this.bounce();
            this.drawBlocks();
            this.pillDrop();
            this.ballBrickCollision();
            this.changeLevel();
            this.gameOverFunction();

            if(!this.gameOver){
                window.requestAnimationFrame(draw);
            }
        };
        draw();
    }
        
    drawBackground(){
        this.ctx.drawImage(space,0 ,0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = 'white';
        this.ctx.font = '15px monospace';
        this.ctx.fillText(`Score: ${this.score}`, 700, 25);
        this.ctx.fillText(`Level: ${this.level}`, 25, 25);
        this.ctx.fillText(`Lives:`, (this.canvas.width/2)-50, 25);
        let coordinateX = 410;
        for(let i=0; i < this.life ; i++ ){
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

    moveBall(){
        this.ball.x += this.ball.velX; 
        this.ball.y += this.ball.velY;
    }

    resetball(){
        this.ball.x = 400;
        this.ball.y = 475;
        this.ball.velX = 3 * (Math.random()* 2-1);
        this.ball.velY = -3;
    }

    bounce(){
        //walls bounce
        if(this.ball.x + this.ball.velX >= this.canvas.width -this.ball.radius || this.ball.x + this.ball.velX <= this.ball.radius){
            hit_wall_sound.play();
            this.ball.velX = -this.ball.velX;
        }
        //top bounce
        if(this.ball.y + this.ball.velY <= this.ball.radius){
            hit_wall_sound.play();
            this.ball.velY = -this.ball.velY;
        }
        if(this.ball.y + this.ball.radius > this.canvas.height){
            this.life --;
            life_lost_sound.play();
            this.resetball();
        }
        // player bounce
        if(this.ball.y + this.ball.radius > this.spaceship.y && this.ball.y + this.ball.radius < this.spaceship.y + this.spaceship.height && this.ball.x > this.spaceship.x && this.ball.x < this.spaceship.x + this.spaceship.width){
            let collidePoint = this.ball.x - (this.spaceship.x + this.spaceship.width/2);
            collidePoint = collidePoint / (this.spaceship.width/2);
            let angle = collidePoint * (Math.PI/3);
            this.ball.velX = this.ball.speed * Math.sin(angle);
            this.ball.velY = - this.ball.speed * Math.cos(angle);   
            hit_spaceship_sound.play();
        }
    }

    createBlocks(){
        for(let r=0 ; r<this.block.row ; r++){
            this.wallOfBlocks[r]= [];
            for(let c=0 ; c< this.block.column ; c++){
                this.wallOfBlocks[r][c] = {
                    x: c * (this.block.offSetLeft + this.block.width) + this.block.offSetLeft ,
                    y: r * (this.block.offSetTop + this.block.height ) + this.block.offSetTop + this.block.marginTop,
                    status: true,
                }
            }
        }
    }

    drawBlocks(){
        for(let r=0 ; r<this.block.row ; r++){
            for(let c=0 ; c< this.block.column ; c++){
            let b = this.wallOfBlocks[r][c]
            if(b.status){
                this.ctx.fillStyle = this.block.fillColor;
                this.ctx.fillRect(b.x, b.y, this.block.width, this.block.height);
                this.ctx.strokeStyle = this.block.strokeColor;
                this.ctx.strokeRect(b.x, b.y, this.block.width, this.block.height);
            }
           }
        }
    }

    ballBrickCollision(){
        for(let r=0 ; r<this.block.row ; r++){
            for(let c=0 ; c< this.block.column ; c++){
                let b = this.wallOfBlocks[r][c]
                if(b.status){
                    if(this.ball.x + this.ball.radius > b.x && this.ball.x - this.ball.radius < b.x + this.block.width &&
                        this.ball.y + this.ball.radius > b.y &&
                        this.ball.y - this.ball.radius < b.y + this.block.height){
                            this.ball.velY = -this.ball.velY;
                            b.status = false;
                            this.score += this.scoreUnit;
                            hit_brick_sound.play();
                    }
                }
            }
        }
    }

    gameOverFunction(){
        if(this.life < 0){
            this.gameOver = true;
            game_over_sound.play();
            showYouLost();
        }
    }
    
    changeLevel(){
        let levelCompleted = true;

        for(let r=0 ; r<this.block.row ; r++){
            for(let c=0 ; c< this.block.column ; c++){
                levelCompleted = levelCompleted && !this.wallOfBlocks[r][c].status;
            }
        }
        if(levelCompleted){
            this.level ++
            this.block.row = Math.floor(Math.random() * 8);
            this.createBlocks()
            this.ball.speed += 0.5;
            this.resetball();
        }
    }

    

    pillDrop(){
        for(let r=0 ; r<this.block.row ; r++){
            for(let c=0 ; c< this.block.column ; c++){
                let b = this.wallOfBlocks[r][c]
                if(b.status){
                    if(this.ball.x + this.ball.radius > b.x && this.ball.x - this.ball.radius < b.x + this.block.width &&
                        this.ball.y + this.ball.radius > b.y &&
                        this.ball.y - this.ball.radius < b.y + this.block.height){
                            // if(Math.floor(Math.random()*10) % 3 === 0){
                                this.pill.drawPill(this.ball.x, this.ball.y);
                                this.pill.y += this.pill.velY;
                                console.log('pill')
                            // }
                    }
                }
            }
        }
    }
}
