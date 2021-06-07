//Create variables here
var d,dog,happy_dog,milk;
var foodS,food_stock;
var database;
var fedTime,lastFed,foodObj;

function preload()
{
	//load images here
  dog = loadImage("dogImg.png");
  happy_dog  = loadImage("dogImg1.png");
 

}

function setup() {
	createCanvas(500, 500);
  feed = createButton("Feed the dog");
  feed.position(700,95);
  feed.mousepressed(feedDog);

  addFood = createButton("Add Food");
  addfood.position(800,95);
  addEventListener.mousePressed(addfoods);

  foodObj = new Foodie();
  d = createSprite(250,250,20,20);
  d.addImage(dog);
  

  database = firebase.database();

  food_stock = database.ref('Food');
  food_stock.on("value", readStock);

  fedTime = database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed= data.val();
  })
}


function draw() { 
  background(46,139,87);
  
  fill(255,255,254);
  textSize(15);
  if(lastFed>=12){
    text("Last Feed: "+ lastFed%12 + "PM" , 350,30);
  }else if(lastFed===0){
    text("Last Feed : 12 AM",350,30 );
  }
  else{
    text("Last Feed : "+ lastFed + "AM", 350,30);
  }  
    foodObj.display();

  drawSprites();
  //add styles here

  textSize(20);
  fill("blue");
  stroke(2);
  text("NOTE : Press UP Arrow to give LDrago his power", 150,400);
  text("Food Stock :"+ foodS,250,420);

}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){
  if(x<=0){
    x=0;
  }
  else{
    x=x-1;
  }
  database.ref('/').update({
    Food : x
  })
}

function feedDog(){
  d.addImage(happy_dog);
  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food : foodObj.getFoodStock(),
    FeedTime :hour()
  })
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food : foodS
  })
}


