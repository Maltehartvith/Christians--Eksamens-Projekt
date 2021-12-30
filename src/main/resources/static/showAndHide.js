
function showTours() {
    document.getElementById("tour-div").style.height='350px'
    document.getElementById("tours-header").innerHTML = "Ture &uarr; "
    document.getElementById("tours-header-index").onclick=hideTours
    document.getElementById("tour-content").style.display="block"
}

function hideTours(){
    document.getElementById("tour-div").style.height="92px"
    document.getElementById("tours-header").innerHTML="Ture &darr;"
    document.getElementById("tours-header-index").onclick=showTours
    document.getElementById("tour-content").style.display="none"
}

function showAttractions() {
    document.getElementById("attraction-div").style.height='350px'
    document.getElementById("attraction-header").innerHTML = "Attraktioner &uarr; "
    document.getElementById("attraction-header-index").onclick=hideAttractions
    document.getElementById("attraction-content").style.display="block"
}

function hideAttractions() {
    document.getElementById("attraction-div").style.height="92px"
    document.getElementById("attraction-header").innerHTML="Attraktioner &darr;"
    document.getElementById("attraction-header-index").onclick=showAttractions
    document.getElementById("attraction-content").style.display="none"
}

function showRoutes() {
    document.getElementById("route-div").style.height='350px'
    document.getElementById("routes-header").innerHTML = "Ruter &uarr;<a id=\"question-button\">\n" +
        "                    <span class=\"d-inline-block\" tabindex=\"0\" data-bs-toggle=\"tooltip\" title=\"Her kan du lave en rute. Når du trykker på knappen,\n" +
        "så sætter du en usynlig markør, hver gang du trykker på kortet.&#10;Tryk flere gange for at lave flere punkter,&#10;og når du er tilfreds med ruten, kan du trykke på gem rute.\">\n" +
        "  <button class=\"btn btn-primary\" type=\"button\" style=\"border-radius: 20px; padding: 0px; height: 20px; width: 20px; font-size: 12px; left: 100%\" disabled>?</button>\n" +
        "</span></a></h2>"
    document.getElementById("routes-header-index").onclick=hideRoutes
    document.getElementById("route-content").style.display="block"
}

function hideRoutes() {
    document.getElementById("route-div").style.height="92px"
    document.getElementById("routes-header").innerHTML="Ruter &darr; <a id=\"question-button\">\n" +
        "                    <span class=\"d-inline-block\" tabindex=\"0\" data-bs-toggle=\"tooltip\" title=\"Her kan du lave en rute. Når du trykker på knappen,\n" +
        "så sætter du en usynlig markør, hver gang du trykker på kortet.&#10;Tryk flere gange for at lave flere punkter,&#10;og når du er tilfreds med ruten, kan du trykke på gem rute.\">\n" +
        "  <button class=\"btn btn-primary\" type=\"button\" style=\"border-radius: 20px; padding: 0px; height: 20px; width: 20px; font-size: 12px; left: 100%\" disabled>?</button>\n" +
        "</span></a></h2>"
    document.getElementById("routes-header-index").onclick=showRoutes
    document.getElementById("route-content").style.display="none"
}