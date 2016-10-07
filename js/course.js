(function () {
	var courseTabs = document.getElementById("body-main tab");   //获取课程标签, 方便进一步获取其子标签;
	var proDesign = courseTabs.children[0];    //proDesign 指向产品设计标签
	var proLang = courseTabs.children[1];    //proLang 指向编程语言标签
	var course = document.getElementById("neCourse");    //course 是整个课程展示区域;

	/*设置发送请求的参数*/
	var dataRequest = {  //参数都装在一个对象中; 值部分 number用数字, String要带引号;
		requestType: 'get',  //请求类型
		pageNo: 1,    //当前页数
		psize: 20,    //每页返回数据个数, 宽屏设置20
		type: 10,    //筛选类型(10: 产品设计; 20:编程语言)
		asyn: true,
		setUrl: function() {    //内部规定了一个方法叫setUrl,用来设置发送请求中的url长啥样;
			dataRequest.url = '//study.163.com/webDev/couresByCategory.htm' + '?pageNo='
			 + dataRequest.pageNo + '&psize=' + dataRequest.psize + '&type=' + dataRequest.type;
		}
	}

	/*设置callback回调函数*/
	dataRequest.success = function(data) {
		var e = JSON.parse(data);    //解析出来会是一个对象; 
		// console.log(e);
		course.innerHTML = "";
		/*遍历获取到的课程数据, 添加到li列表*/
		for (var i=0; i<e.list.length; i++) {  //e.list.[i]指的是某一个对象, 所以总共的length为20;
			var eprice = e.list[i].price==0?"免费":"¥"+e.list[i].price;   //做了一个三目运算判断;
			var li = document.createElement("li");
			var div = document.createElement("div");
			li.innerHTML = 
							"<img src='"+e.list[i].middlePhotoUrl+"'>"+
							"<h3 class='lowerCard title'>"+e.list[i].name+"</h3>"+
							"<h4 class='lowerCard provider'>"+e.list[i].provider+"</h4>"+
							"<span class='lowerCard learnerCount'><i></i><p>&nbsp;"+e.list[i].learnerCount+"</p></span>"+
							"<p class='lowerCard price'>"+eprice+"</p>";
							/*<img src="middlePhotoUrl">
					 	  	<h3>三个月入门python</h3>
					 	  	<span>网新教育</span>
					 	  	<i>298人</i>
					 	  	<em>$49</em>
					 	  	*/
			div.innerHTML = 
							"<img class='higherCard image' src='"+e.list[i].middlePhotoUrl+"'>"+
							"<h3 class='higherCard courseName'>"+e.list[i].name+"</h3>"+
							"<span class='higherCard learnerCount'><i></i><p>&nbsp;"+e.list[i].learnerCount+"人在学</p></span>"+
							"<h4 class='higherCard provider'>发布者: "+e.list[i].provider+"</h4>"+
							"<h4 class='higherCard catogoryName'>分类: "+e.list[i].catogoryName+"</h4>"+
							"<div class='higherCard description'><p class='description text'>"+e.list[i].description+"</p></div>";
							/**/
			div.style.display = "none";
			div.className = "course-popup";
			/*鼠标悬停弹出浮层*/
			li.addEventListener("mouseenter", popUp(div));
			/*鼠标移开关闭浮层*/
			li.addEventListener("mouseleave", popDown(div));
			li.appendChild(div);    //在li这个父节点的所有child后面,添加一个div;
			course.appendChild(li);    //在neCourse这个ul节点底下所有的child后面,追加一个li;
		}
	}
	function popUp (div) {
		return function () {
			div.style.display="block";
			console.log("popUp runs!");
		};
	}
	function popDown(div) {
		return function () {
			div.style.display="none";
			console.log("popDown runs!");
		};
	}
	dataRequest.setUrl();    //配置发出请求的url;
	ajax(dataRequest);    //用ajax发出请求;

	//-----------------------------------------------
	/*切换选项卡情况*/
	/*1. 当选中产品设计时*/
	proDesign.addEventListener("click", function() {
		proDesign.className = "selected";
		proLang.className = "";
		// dataRequest.pageNo = 1;  
		dataRequest.type = 10;    //设置10表示要proDesign
		goPage(1)();    //非常有意思的一个用法, page(1)返回一个函数以后,
		//后面再加一对括号表示调用这个函数;
	});
	/*2. 当选中编程语言时*/
	proLang.addEventListener("click", function() {
		proDesign.className = "";
		proLang.className = "selected";
		// dataRequest.pageNo = 1; 
		dataRequest.type = 20;    //设置20表示要proLang
		goPage(1)(); 
	});
	var page = document.getElementById("body-main pagination");
	var numList = page.querySelectorAll("li");
	// console.log(numList);
	/*封装一个goPage函数*/
	function goPage(i){
		return function() {
			dataRequest.pageNo = i;  //设置请求中的pageNo为想要打开的页码;
			for (var j=0; j<numList.length; j++) {
				numList[j].className = "";    //clear everyone's className;
			}
			numList[i-1].className = "selected";
			dataRequest.setUrl();
			ajax(dataRequest);
		}
	}

	/*添加鼠标点击事件, 点击页码进入相应的页面*/
	for (var i=0; i<numList.length; i++) {
		numList[i].addEventListener("click", goPage(i+1));    //服务器中也是从1~8页;
	}
	/*添加鼠标点击事件, 点击"<",">"进入前一页和后一页*/
	var prePage = document.querySelector(".body-main.pagination.prePage");
	var nextPage = document.querySelector(".body-main.pagination.nextPage");
	prePage.addEventListener("click", function() {
		console.log("prePage runs!");
		if (dataRequest.pageNo>1) {(goPage(dataRequest.pageNo-1))();}
	});
	nextPage.addEventListener("click", function() {
		console.log("nextPage runs!");
		if (dataRequest.pageNo<8) {(goPage(dataRequest.pageNo+1))();}
	});
})();