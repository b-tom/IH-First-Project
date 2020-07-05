class Player extends Component{
    constructor(game, x, y, width, height){
        super(game, x, y, width, height);
    }

    move(){
        document.addEventListener('keydown', event => {
            switch(event.keyCode){
             case 37:
                this.x > 0 ? this.x -= 15: '';
                break;
            case 39:
                this.x + this.width <= game.canvas.width ? this.x += 15: '';
                break;
            default:
                console.log('error');
            }
        });
    }
}
