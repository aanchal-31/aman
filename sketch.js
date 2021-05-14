var dog;
var food;
var foodS,foodStock;
var fedTime,lastFed;
var feed,addFood;
var foodObj;

function preload()
{
Dog = loadImage("images/dogImg.png");
dog1 = loadImage("images/dogImg1.png");
}

function setup() {
	createCanvas(1000, 400);
  database=firebase.database();

  dog = createSprite(800,200,150,150)
  dog.addImage(Dog);
  dog.scale = 0.2;
  
  foodStock=database.ref('Food');
  foodStock.on("value",readStock);

  feed=createButton("Feed the dog");
  feed.position(700,150);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,150);
  addFood.mousePressed(addFoods);

  foodObj = new Food();
}


function draw() {  
  background(46,139,87)
  foodObj.display();

  

  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });

  fill(255,255,254);
  textSize(15);
  if(lastFed>=12){
    text("Last Feed : "+ lastFed%12 + " PM", 350,30);
   }else if(lastFed==0){
     text("Last Feed : 12 AM",350,30);
   }else{
     text("Last Feed : "+ lastFed + " AM", 350,30);
   }
 
  
  
 
  drawSprites();
  
  //add styles here

}
function readStock(data){
  foodS=data.val();
}

function feedDog(){
  dog.addImage(dog1);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}

function addFoods(){
  foodObj.updateFoodStock(foodObj.getFoodStock()+1);
  database.ref('/').update({
    Food:foodS
  })
}



