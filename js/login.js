(function() {    //该js中的代码是自动执行一次的; 同时自动执行的匿名函数还有一个好处, 可以解决全局变量污染的问题;

/*global*/
	var closeBtn = document.querySelector(".m-login.closeIcon");
	var loginModule = document.querySelector(".m-login");
	var followBtn = document.querySelector(".hd-title-btn");
	var followedModule = document.querySelector(".followed");
	var fansModule = document.querySelector(".hd-title-follow");
	var fansCount = fansModule.children[1]; 
	var cancelFollowBtn = document.querySelector(".cancelFollow");

	console.log("login runs!");
	/*expire 过期时间设置*/
    	//非常重要, expire不设置的话, cookie只存在于一个会话seesion之中, 等到刷新页面后, 就不会存在了; 因此会感觉cookie似乎没有设置成功;
		//获取当前时间 
		var date=new Date(); 
		var expiresDays= 7; 
		//将date设置为7天以后的时间 
		date.setTime(date.getTime()+expiresDays*24*3600*1000); 

/*step1: 给"关注"按钮装上监听函数, 在监听函数中做判断处理*/
	followBtn.addEventListener("click", function(){
		console.log("click follow!!");
		if (!getCookie("loginSuc")) {
			//弹出登录框
			loginModule.style.display = "block";
			document.body.style.overflowY = "hidden";
		} else {
			//调用follow函数;
			follow();
		}

	});
/*/给"关注"按钮装上监听函数*/

/*step2: 登录框处理*/
	/*登录表单验证所需要的变量准备*/
		var userName = document.getElementById("userName");
		var password = document.getElementById("password");
		var submitBtn = document.getElementById("submitBtn");
		var loginStatus = document.getElementById("loginStatus");

	/*给登录框的关闭按钮装上监听*/
		closeBtn.addEventListener("click", function(){
			console.log("click closeBtn!!");
			loginModule.style.display = "none";
			document.body.style.overflowY = "auto";    //overflowY决定了垂直方向上是否展示滚动条, 是否允许滚动;
			//清理掉loginStatus上的信息
			loginStatus.innerHTML = "";
			loginStatus.style.display = "none";
		});
	/*/给登录框的关闭按钮装上监听*/

	/*login box最后"登录"按钮的点击事件*/
		// (1) 判断是否已经输入账号密码
		// (2) 把输入的账号密码进行Md5加密, 放在dataRequest对象里面, 传送给后台
		// (3) 根据后台返回的respText, 用dataRequest.success这个callback函数进行输入正确与否的判断;
	
		submitBtn.addEventListener("click", function(e){
			console.log("click submitBtn!!");
			var e = e || window.event;
			var dataRequest = {
				requestType: "get",    //请求类型
				asyn: true,
				url: "//study.163.com/webDev/login.htm"+"?userName="+Md5(userName.value)+
				"&password="+Md5(password.value)
			}
			/*设置一个处理服务器返回数据的callback函数*/
			/*此处function的参数是服务器返回的responseText, 此处为了方便简写为respText*/
			dataRequest.success = function(respText) {
				if (respText == 0) {
					//账号密码错误, 显示警示信息, 表示账号密码输入不正确;
					loginStatus.innerHTML = "账号密码输入不正确!";
					loginStatus.style.display = "block";
				} else {
					//账号密码正确的情形, 设置loginSuc cookie, 关闭掉登录窗口, 然后调用follow函数;
					// loginStatus.style.display = "none";   默认就是none的;
					setCookie("loginSuc", 1, date);    //7天的cookie;
					loginModule.style.display = "none";
					document.body.style.overflowY = "auto";
					follow();
					//document.body.style.overflow = "auto";
				}
			}

			/*向服务器发送信息*/
				//向服务器发送请求之前得判断用户是否已经输入
				if (userName.value == "") {
					loginStatus.innerHTML = "请输入账号!";
					if (password.value == "") {loginStatus.innerHTML += "&nbsp;请输入密码!";}
					loginStatus.style.display = "block";
				} else if (password.value == "") {
					loginStatus.style.display = "block";
					loginStatus.innerHTML = "请输入密码!";
				} else {
					/*剩下的情况就是用户已经输入了用户和密码了*/
					ajax(dataRequest);
				}

			stopDefault(e);
		});
		/*/login box最后"登录"按钮的点击事件*/
/*/登录框处理*/

/*step3: 调用的follow函数*/
	// 登录成功调用follow函数, 要实现
	// (1) 调用关注API,    done
	// (2) 设置关注成功的cookie(followSuc)   done
	// (3) "关注"按钮变成不可以点击的"已关注"按钮;    done
	function follow() {
		var dataRequest = {
			requestType: "get",
			asyn: true,
			url: "//study.163.com/webDev/attention.htm"
		};
		dataRequest.success = function(respText) {
			if (respText == 1) {
				//设置关注的cookie
				setCookie("followSuc", 1, date);
				//设置关注的模块不显示
				followBtn.style.display = "none";
				//设置已关注的模块display: inline-block;
				followedModule.style.display = "inline-block";
				//设置粉丝人数+1
				fansCount.innerHTML = "46";
			}
		}
		ajax(dataRequest);    //调用关注API;
	}
/*/follow函数*/

/*extra step: 取消关注*/
	//取消了以后, 首先改变关注按钮的样子, 然后粉丝人数-1, 接着去掉followSuc这个cookie;
	cancelFollowBtn.addEventListener("click", function() {
		console.log("click cancelFollowBtn!!");
		removeCookie("followSuc");
		followBtn.style.display = "inline-block";
		followedModule.style.display = "none";
		fansCount.innerHTML = "45";
	});
/*/取消关注*/


function stopDefault(e) {
	//阻止默认浏览器动作(W3C) 
	if (e && e.preventDefault)
		{e.preventDefault();}
	//IE中阻止函数器默认动作的方式 
	else
		{window.event.returnValue = false;}
	return false;
}

})();