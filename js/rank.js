(function(){
	var ul = document.getElementById("rankList");
	var timer = null;
	var dataRequest = {
		requestType: "get",
		asyn: true,
		url: "http://study.163.com/webDev/hotcouresByCategory.htm"
	}
	dataRequest.success = function(dataRequest) {
		var d = JSON.parse(dataRequest);   //d需要转换成数组才能在程序中使用;
		newUl();
		timer = setInterval(newUl, 5000);
		function newUl() {
			ul.innerHTML = "";
			for (var i=0; i<10; i++) {
				var li = document.createElement("li");
				/* example
				<li>
					<a href="">
						<img src="img/cards/ranksample.png">
						<div>
							<h4>R语言快速入门</h4>
							<div>
								<i></i>
								<span>326</span>
							</div>
						</div>
					</a>
					</li>
				*/
				li.innerHTML = "<a href=''><img src='"+d[i].smallPhotoUrl+"'>"+
							   "<div><h4>"+d[i].name+"</h4>"+
							   "<div><i></i><span>&nbsp;"+d[i].learnerCount+"</span>"+
							   "</div></a>";
				ul.appendChild(li);
			}
			d.push(d.shift());    //???把头部的去掉,返回修改后的数组,然后在新数组尾部加一个新的;
		}
	}
	ajax(dataRequest);
})();