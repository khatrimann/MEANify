$(document).ready(function() {
  $.ajax({
    url: "http://localhost:3000/questions",
    success: function(data){
      console.log(data)
    }
  });
});