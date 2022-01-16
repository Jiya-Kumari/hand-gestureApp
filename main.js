
prediction1="";
prediction2="";
Webcam.set({
    width:350,
    height:300,
    image_format:'png',
    png_quality:90
});
camera=document.getElementById("camera");
Webcam.attach("camera");
function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML="<img id='captured_image' src='"+data_uri+"'>"
    });
}
console.log("ml5version-"+ml5.version);
classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/qDnJw7I83/model.json",modelLoaded);
function modelLoaded(){
    console.log("modelLoaded");
}
function speak(){
    var synth=window.speechSynthesis;
    speakData1="The first prediction is"+prediction1;
    speakData2="The second prediction is"+prediction2;
    var utterThis=new SpeechSynthesisUtterance(speakData1+speakData2);
    synth.speak(utterThis);
}
function check(){
    img=document.getElementById("captured_image");
    classifier.classify(img,gotResult);
}
function gotResult(error,results){
    if(error){
        console.error(error);
    }else{
        console.log(results);
        document.getElementById("result_emotion_name1").innerHTML=results[0].label;
        document.getElementById("result_emotion_name2").innerHTML=results[1].label;
        prediction1=results[0].label;
        prediction2=results[1].label;
        speak();
        if(prediction1=="amazing"){
            document.getElementById("update_emoji1").innerHTML="&#128076;";
        }
        if(prediction1=="best"){
            document.getElementById("update_emoji1").innerHTML="&#128077;";
        }
        if(prediction1=="victory"){
            document.getElementById("update_emoji1").innerHTML="&#9996;";
        }
        if(prediction2=="amazing"){
            document.getElementById("update_emoji2").innerHTML="&#128076;";
        }
        if(prediction2=="best"){
            document.getElementById("update_emoji2").innerHTML="&#128077;";
        }
        if(prediction2=="victory"){
            document.getElementById("update_emoji1").innerHTML="&#9996;";
        }
    }}
