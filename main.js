img="";
status="";
objects=[];

function preload()
{
img=loadImage('car.jpg');
}
function setup()
{
    canvas= createCanvas(380,380);
    canvas.center();
    video= createCapture(VIDEO);
    video.hide();
    objectDetector=ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML="Status: Detecting Object";
}
function modelLoaded() 
{
    console.log("modelLoaded");
    status=true;
}
function gotResult(error, results)
{
    if(error)
    {
        console.log(error);
    }
    console.log(results);
    objects=results;
}

function draw()
{
    image(video, 0, 0, 640, 440);
    if(status != "")
    {
        r=random(255);
        g=random(255);
        b=random(225);
        objectDetector.detect(video, gotResult);
       for (i = 0; 1 < objects.length; i++)
       {
           document.getElementById("status").innerHTML = "Status : Object Detected";
           document.getElementById("number_of_objects").innerHTML = "Number of objects detected are: " + objects.length;
           fill("r, g, b");
           percent = floor(objects[i].confidence * 100);
           text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y);
           noFill();
           stroke("r, g, b");
           rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
       } 
    }
}