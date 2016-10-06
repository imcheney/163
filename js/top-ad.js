(function() {
	var topAd = document.getElementById("topAd");
	var closeBtn = document.getElementById("topAdClose");

	closeBtn.addEventListener("click",function() {
		console.log("addEventListener");
		setCookie("adHidden", 1);    //设置cookie没有成功这里!
		topAd.style.display = "none";
		console.log(getCookie("adHidden"));  //这里打印出来是null?????
	});

	if (!getCookie("adHidden")) {
		console.log("if runs");
		topAd.style.display = "block;";
		setCookie("adHidden",0);    //1:true and hide ad; 0:false and keep showing ad;
		console.log(getCookie("adHidden"));
	} else {
		if (getCookie("adHidden")==1) {topAd.style.display = "none;";}
		if (getCookie("adHidden")==0) {topAd.style.display = "block;";}
	}
	
})();