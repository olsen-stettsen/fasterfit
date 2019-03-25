function onload(){
    greet();
}
function greet(){
    document.getElementById("welcometag").innerHTML = JSON.parse(localStorage.getItem("results")).user_name;
}