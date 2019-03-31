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
    alert(getNumberofDaysInTheMonth(d.getFullYear(), d.getMonth() + 1));
    alert(getFirstDayOfTheMonth(d.getFullYear(), d.getMonth() + 1));

}
function getNumberofDaysInTheMonth(year, month){
    return new Date(year, month, 0).getDate();
}
function getFirstDayOfTheMonth(year, month){
    return new Date(year, month, 1).getDay();
}