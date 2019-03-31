function onload(){
    var date = new Date();
    setCalander(date);
}
function greet(){
    //document.getElementById("welcometag").innerHTML = localStorage.getItem('username');
}
function setCalander(date){
    // set month header
    document.getElementById("header").innerHTML = getMonthstring(date.getMonth());
    // populate cal
    var table = document.getElementById("caltable");
    var wPos = 0;
    for (var weeks = 0; weeks < getNumberofDaysInTheMonth(date.getFullYear(), date.getMonth()) / 7; weeks++) {
        for (var dPos = 1; dPos < getNumberofDaysInTheMonth(); dPos++) {
            if (dPos >= getFirstDayOfTheMonth(date.getFullYear(), date.getMonth())) {

            }
        }
        alert(weeks);
    }
}
function getNumberofDaysInTheMonth(year, month){
    return new Date(year, month + 1, 0).getDate();
}
function getFirstDayOfTheMonth(year, month){
    return new Date(year, month, 1).getDay();
}
function getMonthstring(index){
    var months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    return months[index];
}