/*
 * 이 파일의 역할은 ajax 환경 설정
 */

var ajax = null;

/* <ajax = getAjaxObject(); 호출됨>
 * ajax 객체 생성 기능을 담당하는데, 브라우저에 따라 달라져서 이렇게 길어짐
 * 표준 객체 이름 : XMLHttpRequest 객체
 */
function getAjaxObject() {
	if(window.ActiveXObject) { // 현재 브라우저가 익스플로러야?
		try {
			return new ActiveXObject("Msxml2.XMLHTTP"); // MS객체 만들기1
		} catch(e) {
			try {
				return new ActiveXObject("Microsoft.XMLHTTP"); //MS객체 만들기2
			} catch(e2) {
				return null;
			}
		}
	} else if(window.XMLHttpRequest) { // 현재 브라우저가 익스플로러가 아닌 이외의 브라우저
		return new XMLHttpRequest(); // 객체 만들기(대부분의 브라우저)
	} else {
		return null;
	}
}
 
/* <hello.html에서 호출된 함수>
 * url : "hello.jsp"
 * params : "name="+document.f.name.value || "name"+내가 쓴 내용
 * callback : helloFromServer
 * method : "POST"
 */
function sendRequest(url, params, callback, method) {
	// ajax : XMLHttpRequest 객체를 저장
	//        ajax을 실행하는 객체
	//        서버와 통신할 수 있는 객체
	ajax = getAjaxObject();
	
	/* httpMethod는 둘 중 하나의 값만 가질 수 있음
	 * - GET || POST
	 */
	var httpMethod = method? method:"GET";
	if(httpMethod != "GET" && httpMethod != "POST") {
		httpMethod = "GET";
	}
	// 지금 null이 아니니까, httpParams는 name="빙봉"이 됨
	var httpParams = (params ==null || params =='')? null:params;
	var httpUrl = url;
	// GET방식인 경우
	// httpUrl=hello.jsp?name=빙봉
	// POST방식인 경우 (지금)
	// httpUrl=hello.jsp
	if(httpMethod == "GET" && httpParams !=null) {
		httpUrl = httpUrl + "?" + httpParams;
	}
	
	/* <ajax객체를 open : 준비하기>
	 * httpUrl : post get방식에 따라 다름
	 * true : 비동기 방식
	 */
	ajax.open(httpMethod, httpUrl, true);
	
	// 요청하기 위한 환경설정의 헤더값
	// "application/x-www-form-urlencoded" 기본 설정값
	// 업로드 파일이 있다면, multipart-form-data
	ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	
	// 콜백함수 등록
	// 콜백함수는 ajax 객체의 상태가 변경될 때마다 호출되는 함수
	// callback : helloFromServer가 바뀔 때 마다 호출?
	ajax.onreadystatechange = callback;
	
	// 서버에 요청
	// post방식 get방식에 따라 다름
	ajax.send(httpMethod =="POST"? httpParams:null);
}
