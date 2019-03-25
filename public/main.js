function onload(){
    greet();
}
function greet(){
    console.log("Main.js localstorage username" + localStorage.getItem('username'));
    //document.getElementById("welcometag").innerHTML = localStorage.getItem('username');
}