class Player {
    constructor(game, x, y, width, height){
        this.game = game;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    drawPlayer(){
        const theCtx = this.game.ctx;
        theCtx.fillRect(this.x, this.y, this.width, this.height);
    }

    move(){
        document.addEventListener('keydown', event => {
            switch(event.keyCode){
             case 37:
                this.x > 0 ? this.x -= 20: '';
                break;
            case 39:
                this.x + this.width <= game.canvas.width ? this.x += 20: '';
                break;
            default:
                console.log('error');
            }
        });
    }
}
