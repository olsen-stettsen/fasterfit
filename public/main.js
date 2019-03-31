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