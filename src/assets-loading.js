var bgPic = new Image();
var paddlePic = new Image();
var ballPic = new Image();

var imagesToLoad = 0;

function loadImageForTileCode(tileCode, fileName) {
  tilePics[tileCode] = new Image();
  beginLoadingImage(tilePics[tileCode], fileName);
}

function loadImages() {
  var	imageList	=	[
    {imgNode:paddlePic,	fileName:"paddle.png"},
    {imgNode:ballPic, fileName:"ball.png"},
    {imgNode:bgPic, fileName:"bg.png"},
    ];
    
  imagesToLoad = imageList.length;

  for (img of imageList) {
    beginLoadingImage(img.imgNode,img.fileName);
  }
}

function beginLoadingImage(imgNode, fileName) {
  imgNode.src = "assets/images/" + fileName;
  imgNode.onload = setAssetAsLoadedAndLaunchIfReady();
}

function setAssetAsLoadedAndLaunchIfReady() {
  imagesToLoad--;
  launchIfReady();
}