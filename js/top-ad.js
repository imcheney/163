(function() {
	var topAd = document.getElementById("topAd");
	var closeBtn = document.getElementById("topAdClose");
    
    /*expire 过期时间设置;
    非常重要, expire不设置的话, cookie只存在于一个会话seesion之中, 等到刷新页面后, 就不会存在了; 因此会感觉cookie似乎没有设置成功;
    */
	//获取当前时间 
	var date=new Date(); 
	var expiresDays= 7; 
	//将date设置为10天以后的时间 
	date.setTime(date.getTime()+expiresDays*24*3600*1000); 

	closeBtn.addEventListener("click",function() {
		console.log("addEventListener to closeBtn!");
		setCookie("adHidden", 1, date);    //设置cookie没有成功这里!
		topAd.style.display = "none";
		console.log(getCookie("adHidden"));
	});

	if (!getCookie("adHidden")) {
		topAd.style.display = "block";
		setCookie("adHidden", 0, date);    //1:true and hide ad; 0:false and keep showing ad;
		console.log(getCookie("adHidden"));
	} else {
		if (getCookie("adHidden")==1) {topAd.style.display = "none";}
		if (getCookie("adHidden")==0) {topAd.style.display = "block";}
	}
	
})();