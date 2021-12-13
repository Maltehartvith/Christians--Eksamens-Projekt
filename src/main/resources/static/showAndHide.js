
function showTours() {
    document.getElementById("tour-div").style.height='350px'
    document.getElementById("tours-header").innerHTML = "Tours &uarr; "
    document.getElementById("tours-header-index").onclick=hideTours
    document.getElementById("tour-content").style.display="block"
}

function hideTours(){
    document.getElementById("tour-div").style.height="120px"
    document.getElementById("tours-header").innerHTML="Tours &darr;"
    document.getElementById("tours-header-index").onclick=showTours
    document.getElementById("tour-content").style.display="none"
}

function showAttractions() {
    document.getElementById("attraction-div").style.height='350px'
    document.getElementById("attraction-header").innerHTML = "Attractions &uarr; "
    document.getElementById("attraction-header-index").onclick=hideAttractions
    document.getElementById("attraction-content").style.display="block"
}

function hideAttractions() {
    document.getElementById("attraction-div").style.height="120px"
    document.getElementById("attraction-header").innerHTML="Attractions &darr;"
    document.getElementById("attraction-header-index").onclick=showAttractions
    document.getElementById("attraction-content").style.display="none"
}
