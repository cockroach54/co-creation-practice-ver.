var x=0, y=0;
var lion; //image 전역변수
var data = [];
var allData = [];
var c_wdt = 500;
var c_hgt = 1000;

var svg;
var path;

function preload(){
//  svg = loadSVG('tt.svg');
}

function setup(){
    
    var canvas = createCanvas(c_wdt,c_hgt);
    canvas.parent('cntr');
//    setFrameRate(100); //
    background(255);
    //line(15, 25, 70, 90);
    stroke(255, 0, 0);
//    stroke('red');
//    drawingContext.shadowOffsetX = 5;
//  drawingContext.shadowOffsetY = -5;
//  drawingContext.shadowBlur = 10;
//  drawingContext.shadowColor = "black";
  
//  path = querySVG('path')[1];
}

function draw(){
//    ellipse(50,50,100,80); // x, y, x_len, y_len
//    if(mouseIsPressed){
//        fill(0);
//    }
//    else{
//        fill(255);
//    }
    ellipse(50,50,100,80);
    fill('blue');
    ellipse(200,200,100,80);
    fill('yellow');
    ellipse(100,200,100,80);
    fill('black');
  
//  image(lion, 0,0,200,200);
  fill(255);
  rect(0,0,500,500);
  image(lion, 100,600,200,200,0,0,520,347);  
  image(lion, 300,400+200/347*y,200,200,0,y-347); 
  
  
//  image(lion, 0,0,200,0);
//  image(lion, 0,0,200,200);
    //fill(random(0,255), random(0,255), random(0,255));
  x++;
  if(y-347<=0)y+=3;
  image(lion, 300,100,200,200,520/2,0,520/2,347/2);
  image(lion, 300,300,200,200,520/2,347/2,520/2,347/2);
  image(lion, 100,100,200,200,0,0,520/2,347/2);
  image(lion, 100,300,200,200,0,347/2,520/2,347/2);
//  image(lion, 300,100,200,200,0,0,520/2,347/2);
//    ellipse(x, height/2, 20, 2);
//    ellipse(width/2, y, 20, 20);
//    x=x+1;
//    y=y+1;
}
//function mousePressed(){
////    ellipse(mouseX, mouseY, 80, 80);
//    //image(lion, mouseX, mouseY, 72, 55);
////    console.log('pressed..');
////    fullscreen();
//    point(mouseX, mouseY);
//    data.push([mouseX, mouseY]);
//    beginShape();
//}

function mousePressed(){
    var px = get(mouseX, mouseY);
    console.log(px);
//  console.log(get(mouseX,mouseY));
}
function mouseDragged(){
    //point(mouseX, mouseY);
    data.push([mouseX, mouseY]);
    drawline(data);
//    curveVertex();
}
function mouseReleased(){
    console.log(data.toString());
    allData.push(data);
    data=[];
    beginShape();
    endShape();
}
function preload(){
    lion = loadImage("lemon.jpg");
//    lion = loadImage("lion.png");
}
function keyPressed(){
//    if(keyCode===ENTER){
    if(keyCode===32){ //space
//        console.log(allData);
        checkArea();
//      checkAreaByArray();
    }
    else if(keyCode===ENTER){
//        drawline(data);
      tt();
    }
}

function drawline(d){
    var cur_x = d[0][0];
    var cur_y = d[0][1];
    var next_x;
    var next_y;
    var r_val = Math.random()*255>>0;
    var g_val = Math.random()*255>>0;
    var b_val = Math.random()*255>>0;
//    stroke(r_val, g_val, b_val);
    fill(r_val, g_val, b_val);
//    stroke('red');
    for(i=1; i<d.length; i++){
        next_x = d[i][0];
        next_y = d[i][1];
        line(cur_x, cur_y, next_x, next_y);
        cur_x=next_x;
        cur_y=next_y;
    }
}

function checkArea(){ 
    //계산 너무 많으면 mul*mul 픽셀당 계산
    var occupied = 0;
    var mul = 30;
    noStroke();
    for(var i=0; i<c_wdt; i+=mul){
        for(var j=0; j<c_hgt; j+=mul){
            console.log('i= ',i,' j= ',j);
            var k = get(i+mul/2, j+mul/2);
            if(k[0]!=255 || k[1]!=255 || k[2]!=255){
                occupied++;
                fill(255,0,0,100); //alpha 0~255 (255 is exactly solid color)
//                fill('red');
                rect(i,j,mul,mul);
            }
            else{
                fill(0,0,0,100);
                rect(i,j,mul,mul);
            }
        }
    }
    var pct = occupied*mul*mul/(c_wdt*c_hgt)*100;
    console.log('all', c_wdt*c_hgt, 'px, occupied', occupied*mul*mul, 'px, percent', pct,'%');
}

function checkAreaByArray(){ 
  loadPixels();
  //console.log(pixels); // debug 
  var d = pixelDensity(); // maybe 1~2, 레티나 디스플레이 보정
  var idx=0;
  var mul = 1;
  var occupied = 0;
  
  for(var i=0; i<c_hgt; i++){
    for(var j=0; j<c_wdt; j++){
      idx = j*4*d + i*c_wdt*4*d*d;
      var r = pixels[idx];
      var g = pixels[idx+1];
      var b = pixels[idx+2];
      //console.log(idx);
      if(r!=255 || g!=255 || b!=255){
        occupied++;
      }
    }
  }
  var pct = occupied/(c_wdt*c_hgt)*100; 
  pct = Math.round(pct);
  console.log('pixel density is ',d);
  console.log('all', c_wdt*c_hgt, 'px, occupied', occupied, 'px, percent', pct,'%');
}

function tt(){ 
  var d = 2;
for (var i = 0; i < d; i++) {
  for (var j = 0; j < d; j++) {
    // loop over
    idx = 4 * ((y * d + j) * 100 * d + (x * d + i));
    console.log(idx);
  }
}
}