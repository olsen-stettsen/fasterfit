/***********************************
 * Start
 **********************************/
function onload(){
    // Calander
    var date = new Date();
    setCalander(date);
    // Page interactions
    listen();
    getdbfromhtml();
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
    document.getElementById("mainnav1").addEventListener("click", toggleaddworkoutvis);
    document.getElementById("addset").addEventListener("click", addset);
    document.getElementById("wOback").addEventListener("click", toggleaddworkoutvis);
    document.getElementById("wOcancel").addEventListener("click", cancelexercise);
    document.getElementById("submitexercise").addEventListener("click", enterexercise);
}
function toggleaddworkoutvis(){
    if(document.getElementById("wOenter").style.display == "block"){
        document.getElementById("wOenter").style.display = "none";
    }
    else{
        document.getElementById("wOenter").style.display = "block";
        if (document.getElementById("sets").children.length == 0){
            document.getElementById("sets").innerHTML = "# of Reps: <input type='text' placeholder='reps'></input>";
        }
    }    
}
function cancelexercise(){
    document.getElementById("sets").innerHTML = "";
    toggleaddworkoutvis();
}
function addset(){
    document.getElementById("sets").innerHTML += "<br># of Reps: <input type='text' placeholder='reps'></input>";
    //alert(document.getElementById("sets").children.length);
}
function enterexercise(){
    var d = new Date();
    var exercise = new Exercise();
    exercise.name = document.getElementById("exercisename").value;
    var setsposition = 0;
    for (var pos = 0; pos < document.getElementById("sets").children.length; pos += 2){
        exercise.sets[setsposition] = document.getElementById("sets").children[pos].value;
        setsposition++;
    }
    exercise.year = d.getFullYear();
    exercise.month = d.getMonth() + 1;
    exercise.day = d.getDate();
    exercise.hour = d.getHours();
    exercise.minutes = d.getMinutes();
    postexercise(exercise);
}
function postexercise(exercise){
    var data = JSON.stringify({
        body: exercise
    })
    alert(JSON.stringify(body));
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            //alert(this.responseText)
        }
    };
    xmlhttp.open("POST", "/writeworkout", true);
    xmlhttp.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    xmlhttp.send(data);

}
function getdbfromhtml(){
    //alert(document.getElementById("workoutdata").innerHTML);
}
/****************************************
 * Objects
 ***************************************/
function Exercise(){
    this.sets = [];
    this.name;
    this.year;
    this.month;
    this.day;
    this.hour;
    this.minutes;

}
function Workouts(){
    this.exercise = [];
}
