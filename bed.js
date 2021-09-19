img = "";
zstatus = "";
objects=[];
function preload(){
img = loadImage("bedroom.webp");
}
function setup(){
    canvas = createCanvas(500,500);
    canvas.center();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting objects...";
}
function draw(){
    image(img, 0, 0, 500, 500);

    if(zstatus != ""){
        objectDetector.detect(img, gotResult);
        for(c = 0; c < objects.length; c++){
            document.getElementById("status").innerHTML = "Status: object identified";
            document.getElementById("numberofobjects").innerHTML = "The number of objected are: " + objects.length;
    
            fill(255,0,0);
            percent = floor(objects[c].confidence*100);
            text(objects[c].label + " " + percent + "%", objects[c].x + 15, objects[c].y + 15);
            noFill();
            stroke(255,0,0);
            rect(objects[c].x, objects[c].y, objects[c].width, objects[c].height);
        }
    }
}
function modelLoaded(){
    console.log("model has been loaded");
    zstatus = true;
    }
    
    function gotResult(error, results){
        if(error){
            console.error(error);
        }
        console.log(results);
        objects = results;
    }
function back(){
    window.location = "index.html";
}
