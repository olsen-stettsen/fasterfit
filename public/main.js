function onload(){
    alert(localStorage.getItem("username"));
    greet();
}
function greet(){
    document.getElementById("welcometag").innerHTML = localStorage.getItem("results");
}