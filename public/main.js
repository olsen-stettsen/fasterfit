function onload(){
    var un = "Main.js localstorage username" + localStorage.getItem('username');
    console.log(un);
    greet();
}
function greet(){
    //document.getElementById("welcometag").innerHTML = localStorage.getItem('username');
}