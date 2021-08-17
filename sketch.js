var START = 0;
var PLAY = 1;
var END = 2;

var gameState = START;
var bgImg,gameoverImg,restartImg,weapon1Img;
var z1Img,z2Img;
var rock1Img,rock2Img,rock3Img;
var saviourImg,crouchImg,dieImg,bulletImg;
var invisible,bg;
var fireSound,soundtrack,coinCollect,punch,laughter,jump;
var saviour,zombie1,zombie2;
var zombieGroup,rockGroup,bulletGroup,coinGroup;
var coin,coins,coinImg,coinScore;
var gameover,restart;
var lives=3,heart1Img,heart2Img,heart3Img,heart1,heart2,heart3;
var zombieKill=0,countImg,killCount;
var starting,startingImg;

function preload(){
bgImg=loadImage("bg.png");
saviourImg=loadAnimation("saviour/s1.png","saviour/s2.png","saviour/s3.png","saviour/s4.png","saviour/s5.png");
crouchImg=loadAnimation("saviour/crouch3.png");
dieImg=loadAnimation("saviour/die3.png");

z1Img=loadAnimation("zombies/zombie-1.1.png","zombies/zombie-1.2.png","zombies/zombie-1.3.png","zombies/zombie-1.4.png",
"zombies/zombie-1.5.png","zombies/zombie-1.6.png","zombies/zombie-1.7.png","zombies/zombie-1.8.png","zombies/zombie-1.9.png",
"zombies/zombie-1.10.png","zombies/zombie-1.11.png","zombies/zombie-1.12.png","zombies/zombie-1.13.png",
"zombies/zombie-1.14.png","zombies/zombie-1.15.png","zombies/zombie-1.16.png");

z2Img=loadAnimation("zombies/zombie-2.1.png","zombies/zombie-2.2.png","zombies/zombie-2.3.png","zombies/zombie-2.4.png","zombies/zombie-2.5.png",
"zombies/zombie-2.6.png","zombies/zombie-2.7.png","zombies/zombie-2.8.png","zombies/zombie-2.9.png","zombies/zombie-2.10.png",
"zombies/zombie-2.11.png","zombies/zombie-2.12.png","zombies/zombie-2.13.png","zombies/zombie-2.14.png","zombies/zombie-2.15.png",
"zombies/zombie-2.16.png");

bulletImg=loadImage("bullet1.png");
rock1Img=loadImage("rock1.png");
rock2Img=loadImage("rock2.png");
coinImg=loadImage("coin.png");
gameoverImg=loadImage("gameover.png");
restartImg=loadImage("restart.png");
heart1Img=loadImage("heart1.png");
heart2Img=loadImage("heart2.png");
heart3Img=loadImage("heart3.png");
weapon1Img=loadImage("weapon1.png");
countImg=loadImage("zombieKill.png");
startingImg=loadImage("start.png");

fireSound = loadSound("fire.mp3");
coinCollect=loadSound("coincollect.mp3");
punch=loadSound("punch.mp3");
laughter=loadSound("laughter.mp3");

    
}

function setup() {
    createCanvas(displayWidth-50,displayHeight-130);

   

    bg = createSprite(displayWidth/2,displayHeight/2-65,displayWidth-50,displayHeight-170);
    bg.addImage(bgImg);
    bg.scale = 1.57;
    bg.x = bg.width/2;
    bg.velocityX=-5;

    invisible = createSprite((displayWidth-50)/2,displayHeight-200,displayWidth,40);
    invisible.shapeColor="red";
    invisible.visible=false;

    saviour=createSprite(250,displayHeight-300,50,100);
    saviour.addAnimation("walking",saviourImg);
    saviour.addAnimation("crouch",crouchImg);
    saviour.scale=0.45;
    saviour.velocityY=7;
    //saviour.debug=true;

    rockGroup = createGroup();
    zombieGroup = createGroup();
    bulletGroup = createGroup();

    killCount=createSprite(110,60);
    killCount.addImage(countImg);
    killCount.scale=0.5;
    
    coinScore=createSprite(75,120);
    coinScore.addImage(coinImg);
    coinScore.scale=0.025;

    gameOver=createSprite((displayWidth-50)/2,(displayHeight-170)/3);
    gameOver.addImage(gameoverImg);
    gameOver.scale=0.5;
    gameOver.visible=false;
    
    restart=createSprite((displayWidth-50)/2,displayHeight-350);
    restart.addImage(restartImg);
    restart.scale=0.7;
    restart.visible=false;

    heart1 = createSprite(displayWidth-200,60,20,20);
    heart1.visible = false;
    heart1.addImage(heart1Img);
    heart1.scale = 0.4;
 
    heart2 = createSprite(displayWidth-200,60,20,20);
    heart2.visible = false;
    heart2.addImage(heart2Img);
    heart2.scale = 0.4;
 
    heart3 = createSprite(displayWidth-200,60,20,20);
    heart3.visible = false;
    heart3.addImage(heart3Img);
    heart3.scale = 0.4;

    starting=createSprite(displayWidth/2,displayHeight/2-65,displayWidth-50,displayHeight-170);
    starting.addImage(startingImg);
    starting.scale=1.7;
    starting.visible=false;
    

    zombieGroup=createGroup();
    rockGroup=createGroup();
    bulletGroup=createGroup();
    coinGroup=createGroup();
    blockGroup=createGroup();
    weaponGroup=createGroup();

    coins = 0;

}

function draw() {
    background("red");

   if(gameState === START){
       starting.visible=true;
    if(keyDown("s")){
        starting.visible=false;
        gameState = PLAY;
    }
}

    if(gameState===PLAY) {

        //soundtrack.play();

        gameOver.visible=false;
        restart.visible=false;

    if(bg.x<0){
        bg.x=bg.width/2;
    }

    if(keyDown("space")){
        fire();
        fireSound.play();
    }

    if(coinGroup.isTouching(saviour)){
        //coins=coins+1;
        coinCollect.play();
        for(var i=0; i<coinGroup.length; i++){
            if(coinGroup[i].isTouching(saviour)){
                coins=coins+1;
                coinGroup[i].destroy();
            }
        }
    }

    if(bulletGroup.isTouching(zombieGroup)) {

        for(var i=0; i<zombieGroup.length; i++) { 
            for(var j=0; j<bulletGroup.length ; j++){
                if(zombieGroup[i] !== undefined && bulletGroup[j] !== undefined){

                    if(zombieGroup[i].isTouching(bulletGroup[j])){
                        zombieGroup[i].tint = "green";
                        zombieKill+=1;
                        //setTimeout(() => {zombieGroup[i].destroy()}, 100);
                        zombieGroup[i].destroy();
                        bulletGroup[j].destroy();
                    }
                }
            }
        }
    }

    
    if(keyDown("up") && saviour.y>=displayHeight-400){
        saviour.velocityY=-20;
    }
    saviour.velocityY+=0.7;

    if(keyWentDown("down") && saviour.y>=displayHeight-400){
        saviour.changeAnimation("crouch",crouchImg);
        saviour.scale=0.9;
        rockGroup.setVelocityXEach(0);
        coinGroup.setVelocityXEach(0);
        bg.velocityX=0;
    }

    if(keyWentUp("down")){
        saviour.changeAnimation("walking",saviourImg);
        saviour.scale=0.5;
        rockGroup.setVelocityXEach(-5);
        coinGroup.setVelocityXEach(-5);
        bg.velocityX=-5;
    }
    

    if(lives<=0){
        heart1.visible=false;
        saviour.changeAnimation("die",dieImg);
        gameState=END;
    }
    
    if(rockGroup.isTouching(saviour)) {
        for(var i = 0; i<rockGroup.length; i++){
            if(rockGroup[i].isTouching(saviour)){
                rockGroup[i].destroy();
                lives=lives-1;
                punch.play();
                saviour.tint = "red";
                setTimeout(() => {saviour.tint="white";}, 1500);
            }
        }
    }

    if(zombieGroup.isTouching(saviour)) {
        for(var i = 0; i<zombieGroup.length; i++){
            if(zombieGroup[i].isTouching(saviour)){
                zombieGroup[i].destroy();
                lives=lives-1;
                punch.play();
                saviour.tint = "red";
                setTimeout(() => {saviour.tint="white";}, 1500);
            }
        }
    }

    if(weaponGroup.isTouching(saviour)) {
        for(var i = 0; i<weaponGroup.length; i++){
            if(weaponGroup[i].isTouching(saviour)){
                weaponGroup[i].destroy();
                lives=lives-1;
                punch.play();
                saviour.tint = "red";
                setTimeout(() => {saviour.tint="white";}, 1500);
            }
        }
    }


    if(lives===3){
        heart3.visible=true;
        heart2.visible=false;
        heart1.visible=false;
    }
    if(lives===2){
        heart3.visible=false;
        heart2.visible=true;
        heart1.visible=false;
    }

    if(lives===1){
        heart3.visible=false;
        heart1.visible=true;
        heart2.visible=false;
    }
   
    //zombieGroup.collide(invisible);
    spawnZombies();
    rocks();
    coinCreate();
    }  
    
    else if (gameState === END) {
        

        saviour.visible=false;
        gameOver.visible = true;
        restart.visible = true;
        
        coinGroup.destroyEach();
        zombieGroup.destroyEach();
        bulletGroup.destroyEach();
        bulletGroup.visible=false;
        rockGroup.destroyEach();
        blockGroup.destroyEach();
        weaponGroup.destroyEach();

        bg.velocityX = 0;
        saviour.velocityY = 0;
        saviour.velocityX = 0;
        zombieGroup.setVelocityXEach(0);
        rockGroup.setVelocityXEach(0);
        coinGroup.setVelocityXEach(0);
        bulletGroup.setVelocityXEach(0);
        blockGroup.setVelocityXEach(0);
        weaponGroup.setVelocityXEach(0);
        
        if(mousePressedOver(restart)){
            reset();
        }
      }
      
    saviour.collide(invisible);
    drawSprites();

if(gameState===PLAY || gameState === END){
    textSize(25);
    fill("golden")
    text(": "+coins,100,130);

    textSize(30);
    fill("golden")
    text(zombieKill,107,70);
    }

}

function spawnZombies(){
    var randomFrames = Math.round(random(150,400));
    if(frameCount%randomFrames===0){
        zombie=createSprite(displayWidth,displayHeight-340,20,200);
        zombie.velocityX=-6;
        weapon=createSprite(displayWidth,displayHeight-430,20,200);
        weapon.velocityX=-11;
        weapon.setCollider("circle",10,10,50);
        var rand = Math.round(random(1,2));
        switch(rand) {
                case 1: zombie.addAnimation("z1",z1Img);
                        zombie.scale=0.7;
                        zombie.y+=20;
                        weapon.addImage(weapon1Img);
                        weapon.scale=0.25;
                    break;
                case 2: zombie.addAnimation("z2",z2Img);
                        zombie.scale=0.6;
                        weapon.addImage(weapon1Img);
                        weapon.scale=0.25;
                    break;
                default: break;
        }

        zombieGroup.add(zombie);
        weaponGroup.add(weapon);

        zombieGroup.setLifetimeEach(displayWidth/6);
        weaponGroup.setLifetimeEach(displayWidth/11);

    }
}

function rocks(){
    if(frameCount%400===0){
        rock=createSprite(displayWidth,displayHeight-280,10,10);
        rock.velocityX=-5;
        rock.setCollider("circle",10,10,70);
        var rand = Math.round(random(1,2));
        switch(rand) {
                case 1: rock.addImage(rock1Img);
                rock.scale=0.5;
                        break;
                case 2: rock.addImage(rock2Img);
                rock.scale=0.3;
                        break;
                default: break;
        }
        rockGroup.add(rock);
        rockGroup.setLifetimeEach(displayWidth/5);
    }
}

function fire(){
        bullet=createSprite(saviour.x+90,saviour.y-35);
        bullet.velocityX=9;
        bullet.addImage(bulletImg);
        bullet.scale=0.03;
        console.log("Mouse has been pressed");
        bulletGroup.add(bullet);
        bulletGroup.setLifetimeEach(displayWidth/9);
}

function coinCreate(){
    var randomFrames = Math.round(random(100,250));
    if(frameCount%randomFrames===0){
        coin=createSprite(displayWidth,displayHeight-310,20,200);
        coin.addImage(coinImg);
        coin.velocityX=-5;
        coin.scale=0.05;
        coinGroup.add(coin);
        coinGroup.setLifetimeEach(displayWidth/5);
    }
}

function reset(){
     gameState=PLAY;
     lives=3;
     coins=0;
     zombieKill=0;
     bg.velocityX=-5;
     saviour.visible=true;
     gameOver.visible = false;
     restart.visible = false;
     saviour.changeAnimation("walking",saviourImg);
     saviour.scale=0.45;
}