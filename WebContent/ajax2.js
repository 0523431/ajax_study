/*
 * 자바스크립트 => "", '' 구분안해
 * ''안에 ""문자열
 * 
 * 자바스크립트에서 객체를 생성, 이 객체가 ajax을 전달해줌
 * 콜백함수에서 ajax객체를 매개변수로 전달하는 방법	
 */

var ajax = {} // 빈 객체를 만들었어
ajax.xhr = {} // 빈 객체를 만들었어

// ajax.xhr.Request객체의 생성자를 구현
// 멤버변수 : url, params, callback, method, req
// 멤버메서드 : send, getXmlHttpRequest, onStateChange
ajax.xhr.Request = function(url, params, callback, method) {
	this.url = url;															// 멤버변수 = 지역변수	
	this.params = params;
	this.callback = callback;
	this.method = method;
	this.send(); // 호출
}

// JSON형태로 만들어짐
// prototype : 멤버를 구현한다는 뜻
ajax.xhr.Request.prototype = {		
		// 멤버메서드2
		// 브라우저에 따라 다른 ajax 객체 생성
		getXmlHttpRequest : function() {
			if(window.ActiveXObject) {
				try {
					return new ActiveXObject("Msxml2.XMLHTTP");
				} catch(e) {
					try {
						return new ActiveXObject("Microsoft.XMLHTTP");
					} catch(e2) {
						return null;
					}
				}
			} else if(window.XMLHttpRequest) {
				return new XMLHttpRequest();
			} else {
				return null;
			}
		}, // json형태니까 쉼표로 연결
		
		// 멤버메서드1 (구현)
		send : function() {
			// 위에서 만든 ajax객체를 req에 저장 => 즉, req역시 멤버변수가 됨
			this.req = this.getXmlHttpRequest();
			var httpMethod = this.method? this.method:"GET";
			if(httpMethod !="GET" && httpMethod !="POST") {
				httpMethod = "GET";
			}
			var httpParams = (this.params ==null || this.params =='')? null:this.params;
			var httpUrl = this.url;
			if(httpMethod =='GET' && httpParams !=null) {
				httpUrl = httpUrl + "?" + httpParams;
			}
			
			// ajax객체 준비
			this.req.open(httpMethod, httpUrl, true);
			// 전송을 위한 Header정보 설정
			this.req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
			// this : ajax.xhr.Request 객체를 의미함
			var request = this;
			// 콜백함수 등록
			// 상태가 변경될 때마다 자동으로 호출되는 함수
			// 상태가 변경될 때 만다 나에게(request)있는 onStateChange를 호출
			// call의 기능은 매개변수 설정이 가능
			this.req.onreadystatechange = function() {
				request.onStateChange.call(request);
			}
			// 서버로 전송
			this.req.send(httpMethod =="POST"? httpParams:null);
		},
		
		// 멤버메서드3
		// 상태가 변경이 되면 실행되는 함수 (콜백함수)
		// this.req : 내안에있는 req즉 ajax객체를 전달
		onStateChange : function() {
			this.callback(this.req);
		}
}
