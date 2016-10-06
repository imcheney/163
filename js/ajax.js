/*我的ajax封装*/
//传入一个data对象, 装载着发送请求的参数;
function ajax(data) { 
	//第一步 创建ajax对象;
	var xhr = new XMLHttpRequest();
	//第二部 准备发送一些请求;
	var requestType = (data.requestType=="get")?"get":"post";    //set requestType;
	var url = "";    //请求地址变量;
	if (data.url) {    //如果参数data对象有url这个属性的话,
		url = data.url;
	}
	var flag = data.asyn=="true"?"true":"false";  //请求方式, 默认是true表示允许异步, false表示同步;
	xhr.open(requestType, url, flag);
	//第三部 执行发送的动作;
	xhr.send(null);
	//第四部 data对象的success方法就是传说中的callback回调函数;
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4) {
			//
			if ((xhr.status>=200&&xhr.status<=300) || (xhr.status==304)) {
				data.success(xhr.responseText);
			}
			else {
				alert("request was unsuccessful"+xhr.status);
			}
		}
	}
}