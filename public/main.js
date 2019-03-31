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
    for (var dPos = 1; dPos < getNumberofDaysInTheMonth(date.getFullYear(), date.getMonth()); dPos++){
        if(wPos == 0){
            var row = table.insertRow();
        }
        if(dPos >= getFirstDayOfTheMonth(date.getFullYear(), date.getMonth())){
            var cell = row.insertCell(wPos);      
            cell.innerHTML = dPos +"";      
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