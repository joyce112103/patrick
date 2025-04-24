let bottleImg;
let sockImg;
let angle = 0;
let rotating = false;
let bgm;
let fft;

function preload() {
  bottleImg = loadImage('Subject 2.png');
  sockImg = loadImage('sock.png');
  bgm = loadSound('Bag Raiders - Shooting Stars (Instrumental) (1).mp3');
}

function setup() {
  createCanvas(600, 600);
  imageMode(CENTER);
  bgm.setVolume(0.3);
  bgm.playMode('sustain');

  fft = new p5.FFT();
}

function draw() {
  background(255);
  translate(width / 2, height / 2);

  // 抓頻譜資料
  fft.analyze();
  let bass = fft.getEnergy("bass");

  if (!rotating) {
    // 跳動更明顯：改變 scale 範圍
    let scaleFactor = map(bass, 0, 255, 0.7, 1.5);

    push();
    scale(scaleFactor);
    image(sockImg, 0, 0, 300, 300);
    pop();
  } else {
    angle += 0.10;
    rotate(angle);
    image(bottleImg, 0, 0, 500, 500);
  }
}

function mousePressed() {
  rotating = !rotating;

  if (!bgm.isPlaying()) {
    bgm.play(0, 1, 0.3, 80, 20); // 播一次指定段落
  }
}
