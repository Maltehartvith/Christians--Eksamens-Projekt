/*class Tour{
    constructor() {
        this.id;
        this.name;
        this.description;
        this.maxMembers;
        this.duration;
        this.attractions = [];
    }
}*/

sessionStorage.setItem("SERVER_URL_TOURS","api/tours");
const SERVER_URL_TOURS = sessionStorage.getItem("SERVER_URL_TOURS");



function makeTourRows() {
    const rows = localTCache.getAll().map(u => `
         <tr>
           <td>${u.id}</td>
           <td>${encode(u.name)}</td>
           <td>${encode(u.description)}</td>
           <td>${u.maxMembers}</td>
           <td>${u.duration}</td>
           <td><button data-id-delete=${u.id} class="btn-danger" style="color: black" href="#">Delete</td>
            <td><button data-id-edit='${u.id}' class="btn-warning" style="color: black" href="#">Edit</button> </td>
         </tr>
        `)
    document.getElementById("tour-table-body").innerHTML = rows.join("")
}

function localTourCache(){
    let tourData = []
    const addEdit = (tour,method) =>{
        if(method==="POST"){
            tourData.push(tour)
        }
        else if(method==="PUT") {
            tourData = tourData.map(u => u.id == tour.id ? tour: u)
        }
    }

    return {
        getAll : () => tourData , //This is the same as above
        addAll : (all) => tourData = all,
        deleteOne: (id) => tourData = tourData.filter(u => u.id !== Number(id)),
        findById : (id) => tourData.find(u => u.id == id),
        addEdit :addEdit
    }
}


function setUpHandlersTour(){

    document.getElementById("tour-table-body").onclick = handleTableClickTour
    if (document.getElementById("btn-save-tour") !== null) {
        document.getElementById("btn-save-tour").onclick = saveTour
    }if (document.getElementById("btn-add-tour") !== null) {
        document.getElementById("btn-add-tour").onclick = makeNewTour
    }
}


setUpHandlersTour()

function handleTableClickTour(evt) {
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

        fetch(SERVER_URL_TOURS+"/"+idToDelete,options)
            .then(res=>{if(res.ok){
                localTCache.deleteOne(idToDelete)
                console.log(idToDelete)
                makeTourRows()
            }
            })
    }
    //Observe change compared to video
    if (target.dataset.idEdit) {
        const idToEdit = Number(target.dataset.idEdit)
        const tour = localTCache.findById(idToEdit)
        showTourModal(tour)
    }

}

function makeNewTour() {
    showTourModal({
        id: null,
        name: "",
        description: "",
        maxMembers: "",
        duration: "",
        attraction: []
    })
}

function showTourModal(tour) {
    const myModal = new bootstrap.Modal(document.getElementById('tour-modal'))
    document.getElementById("modal-title-tour").innerText = tour.id ? "Edit Tour" : "Add Tour"
    document.getElementById("tour-id-t").innerText = tour.id
    document.getElementById("input-name-t").value = tour.name
    document.getElementById("input-description-t").value = tour.description
    document.getElementById("input-maxMembers-t").value = tour.maxMembers
    document.getElementById("input-duration-t").value = tour.duration
    makeSelectRows()
    if(document.getElementById("modal-title-tour").innerText === "Edit Tour") {
        makeRowsSetSelected(tour)
    }
    myModal.show()
}
    function makeRowsSetSelected(tour){
         for (let i = 0, iLen= tour.attractions.length; i < iLen; i++){
             let aID = tour.attractions[i].id
             document.getElementById("attraction-"+aID).selected = true
         }
    }

function saveTour() {
    const tour = {}
    tour.id = Number(document.getElementById("tour-id-t").innerText)
    tour.name = document.getElementById("input-name-t").value
    tour.description = document.getElementById("input-description-t").value
    tour.maxMembers = document.getElementById("input-maxMembers-t").value
    tour.duration = document.getElementById("input-duration-t").value
    tour.attractions = []

    const select = Array.from(document.getElementById("input-attraction-t").options).filter(option => option.selected).map(option => option.value);
    for(let i = 0, iLen = select.length; i<iLen; i++){
        tour.attractions.push(localACache.findById(select[i]))
    }

    /*console.log(document.getElementById("input-attraction-t").value)
    tour.attractions.push(localACache.findById(document.getElementById("input-attraction-t").value))
    console.log(tour)*/
    /* Lav et Array og tilføj de rigtige Attractions HER*/

    const method = tour.id ? "PUT" : "POST"
    const url = (method === "PUT") ? SERVER_URL_TOURS+"/"+tour.id : SERVER_URL_TOURS
    const options = {
        method: method,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(tour)
    }
    fetch(url,options)
        .then(res=>{
            if(!res.ok){
                throw "Something went wrong"
            }
            return res.json()
        })
        .then(tour=>{
            localTCache.addEdit(tour,method)
            makeTourRows()
            window.location.replace("test.html")
        })
        .catch(e=>alert(e))
}


function fetchTour() {
    fetch(SERVER_URL_TOURS)
        .then(res => res.json())
        .then(data=> {
            localTCache.addAll(data)
            makeTourRows()
        })
}

const localTCache = localTourCache();
fetchTour()



function encode(str) {
    str = ""+str
    str = str.replace(/&/g, "&amp;");
    str = str.replace(/>/g, "&gt;");
    str = str.replace(/</g, "&lt;");
    str = str.replace(/"/g, "&quot;");
    str = str.replace(/'/g, "&#039;");
    return str;
}