status = false;
status2 = false;
KhiljiSong = "";
PeterPanSong = "";
scoreLeftWrist = 0;
scoreRightWrist = 0;
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
function preload() {
    KhiljiSong = loadSound("khilji.mp3");//khilji// right
    PeterPanSong = loadSound("peterPan.mp3");//peter pan// left
}
function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on("pose", gotPoses);
}

function modelLoaded() {
    console.log("PoseNet Is Initialised");
}

function draw() {
    image(video, 0, 0, 600, 500);
    fill("#FF0000");
    stroke("#FF0000");

    KhiljiSongStatus = KhiljiSong.isPlaying();
    PeterPanSongStatus = PeterPanSong.isPlaying();

    if (scoreLeftWrist > 0.2) {
        console.log("left wrist")
        console.log(scoreLeftWrist, "left wrist")

        circle(leftWristX, leftWristY, 100);
        document.getElementById("song_name").innerHTML = "Peter Pan Theme song ";

        if (PeterPanSongStatus == false) {
            if (KhiljiSongStatus == true) {
                KhiljiSong.stop();
            }
            PeterPanSong.play();
            // console.log("song 1 stopped ")

        }

    }

    if (scoreRightWrist > 0.2) {
        console.log("right wrist")
        console.log(scoreRightWrist, "right wrist")

        circle(rightWristX, rightWristY, 100);

        document.getElementById("song_name").innerHTML = "Harry Potter Theme song ";
        if (KhiljiSongStatus == false) {
            if (PeterPanSongStatus == true) {
                PeterPanSong.stop();
            }
            KhiljiSong.play();
        }

        console.log(status2, "song2");

    }

}
function gotPoses(results) {
    if (results.length > 0) {
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        scoreRightWrist = results[0].pose.keypoints[10].score;
        //console.log("scoreLeftWrist = " + scoreLeftWrist);
        //console.log("scoreRightWrist = " + scoreRightWrist);
    }
}