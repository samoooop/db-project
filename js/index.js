// $.ajax({
//     dataType: "jsonp",
//     jsonp: false,
//     url: "http://127.0.0.1:3000/json",
//     data: data,
//     success: function() {
//         console.log("yay");
//     },
//     error: function(err) {
//         console.log("fuc12k")
//     },
// });

$.getJSON("http://127.0.0.1:3000/json", function(data) {
    console.log(data.name);
});