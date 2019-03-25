function onload(){
    greet();
}
function greet(){
    alert(localStorage.getItem('username'));
    //document.getElementById("welcometag").innerHTML = localStorage.getItem('username');
}