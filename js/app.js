// Array of all enemies
var allEnemies = [];
// Enemies our player must avoid
var Enemy = function(yLoc,i) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.speed = Math.floor(Math.random()*i); 
     this.x = 0;
      this.y = yLoc;
};
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x > 5) {
        this.x = 0;
    }else{
        this.x += this.speed * dt;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x * 101, this.y * 48);
};

// Now write your own player class
var Player = function(){
    console.log("player function");
    this.sprite= 'images/char-princess-girl.png';
    this.x = 2;
    this.y = 0;
};
//player update function to check collision
Player.prototype.update = function(dt){
    console.log(this.x+":"+this.y);
    this.checkCollisions(this.x, this.y);
};
// Draw player screen
Player.prototype.render = function(){
      ctx.drawImage(Resources.get(this.sprite),this.x * 101, -(this.y * 80) + 400);
};
//reset player and if collided or won
Player.prototype.reset = function(){
    console.log("inside player reset");
    this.x = 2;
    this.y = 0;
};
// collison algorith
Player.prototype.checkCollisions = function(positionX,positionY){
    switch(positionY){
        case 2:
            if(positionX == Math.floor(allEnemies[2].x) && (Math.floor(positionY + 3) == Math.floor(allEnemies[2].y))){
                window.alert("You didnt win the game. Try again!"+allEnemies[2].x+"->"+this.y);
                this.reset()
            }
        break;
        case 3:
           if(positionX == Math.floor(allEnemies[1].x) && positionY == Math.floor(allEnemies[1].y)){
                window.alert("You didnt win the game. Try again!"+allEnemies[1].x+"->"+this.y);
                this.reset()
            }
        break;
        case 4:
            console.log(allEnemies[0].x+":"+allEnemies[0].y+":"+positionY);
            if(positionX == Math.floor(allEnemies[0].x) && (Math.floor(positionY - 3) == Math.floor(allEnemies[0].y))){
                window.alert("You didnt win the game. Try again!"+allEnemies[0].x+"->"+this.y);
                this.reset()
            }
        break;
        default:
            console.log("write a better algorithm, you can do you, you are genius")
    }
};
//handling arrow inputs for player
Player.prototype.handleInput = function(allowedKeys){
    switch(allowedKeys){
        case 'left':
        console.log("left");
            if(this.x > 0){
                this.x--;
            }
        break;
        case 'right':
        console.log("right");
            if (this.x < 4) {
                this.x++;
            }
        break;
        case 'up':
        console.log("up");
            if (this.y < 5) {
                this.y++
            }
        break;
        case 'down':
        console.log("down");
            if (this.y > 0) {
                this.y--;
            }
        break;
        default:
         console.log("default");
        alert("Use arrow keys to move arround the board");
    }
    if (this.y >= 5 ) {
        console.log("Won");
        window.alert("Congragulations you won!!");
        this.reset();
    }
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var enemy = function(){
    // array of enemies for particular position
    var yArray = [1,3,5];
    // speed of enemies
    var speedArray = [2,4,2.5];
    for (var i = 0; i < 3; i++) {
        enemy = new Enemy(yArray[i],speedArray[i]);
        console.log("new enemy"+yArray[i]+"----"+speedArray[i]);
        allEnemies.push(enemy);
        
     } 
};
//enemy
enemy();
console.log("allEnemies array"+allEnemies.length);
// Place the player object in a variable called player
var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
