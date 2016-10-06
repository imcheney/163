var playbox = document.querySelector(".playbox");
var videoModule = document.querySelector(".m-video.cover"); 
var videoPlayer = document.querySelector(".m-video.player");
playbox.addEventListener("click", function() {
	videoModule.style.display="block";
	document.body.style.overflowY='hidden';
	videoPlayer.play();
});
var videoModuleCloseBtn = document.querySelector(".m-video.closeIcon");

videoModuleCloseBtn.addEventListener("click", function() {
	videoModule.style.display="none";
	document.body.style.overflowY='auto';
	videoPlayer.pause();
});