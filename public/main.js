function onload(){
    alert(localStorage.getItem("results"));
    greet();
}
function greet(){
    document.getElementById("welcometag").innerHTML = localStorage.getItem("results");
}