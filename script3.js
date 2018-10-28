const canv = document.getElementById('canvas');
const context = canv.getContext('2d');
canv.width = 1100;
canv.height = 700;

let game_over = false;

const rand = function(num) {
	return Math.floor(Math.random() * num) + 1;
};

const background = new Image();
background.src = "thumb-1920-107763.jpg";

const goodGuyImg = new Image();
goodGuyImg.src = '11.png';

const badGuyImg = new Image();
badGuyImg.src = '00.png';


const create_Enemy = function(count, canvasWidth, canvasHeight) {
	const arr = [];
	for(let i = 0; i < count; i++){
		arr[arr.length] = {
			x: rand(canvasWidth - 120),
			y: rand(canvasHeight - 120),
			width: 90,
			height: 140,
			xDelta: rand(4),
			yDelta: rand(4),
			image: badGuyImg,
			draw: function() {
				
				context.drawImage(this.image ,this.x , this.y, this.width, this.height)},
				update: function() {

					if(this.x < 0 || this.x > canvasWidth - this.width){
						this.xDelta *= -1; 

					}

					if(this.y < 0 || this.y > canvasHeight - this.height){
						this.yDelta *= -1; 

					}

					this.x += this.xDelta;
					this.y += this.yDelta;
				}
			}
		}
		return arr;
	};


	const enemy = create_Enemy(7, canv.width, canv.height);

	const gameData = {

		hero: {
			x: 0,
			y: 0,
			xDelta: 0,
			yDelta: 0,
			width: 80,
			height: 120,
			image: goodGuyImg,
			draw: function(){
				context.drawImage(this.image, this.x, this.y, this.width, this.height );
			},
			update: function(){ 

					for(let i = 0; i < gameData.badGuys.length; i++){
					let bad$guy = gameData.badGuys[i];

					
					if(this.x < 0){
						this.x = 0;

					}

					if(this.x > canv.width - this.width){
						this.x = canv.width - this.width ;
}

					if(this.y < 0){
						this.y = 0;

					}

					if(this.y > canv.height - this.height){
						this.y = canv.height - this.height;

					}

				

					if(Math.abs(this.x + this.width/2 -(bad$guy.x + bad$guy.width/2)) <= this.width/2 + bad$guy.width/2 && 
						(Math.abs(this.y + this.height/2 -(bad$guy.y + bad$guy.height/2)) <= this.height/2 + bad$guy.height/2)){			  

						alert("Game Over");

						game_over = true;

				}
			}

			this.x += this.xDelta;
			this.y += this.yDelta;

		}
	},

	badGuys: enemy

};



const leftKey = 37;
const upKey = 38;
const rightKey = 39;
const downKey = 40;


document.addEventListener('keydown', function(event) {
	if(event.keyCode === rightKey) {
		gameData.hero.xDelta = 4;
	}
	if(event.keyCode === leftKey) {
		gameData.hero.xDelta = -4;
	}
	if(event.keyCode === upKey) {
		gameData.hero.yDelta = -4;
	}
	if(event.keyCode === downKey) {
		gameData.hero.yDelta = 4;
	}

}, false);


document.addEventListener('keyup', function(event) {
	if(event.keyCode === rightKey) {
		gameData.hero.xDelta = 0;
	}
	if(event.keyCode === leftKey) {
		gameData.hero.xDelta = 0;
	}
	if(event.keyCode === upKey) {
		gameData.hero.yDelta = 0;
	}
	if(event.keyCode === downKey) {
		gameData.hero.yDelta = 0;
	}

}, false);




const draw_char = function(){

	context.drawImage(background, 0 , 0 , canv.width, canv.height);

	gameData.hero.draw();

	for(let i = 0; i < gameData.badGuys.length; i++){
		gameData.badGuys[i].draw();
	}
	
};


const update_char = function(){

	gameData.hero.update();

	for(let i = 0; i < gameData.badGuys.length; i++){
		gameData.badGuys[i].update();
	}

};

const loop = function(){

	draw_char();
	update_char();

	if(!game_over){
		requestAnimationFrame(loop);

	}
};

loop();


