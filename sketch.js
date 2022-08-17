var PLAY = 1;
var END = 0;
var gameState = PLAY;
var fantasma
var fantasmamoviendose, fantasmamuerto;
var invisibleGround
var fondo


var obstaclesGroup, obstaculo , obstaculo2

var score;
var gameOverImg,restartImg
var jumpSound , checkPointSound, dieSound

function preload(){
  fantasmamoviendose = loadAnimation("SeñorFantasma1.png");
  fantasmamuerto = loadAnimation("SeñorFantasmaF.png");
  fondo = loadAnimation ("Fondo.webp");

  
  
  
  obstaculo = loadImage("Obstaculo1.png");
  obstaculo2 = loadImage("Obstaculo2.png")
  
  botonrestart = loadImage("Restart.png")
  gameover = loadImage("Gameover.png")
  
  
}

function setup() {
  createCanvas(800, 800);

 
  fantasma = createSprite(50,160,20,50);
  fantasma.addAnimation("running", fantasmamoviendose);
  fantasma.addAnimation("collided", fantasmamuerto);
  

  fantasma.scale = 0.5;
  fondo = createSprite (400,400,800,800);
  ground = createSprite(780,180,400,20);
  
  ground.x = ground.width /2;
  
  gameOver = createSprite(300,100);
  gameOver.addImage(gameover);
  
  restart = createSprite(300,140);
  restart.addImage(botonrestart);
  
 
  gameOver.scale = 0.5;
  restart.scale = 0.5;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  
  obstaclesGroup = createGroup();
  

  
  fantasma.setCollider("rectangle",0,0,fantasma.width,fantasma.height);

  
  score = 0;
  
}

function draw() {
  
  background(255);
  
  text("Puntuación: "+ score, 500,50);
  
  if(mousePressedOver(restart)){
reinicio();
  }
  if(gameState === PLAY){

    gameOver.visible = false;
    restart.visible = false;
    
    ground.velocityX = -(4 + 3* score/100)
    
    score = score + Math.round(getFrameRate()/60);
    
    if(score>0 && score%100 === 0){
       checkPointSound.play() 
    }
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
   
    if(keyDown("space")&& fantasma.y >= 100) {
        fantasma.velocityY = -12;
        jumpSound.play();
    }
    
    
    fantasma.velocityY = fantasma.velocityY + 0.8
  
    
  
   
    spawnObstacles();
    
    if(obstaclesGroup.isTouching(fantasma)){
        
        jumpSound.play();
        gameState = END;
        dieSound.play()
      
    }
  }
   else if (gameState === END) {
      gameOver.visible = true;
      restart.visible = true;
     
     
      fantasma.changeAnimation("collided", fantasmamuerto);
    
     
     
      ground.velocityX = 0;
      fantasma.velocityY = 0
      
     
      
    obstaclesGroup.setLifetimeEach(-1);
    
     
     obstaclesGroup.setVelocityXEach(0);
    
   }
  
 
  
  fantasma.collide(invisibleGround);
  
  if(mousePressedOver(restart)) {
      reset();
    }


  drawSprites();
}
function reinicio(){
  fantasma.changeAnimation("running");
  gameState=PLAY;
  restart.visible=false;
  obstaclesGroup.destroyEach();
  
  score=0;

}
function reset(){
  

}


function spawnObstacles(){
 if (frameCount % 60 === 0){
   var obstacle = createSprite(600,165,10,40);
   obstacle.velocityX = -(6 + score/100);
   
    //generar obstáculos al azar
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstaculo);
              break;
      case 2: obstacle.addImage(obstaculo2);
              break;
    
      default: break;
    }
   
   
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
   
   
    obstaclesGroup.add(obstacle);
 }
}




