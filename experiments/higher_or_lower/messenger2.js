$(document).ready(function(){
	var log = [];
	var msg = "";
	var domp = "";
	var inp = "";
	var num = 0;
	var counter = 0;
	
	var secret_number = Math.floor(Math.random()*999)+1;
	$("#send").click(function(){
		inp = $('#message').val();
		num = parseInt(inp,10); 
		if (num > secret_number) {
			msg = "lower";
		} else if (num < secret_number) {
			msg = "higher";
		} else if (num == secret_number) {
			msg = "well done, that was correct";
		}
		log.push(msg);
		domp = "<p>".concat(msg,"</p>");
		console.log(domp);
		console.log(log);
		$("#messages").prepend(domp);
    });
	


});