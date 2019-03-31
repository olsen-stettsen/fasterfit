function onload(){
    setCalander();
}
function greet(){
    //document.getElementById("welcometag").innerHTML = localStorage.getItem('username');
}
function setCalander(){
    // set month
    var d = new Date();
    var months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    document.getElementById("header").innerHTML = months[d.getMonth()];
    // populate cal
    var activedate = d.getDate();
    var numDays = new Date(d.getFullYear(), d.getMonth() +1, 0).getDate();
    alert(numDays);
}