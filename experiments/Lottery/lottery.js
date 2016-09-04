var getRandom = function(maxi){
	var r = Math.random()*maxi;
	r = Math.ceil(r);
	return r;
}
var lotterySet = function(len,maxi){
	lottery = [];
	for (i = 0; i < len; i++) { 
		lottery.push(getRandom(maxi));
	}
        lottery.sort();
	return lottery;
}
var go = function(){
        setLength = prompt("Enter the length of the set")
        maxVal = prompt("Enter the maximum value")
	$('#lotteryDisplayTitle').text("Click to run");
	userSet = lotterySet(setLength, maxVal);
	$('#userDisplay').text(userSet);
}
var mainLoop = function(){
	var i = 0;
	var count = -1;
	while(i.toString() != userSet.toString()){
		i = lotterySet(setLength, maxVal);
		count++;
	$('#lotteryDisplayTitle').text("Done! Took this many tries:");
	$('#lotteryDisplay').text(count);
	}
}
$(document).ready(go);
$('*').click(mainLoop);