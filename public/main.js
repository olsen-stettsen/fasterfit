function onload(){
    greet();
}
function greet(){
    var un = "Main.js localstorage username" + localStorage.getItem('username');
    console.log(un);
    //document.getElementById("welcometag").innerHTML = localStorage.getItem('username');
}