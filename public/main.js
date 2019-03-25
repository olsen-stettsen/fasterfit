function onload(){
    greet();
}
function greet(){
    document.getElementById("welcometag").innerHTML = localStorage.getItem('username');
}