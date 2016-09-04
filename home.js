$( ".a" ).click(function() {
  console.log("clicked");
  var a = Array.apply(null, Array(5)).map(function (_, i) {return i;});
  for (var item in a) {
    window.open("http://www.w3schools.com");
  }
});