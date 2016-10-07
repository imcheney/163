/*获取cookie并转化成对象*/
// function getCookie() {
// 	var cookie = {};
// 	var all = document.cookie;
// 	if (all === "") {return cookie;}
// 	var list = all.split("; ");    //此处分号后面是有一个空格的;
// 	for (var i=0; i<list.length; i++) {
// 		var item = list[i];
// 		var p = item.indexof("=");
// 		var name = item.substring(0,p);    //拆分出name;
// 		name = decodeURIComponent(name);
// 		var value = item.substring(p+1);
// 		value = decodeURIComponent(value);
// 		cookie[name] = value;
// 	}
// 	return cookie;
// }

/*按照给定的name去获取相应的cookie*/
function getCookie(name) {
	var encodedName = encodeURIComponent(name) + "=";
	var startIndex = document.cookie.indexOf(encodedName);
	var value = null;    //最后返回值是decoded的!
	if (startIndex>-1) {
		var endIndex = document.cookie.indexOf(";");
		if (endIndex==-1) {endIndex = document.cookie.length;}
		value = decodeURIComponent(document.cookie.substring(startIndex+encodedName.length, endIndex));
	}   //value要decode操作才能用;
	return value;
}
/*设置cookie, 等价于addCookie*/
function setCookie(name, value, expires, path, domain, secure) {
	var cookie = encodeURIComponent(name)+"="+encodeURIComponent(value);
	if (expires) {cookie += "; expires="+expires.toUTCString();}
	if (path) {cookie += "; path="+path;}
	if (domain) {cookie += "; domain="+domain;}
	// if (secure) {cookie += "; secure="+secure;}    //???此处可能存在坑;
	document.cookie = cookie;    //基本上等于加了一个新的cookie;
	console.log(cookie);
}

/*删除cookie中某个key下的内容, 并且让*/
function removeCookie(name) {
	document.cookie = name+"=; max-age=0";    //???存在不确定性;
}