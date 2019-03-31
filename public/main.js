/***********************************
 * Start
 **********************************/
function onload(){
    // Calander
    var date = new Date();
    setCalander(date);
    // Page interactions
    listen();
}
/***********************************
 * Calander
 **********************************/
function setCalander(date){
    // set month header
    document.getElementById("headermonth").innerHTML = getMonthstring(date.getMonth());
    document.getElementById("headeryear").innerHTML = date.getFullYear();
    // populate cal
    var table = document.getElementById("caltable");
    var wPos = 0;
    var firstday = getFirstDayOfTheMonth(date.getFullYear(), date.getMonth());
    var daysinmonth = getNumberofDaysInTheMonth(date.getFullYear(), date.getMonth())
    for (var dPos = 1; dPos < firstday + daysinmonth + 1; dPos++){
        if(wPos == 0){
            var row = table.insertRow();
        }
        var cell = row.insertCell(); 
        
        if(dPos > firstday){
                 
            cell.innerHTML = dPos - firstday +"";      
        }
        wPos++;
        if(wPos == 7){
            wPos = 0;
        }
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
/****************************************
 * Page interactions
 ***************************************/
function listen(){
    document.getElementById("mainnav1").addEventListener("click", makeaddworkoutvis);
    document.getElementById("addset").addEventListener("click", addset);
}
function makeaddworkoutvis(){
    document.getElementById("wOenter").style.display = "block";
    document.getElementById("sets").innerHTML = "# of Reps: <input type='text' placeholder='reps'>"
}
function addset(){
    document.getElementById("sets").innerHTML += "<br># of Reps: <input type='text' placeholder='reps'></input>";
    alert(document.getElementById("sets").children.length + 1);

}
/****************************************
 * Objects
 ***************************************/
function set(){
    this.reps;
}
function exercise(){
    this.sets = [];
    this.name;
}
function workout(){
    this.date;
    this.exercise = [];
}
