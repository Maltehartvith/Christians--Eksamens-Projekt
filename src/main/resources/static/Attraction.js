//import {Modal} from "https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js";

//CONSTRUCTOR
class Attraction {
    constructor() {
        this.id;
        this.name;
        this.description;
        this.interestPoints;
        this.latitude;
        this.longtitude;
        this.timeToBoat;
    }
}

//STORE API
sessionStorage.setItem("SERVER_URL_ATTRACTION","api/attractions");
const SERVER_URL_ATTRACTIONS = sessionStorage.getItem("SERVER_URL_ATTRACTION");

    //LAVER RÆKKER MED NAVN OG ID TIL MAN SKAL TILFØJE ATTRAKTIONER TIL TURE
    function makeSelectRows(){
    const rows = localACache.getAll().map(a => `
        <label>
            <input type='checkbox' id='attraction-${a.id}' value='${a.id}'>${a.id} : ${a.name}</input>
        </label>
        <br/>
        
    `)
    document.getElementById("box-for-select").innerHTML = rows.join("")

}

    // Metode der laver rækkerne i tabellen.
    function makeAttractionRows() {
        //TIL ADMIN SIDE
        if(document.title === "Admin side"){
        const rows = localACache.getAll().map(a => `
             <tr>
               <td>${a.id}</td>
               <td>${encode(a.name)}</td>
               <td>${encode(a.description)}</td>
               <td>${encode(a.interestPoints)}</td>
               <td>${a.latitude}</td>
               <td>${a.longtitude}</td>
               <td>${a.timeToBoat}</td>
               <td><button data-id-delete=${a.id} class="btn-danger" style="color: black" href="#">Delete</td>
               <td><button data-id-edit='${a.id}' class="btn-warning" style="color: black" href="#">Edit</button> </td>
             </tr>
        `)
        document.getElementById("attraction-table-body").innerHTML = rows.join("")
        //TIL MAP SIDE
        }else if (document.title === "Map"){
            const rows = localACache.getAll().map(a => `
         <tr>
           <td><button id="attraction-info-${a.id}" onclick="resetMap()" type="button" data-id-get='${a.id}' class="btn btn-primary" data-toggle="modal" data-target="#attraction-modal-index"  style="cursor: pointer">Info</button></td>
           <td>${encode(a.name)}</td>
           <td>${encode(a.interestPoints)}</td>
           <br>
           <td>${a.timeToBoat}</td>
           
         </tr>
        `)
            document.getElementById("attraction-table-body-index").innerHTML = rows.join("")
        }
}
/*function filterTable() {

    let table = document.getElementById("tour-table-body"),
        tr = table.getElementsByTagName("tr"),
        selected = this.value;

    for (let i = 1; i < tr.length; i++) {
        let interestPoints = tr[i].cells[0].innerHTML;
        if (interestPoints) {
            tr[i].style.display=selected==="" || interestPoints.indexOf(selected) > -1 ?"":"none";
        }
    }
}*/
function filterTableA() {
    const optionValue = document.getElementById("interest-points-attraction").value
    const matches = localACache.getAll().filter(a => {
        if (a.interestPoints === optionValue) {
            return true
        } else {
            return false
        }
    })
    const row = matches.map(m => `
        <tr> 
        <td><button id="attraction-info" type="button" data-id-get='${m.id}' class="btn btn-primary" 
         data-toggle="modal" data-target="#attraction-modal-index"  style="cursor: pointer">Info</button></td>
           <td>${encode(m.name)}</td>
           <td>${encode(m.interestPoints)}</td>
           <td>${m.timeToBoat}</td>
          
         </tr>
        `)
    document.getElementById("attraction-table-body-index").innerHTML = row.join("")
}

    //METODE OVER LOCAL CACHE - INDEHOLDER FORSKELLIGE METODER
    function localAttractionCache(){
    let attractionData = []
    const addEdit = (attraction,method) =>{
        if(method==="POST"){
            attractionData.push(attraction)
        }
        else if(method==="PUT") {
            attractionData = attractionData.map(a => a.id == attraction.id ? attraction: a)
        }
    }
    return {
        getAll : () => attractionData , //This is the same as above
        addAll : (all) => attractionData = all,
        deleteOne: (id) => attractionData = attractionData.filter(a => a.id !== Number(id)),
        findById : (id) => attractionData.find(a => a.id == id),
        addEdit :addEdit
    }
}
    //SETUP-HANDLERS
    function setUpHandlersAttraction() {
        //TIL ADMIN SIDE
    if (document.title === "Admin side"){
        document.getElementById("attraction-table-body").onclick = handleTableClickAttraction
        if (document.getElementById("btn-save-attraction") !== null)
            document.getElementById("btn-save-attraction").onclick = saveAttraction
        if (document.getElementById("btn-add-attraction") !== null)
            document.getElementById("btn-add-attraction").onclick = makeNewAttraction
    //TIL MAP SIDE
    }else if(document.title === "Map"){
            document.getElementById("attraction-table-body-index").onclick = handleTableClickAttraction
            if(document.getElementById("lego") !== null){
                document.getElementById("lego").onclick = showAttractionModal
            }if(document.getElementById("interest-points-attraction") !== null) {
            document.getElementById("interest-points-attraction").onchange = filterTableA
            }
        }
    }
setUpHandlersAttraction()

//CLICK HANDLERS
function handleTableClickAttraction(evt) {
    console.log("Her er vi nu")
    evt.preventDefault()
    evt.stopPropagation()
    const target = evt.target;
    //data-id-delete
    if (target.dataset.idDelete) {
        const idToDelete = Number(target.dataset.idDelete)
        const options = {
            method: "DELETE",
            headers: {'Accept': 'application/json'},
        }
        fetch(SERVER_URL_ATTRACTIONS + "/" + idToDelete, options)
            .then(res => {
                if (res.ok) {
                    localACache.deleteOne(idToDelete)
                    console.log(idToDelete)
                    makeAttractionRows()
                    localACache.getAll().forEach(a=>attractionToMarker(a))
                }
            })
    }
    //EDIT
    if (target.dataset.idEdit) {
        const idToEdit = Number(target.dataset.idEdit)
        const attraction = localACache.findById(idToEdit)
        showAttractionModal(attraction)
    }
    //GET
    if (target.dataset.idGet){
        const idToShow = Number(target.dataset.idGet)
        const attraction = localACache.findById(idToShow)
        showAttractionModal(attraction)
    }
}

    //TOM MODAL TIL AT LAVE NY ATTRACTION
function makeNewAttraction() {
    showAttractionModal({
        id: null,
        name: "",
        description: "",
        interestPoints: "",
        latitude: "",
        longtitude: "",
        timeToBoat: ""

    })
}
//SHOW EKSISTERENDE MODAL
function showAttractionModal(attraction) {
    //TIL ADMIN SIDE
    if (document.title === "Admin side"){
        const myModal = new bootstrap.Modal(document.getElementById('attraction-modal'))
        document.getElementById("modal-title-attraction").innerText = attraction.id ? "Edit Attraction" : "Add Attraction"
        document.getElementById("attraction-id-a").innerText = attraction.id
        document.getElementById("input-name-a").value = attraction.name
        document.getElementById("input-description-a").value = attraction.description
        document.getElementById("input-interestPoints-a").value = attraction.interestPoints
        document.getElementById("input-latitude-a").value = attraction.latitude
        document.getElementById("input-longtitude-a").value = attraction.longtitude
        document.getElementById("input-timeToBoat-a").value = attraction.timeToBoat
        myModal.show()
        //TIL MAP SIDE
    }if (document.title === "Map"){
        const myModal = new bootstrap.Modal(document.getElementById('attraction-modal-index'))
        //const myModal = new Modal(document.getElementById('attraction-modal-index'))
        const beskrivelse = "Beskrivelse: <br>"
        const interessePoint = "Interesse punkter: "
        const est = "Estimeret tid det tager <br> at gå til båden: "
        document.getElementById("attraction-name").innerHTML = attraction.name
        document.getElementById("attraction-description").innerHTML = beskrivelse + attraction.description + "<br>"
        document.getElementById("attraction-interestPoints").innerHTML = interessePoint + attraction.interestPoints + "<br>"
        attractionOnMap(attraction)
        document.getElementById("attraction-timeToBoat").innerHTML = est + attraction.timeToBoat + " min"
        document.getElementById("attraction-image").innerHTML = attraction.imagefilename?`<br><img src="images/${attraction.imagefilename}" width="300px"/>`:"(intet billede)"
        document.getElementById("attraction-sound").innerHTML = attraction.soundfilename?`<br><audio controls>
				<source src="sounds/${attraction.soundfilename}" type="audio/mpeg">
			</audio>`:"(ingen lyd)"
        myModal.show()
    }
}

function attractionOnMap(a){
    let latLng = new L.LatLng(a.latitude, a.longtitude)

    modalMarker.setLatLng(latLng)

    modalMap.setView([a.latitude, a.longtitude])

    //modalMap.panTo([a.latitude, a.longtitude])

}

//GEM ATTRAKTION ALT EFTER OM DET ER EDIT ELLER SAVE
function saveAttraction() {
    const attraction = {}
    attraction.id = Number(document.getElementById("attraction-id-a").innerText)
    attraction.name = document.getElementById("input-name-a").value
    attraction.description = document.getElementById("input-description-a").value
    attraction.interestPoints = document.getElementById("input-interestPoints-a").value
    attraction.latitude = document.getElementById("input-latitude-a").value
    attraction.longtitude = document.getElementById("input-longtitude-a").value
    attraction.timeToBoat = document.getElementById("input-timeToBoat-a").value

    const method = attraction.id ? "PUT" : "POST"
    const url = (method === "PUT") ? SERVER_URL_ATTRACTIONS+"/"+attraction.id : SERVER_URL_ATTRACTIONS
    const options = {
        method: method,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(attraction)
    }
    fetch(url,options)
        .then(res=>{
            if(!res.ok){
                throw "Something went wrong. Probably bad input type"
            }
            return res.json()
        })
        .then(attraction=>{
            localACache.addEdit(attraction,method)
            makeAttractionRows()
            window.location.replace("admin.html")
        })
        .catch(e=>alert(e))
}
//FETCH ATTRACTION
function fetchAttraction() {
    fetch(SERVER_URL_ATTRACTIONS)
        .then(res => res.json())
        .then(data=> {
            localACache.addAll(data)
            makeAttractionRows()
            localACache.getAll().forEach(a => attractionToMarker(a))
        })
}

const localACache = localAttractionCache()
fetchAttraction()


/*function encode(str) {
    str = ""+str
    str = str.replace(/&/g, "&amp;");
    str = str.replace(/>/g, "&gt;");
    str = str.replace(/</g, "&lt;");
    str = str.replace(/"/g, "&quot;");
    str = str.replace(/'/g, "&#039;");
    return str;
}*/


