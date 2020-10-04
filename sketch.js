var fruit
var monkey , monkey_running,monkey_collided
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score = 0;

var PLAY = 1;
var END = 0;
var gameState = PLAY;




function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  //monkey_collided = loadAnimation("monkey_collided.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
    createCanvas(400,400);
monkey = createSprite(50,160,20,50);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.1;
  
  obstacleGroup = new Group ();
    bananaGroup = new Group ();

  
  ground = createSprite(400,350,900,20);
  ground.x=ground.width/2;
  console.log(ground.x)
  
}


function draw() {
 background("white")

  if (gameState === PLAY) {
  
   if(keyDown("space")&& monkey.y >=250) {
       monkey.velocityY = -12;
    }
       monkey.velocityY = monkey.velocityY + 1.0
 spawnfruits();
     spawnobstacle();
    if(obstacleGroup.isTouching(monkey)){
      gameState=END
}
      if (ground.x < 0){
      ground.x = ground.width/2;
    }
      ground.velocityX=-4;

    if (monkey.isTouching(bananaGroup)){
    bananaGroup.destroyEach();
    score=score+1;
   } 
    if(monkey.isTouching(obstacleGroup)){
     ground.VelocityX=0
     monkey.VelocityY=-0
  }
  }
   else if (gameState === END) {
     obstacleGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
     
     obstacleGroup.setVelocityXEach(0);
     bananaGroup.setVelocityXEach(0); 
  
    
  }
 
 monkey.collide(ground)
  drawSprites ();
  text(" score : " + score,340,50 )
  
}





function spawnobstacle() {
 //write code here to spawn the fruit
   if (frameCount % 120 === 0) {
     obstacle = createSprite(600,330,40,10);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.1;
    obstacle.velocityX = -3;
      
     //assign lifetime to the variable
    obstacleGroup.lifetime = 134;
    
    
    
    //adding cloud to the group
   obstacleGroup.add(obstacle);
    }
}


  

function spawnfruits() {
  //write code here to spawn the fruit
   if (frameCount % 150 === 0) {
     fruit = createSprite(600,100,40,10);
    fruit.y = Math.round(random(60,150));
    fruit.addImage(bananaImage);
    fruit.scale = 0.1;
    fruit.velocityX = -3;
      
     //assign lifetime to the variable
    fruit.lifetime = 220;
    
    //adjust the depth
    monkey.depth = fruit.depth;
    fruit.depth = fruit.depth + 1;
    
    //adding cloud to the group
   bananaGroup.add(fruit);
    }
}


