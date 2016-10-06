var sl_whole = document.querySelector(".body-slider.fullwidth")
var sl_wrap = document.getElementsByClassName("sl-wrapper")[0];
var sl_banner = document.querySelectorAll(".sl-wrapper .banner");
var sl_count = document.querySelector(".sl-count");
var sl_i = document.querySelectorAll(".sl-count i");
var sl_max = 2;
var sl_n = 0;    //sl_n用来记录当前所在第几个banner;
var sl_initId;
sl_banner[0].style["opacity"] = 1; sl_i[0].style["background-color"] = "black";
init();   //调用下方的代码;

function init() {
	sl_initId = setInterval(step,5000);
	for (var x=0; x<sl_i.length; x++) {
		sl_i[x].addEventListener("click", fn(x));
		sl_whole.addEventListener("mouseover", pause);
		sl_whole.addEventListener("mouseleave", keepGoing);
	}
	function fn(index) {
		return function(){
			nav(index); sl_n = index;
		};
	}
	function pause() {
		console.log("pause runs! index="+sl_n+"!");
		clearInterval(sl_initId);
	}
	function keepGoing() {
		console.log("keepGoing runs! index="+sl_n+"!");
		sl_initId = setInterval(step,5000);
	}
}

function step() {
	if (sl_n<sl_max) {nav(sl_n+1);} else {nav(0);}
}
function nav(index) {
	sl_banner[0].style["opacity"] = 0; sl_banner[1].style["opacity"] = 0; sl_banner[2].style["opacity"] = 0;
	animation(sl_banner[index], "opacity", 0, 1);
	sl_n = index; renewIndexDots(sl_n);
}
function renewIndexDots(index) {
	sl_i[0].style["background-color"] = "white"; sl_i[1].style["background-color"]="white"; sl_i[2].style["background-color"]="white";
	sl_i[index].style["background-color"] = "black";
}
function animation(ele,attr,from,to) {
		var distance = Math.abs(to-from);
		var stepLength = distance/100;  //100是因为有100帧;
		var sign = (to-from)/distance; //判断正负; 这个很重要;
		var haveDone = 0; //类似sum，计算动画走了多久;
		function process() {
			//@currentStep: 代表动画当下这一步的存量应当走到哪里了;
			var currentStep = haveDone+stepLength;  
			if (currentStep<distance) {
				ele.style[attr] = from+currentStep*sign;  //进行赋值，实现微小的变化;
				haveDone = currentStep; //把已经走过的存量更新到当下currentStep;
			} else {  //i.e. currentStep>=distance，说明已经完成了动画过程的要求变化量了;
				ele.style[attr] = to;
				clearInterval(opaChange);   //发现已经把动画属性值走完了，那么就关闭Interval计时器，结束动画;
			}
		}
		ele.style[attr] = from; //回到起点，准备下次循环;
		var opaChange = setInterval(process, 5); //设置一秒1s/10ms=100帧，效果比较流畅了;
	}