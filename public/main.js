function onload(){
    setCalander();
}
function greet(){
    //document.getElementById("welcometag").innerHTML = localStorage.getItem('username');
}
function setCalander(){
    var d = new Date();
    var months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    document.getElementById("header").innerHTML = months[d.getMonth()];
}