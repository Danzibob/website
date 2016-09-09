$(document).ready(function(){
        $("#button1").click(function(){
            var naMe = prompt("Enter name");
            $("#name").text(naMe);
    });
	$("#button2").click(function(){
            var daTe = prompt("Enter expiry date");
            $("#date").text(daTe);
    });
	$("#button3").click(function(){
	    var Email = prompt("Enter email address");
            $("#email").text(Email);
    });
	$("#button4").click(function(){
            $("#button1").hide();
	    $("#button2").hide();
	    $("#button3").hide();
	    $("#button4").hide();
    });
});