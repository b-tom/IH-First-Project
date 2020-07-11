//audio management
const soundElement = document.getElementById('sound');

soundElement.addEventListener('click', audioManager);

function audioManager(){
    let imgSrc = soundElement.getAttribute('src');
    let sound_IMG = imgSrc == 'images/sound-on.png' ?  'images/sound-off.png': 'images/sound-on.png';
    soundElement.setAttribute('src', sound_IMG);

    game_over_sound.muted = game_over_sound.muted ? false: true;
    get_coin_sound.muted = get_coin_sound.muted ? false: true;
    hit_brick_sound.muted = hit_brick_sound.muted ? false: true;
    hit_spaceship_sound.muted = hit_spaceship_sound.muted ? false: true;
    life_lost_sound.muted = life_lost_sound.muted ? false: true;
}

//show game over message
const gameOver = document.getElementById('gameOver');
const youLost = document.getElementById('youLost');
const restart = document.getElementById('gameOver');

restart.addEventListener('click', function(){
    location.reload();
})

function showYouLost(){
    gameOver.style.display = 'block';
    youLost.style.display = 'block';
}
