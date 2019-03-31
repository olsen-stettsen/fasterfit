function onload(){
    var date = new Date();
    setCalander(date);
}
function greet(){
    //document.getElementById("welcometag").innerHTML = localStorage.getItem('username');
}
function setCalander(date){
    // set month
    var months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    document.getElementById("header").innerHTML = months[d.getMonth()];
    // populate cal
    var activedate = date.getDate();
    alert(getNumberofDaysInTheMonth(date.getFullYear(), date.getMonth()));
    alert(getFirstDayOfTheMonth(date.getFullYear(), date.getMonth()));

}
function getNumberofDaysInTheMonth(year, month){
    return new Date(year, month + 1, 0).getDate();
}
function getFirstDayOfTheMonth(year, month){
    return new Date(year, month, 1).getDay();
}