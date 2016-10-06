(function() {
var closeBtn = document.querySelector(".m-login.closeIcon");
var loginModule = document.querySelector(".m-login");
var followBtn = document.querySelector(".hd-title-btn");
var followedModule = document.querySelector(".followed");
console.log("login js runs!");
closeBtn.addEventListener("click", function(){
	loginModule.style.display = "none";
	document.body.style.overflowY = "auto";
});
followBtn.addEventListener("click", function(){
	loginModule.style.display = "block";
	document.body.style.overflowY = "hidden";
});

// (function(){
// 	if (!getCookie(loginSuc)) {

// 	}
// })();

/*登录表单验证*/
var userName = document.getElementById("userName");
var password = document.getElementById("password");
var submitBtn = document.getElementById("submitBtn");
var loginStatus = document.getElementById("loginStatus");

/*
login box最后"登录"按钮的点击事件
(1) 判断是否已经输入账号密码
(2) 把输入的账号密码进行Md5加密, 放在dataRequest对象里面, 传送给后台
(3) 根据后台返回的respText, 用dataRequest.success这个callback函数进行输入正确与否的判断;
*/
submitBtn.addEventListener("click", function(e){
	console.log("add submitBtn!!!");
	var e = e || window.event;
	var dataRequest = {
		requestType: "get",    //请求类型
		asyn: true,
		url: "http://study.163.com/webDev/login.htm"+"?userName"+Md5(userName.value)+
		"&password="+Md5(password.value)
	}
	/*设置一个处理服务器返回数据的callback函数*/
	/*此处function的参数已经是responseText了, 此处简写为respText*/
	dataRequest.success = function(respText) {
		if (respText == 0) {
			//账号密码错误的情形;
			loginStatus.style.display = "block";
		} else {
			//账号密码正确的情形;
			loginStatus.style.display = "none";
			setCookie("loginSuc", 1);
			follow();
			//document.body.style.overflow = "auto";
		}
	}
	/*向服务器发送请求之前得判断用户是否已经输入*/
	if (userName.value == "") {
		loginStatus.innerHTML = "请输入账号!";
		if (password.value == "") {loginStatus.innerHTML += " 请输入密码!"}
	} else if (password.value == "") {
		loginStatus.innerHTML = "请输入密码!";
	} else {
		/*剩下的情况就是用户已经输入了用户和密码了*/
		ajax(dataRequest);
	}
	stopDefault(e);
});

/*
登录成功调用follow函数, 要实现
(1) 调用关注API,    done
(2) 设置关注成功的cookie(followSuc)   done
(3) "关注"按钮变成不可以点击的"已关注"按钮;    done
*/
function follow() {
	var dataRequest = {
		requestType: "get",
		asyn: true,
		url: "//study.163.com/webDev/attention.htm"
	};
	dataRequest.success = function(respText) {
		if (respText == 1) {
			setCookie("followSuc", 1);
			//设置关注的模块不显示
			followBtn.style.display = "none";
			//设置已关注的模块display: inline-block;
			followed.style.display = "inline-block";
			//设置登录窗口不显示了;
			loginModule.style.display = "none";
		}
	}
	ajax(dataRequest);
}

var cancelFollowBtn = document.querySelector(".cancelFollow");
cancelFollowBtn.addEventListener("click", function() {
	removeCookie("followSuc");
	followBtn.style.display = "block";
	followed.style.display = "none";
});

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