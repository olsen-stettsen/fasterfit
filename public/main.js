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

    //set month for WO data
    localStorage.setItem("month", date.getMonth() + 1);
    
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
        cell.setAttribute("class", "calcell");     
        if(dPos > firstday){
            var numy = dPos - firstday;
            if (workoutdataonthisday(dPos - 1, date.getMonth() + 1)){
                cell.innerHTML = "<button onclick='calbtn(this)' class='calbtn hasdata'>" + numy + "</button>";
            }
            else{
                cell.innerHTML = "<button onclick='calbtn(this)' class='calbtn'>" + numy + "</button>";
            }
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
            document.getElementById("sets").innerHTML = "<input type='number' placeholder='Weight'></input><input type='number' placeholder='Reps'></input>";
        }
    }    
}
function cancelexercise(){
    document.getElementById("sets").innerHTML = "";
    toggleaddworkoutvis();
}
function addset(){
    var setfield = document.getElementById("sets");
    var w = document.createElement("INPUT");
    var x = document.createElement("INPUT");
    var y = document.createElement("BR"); 
    w.setAttribute("type", "number");
    x.setAttribute("type", "number");
    w.setAttribute("placeholder", "Weight");
    x.setAttribute("placeholder", "Reps");
    setfield.appendChild(y);
    setfield.appendChild(w);
    setfield.appendChild(x);
}
function enterexercise(){
    var d = new Date();
    var exercise = new Exercise();
    exercise.name = document.getElementById("exercisename").value;
    var setsposition = 0;
    for (var pos = 0; pos < document.getElementById("sets").children.length; pos += 3){
        var pair = document.getElementById("sets").children[pos].value + "," + document.getElementById("sets").children[pos + 1].value
        exercise.sets[setsposition] = pair;
        setsposition++;
    }
    exercise.year = d.getFullYear();
    exercise.month = d.getMonth() + 1;
    exercise.day = d.getDate();
    exercise.hour = d.getHours();
    exercise.minutes = d.getMinutes();
    postexercise(JSON.stringify(exercise));
    cancelexercise();
}
function postexercise(exercise){
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", "/writeworkout", true);
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            //alert(this.responseText)
        }
    };
    xmlhttp.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    xmlhttp.send(exercise);

}
function workoutdataonthisday(day, month){
    var thereis = false;
    var workoutdata = document.getElementById("workoutdata").innerHTML;
    var workouts = JSON.parse(workoutdata);
    for (var count = 0; count < workouts.length; count++){
        if(JSON.parse(workouts[count].sets_reps_json).month == month
        && JSON.parse(workouts[count].sets_reps_json).day == day){
            thereis = true;
        }
    }
    return thereis;
}
/*****************************
 * Set the Workout data field
 ****************************/
function calbtn(e){
    var day = e.innerHTML;
    var month = localStorage.getItem("month");
    var workouts = JSON.parse(document.getElementById("workoutdata").innerHTML);
    var workoutsection = document.getElementById("dayworkouts");
    var wDisplay = "";
    for (var count = 0; count < workouts.length; count++){
        if(JSON.parse(workouts[count].sets_reps_json).month == month
        && JSON.parse(workouts[count].sets_reps_json).day == day){
            //wDisplay += workouts[count].sets_reps_json + "<br>";
            var wd = JSON.parse(workouts[count].sets_reps_json);
            wDisplay += wd.name + "<br>";
            var setz = wd.sets;
            for(var i = 0; i < setz.length; i++){
                var weightz = setz[i].split(",");
                wDisplay += "Weight: " + weightz[0] + " Reps: " + weightz[1] + "<br>";
            }

        }
    }  
    workoutsection.innerHTML = wDisplay;
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
//