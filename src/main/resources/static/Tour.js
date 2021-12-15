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
    if (document.title === "Admin side"){
        const rows = localTCache.getAll().map(t => `
         <tr>
           <td>${t.id}</td>
           <td>${encode(t.name)}</td>
           <td>${encode(t.description)}</td>
           <td>${t.maxMembers}</td>
           <td>${t.duration}</td>
           <td><button data-id-delete=${t.id} class="btn-danger" style="color: black" href="#">Delete</td>
           <td><button data-id-edit='${t.id}' class="btn-warning" style="color: black" href="#">Edit</button> </td>
         </tr>
        `)
    document.getElementById("tour-table-body").innerHTML = rows.join("")
    }if (document.title === "Map"){
        const rows = localTCache.getAll().map(t => `
         <tr>
         <td><button id="tour-info" type="button" data-id-get='${t.id}' class="btn btn-primary" 
         data-toggle="modal" data-target="#attraction-modal-index"  style="cursor: pointer">Info</button></td>
           <td>${encode(t.name)}</td>
           <td>${encode(t.description)}</td>
           <td>${t.maxMembers}</td>
           <td>${t.duration}</td>
         </tr>
        `)
        document.getElementById("tour-table-body").innerHTML =  rows.join("")
    }
}
    function filterTable() {
    const optionValue = document.getElementById("interestPoints").value
    const matches = localTCache.getAll().filter(t => {
        for (let i = 0; i < t.attractions.length; i++) {
            if (t.attractions[i].interestPoints === optionValue) {
                return true
            }
        }
        return false
    })
    const row = matches.map(m => `
        <tr> 
        <td><button id="tour-info" type="button" data-id-get='${m.id}' class="btn btn-primary" 
         data-toggle="modal" data-target="#attraction-modal-index"  style="cursor: pointer">Info</button></td>
           <td>${encode(m.name)}</td>
           <td>${encode(m.description)}</td>
           <td>${m.maxMembers}</td>
           <td>${m.duration}</td>
         </tr>
        `)
    document.getElementById("tour-table-body").innerHTML = row.join("")
    }

    function localTourCache(){
    let tourData = []
    const addEdit = (tour,method) =>{
        if(method==="POST"){
            tourData.push(tour)
        }
        else if(method==="PUT") {
            tourData = tourData.map(t => t.id == tour.id ? tour: t)
        }
    }

    return {
        getAll : () => tourData , //This is the same as above
        addAll : (all) => tourData = all,
        deleteOne: (id) => tourData = tourData.filter(t => t.id !== Number(id)),
        findById : (id) => tourData.find(t => t.id == id),
        addEdit :addEdit
    }
}


    function setUpHandlersTour() {
    if(document.title === "Admin side")
        document.getElementById("tour-table-body").onclick = handleTableClickTour
        if (document.getElementById("btn-save-tour") !== null) {
            document.getElementById("btn-save-tour").onclick = saveTour
        }if (document.getElementById("btn-add-tour") !== null) {
            document.getElementById("btn-add-tour").onclick = makeNewTour
        }
    if(document.title === "Map"){
        document.getElementById("tour-table-body").onclick = handleTableClickTour
        if(document.getElementById("tour-info") !== null){
            document.getElementById("tour-info").onclick = showTourModal
        }if(document.getElementById("interestPoints") !== null) {
            document.getElementById("interestPoints").onchange = filterTable
        }
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
    //GET
    if (target.dataset.idGet){
        const idToShow = Number(target.dataset.idGet)
        const tour = localTCache.findById(idToShow)
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
    if(document.title === "Admin side") {
        const myModal = new bootstrap.Modal(document.getElementById('tour-modal'))
        document.getElementById("modal-title-tour").innerText = tour.id ? "Edit Tour" : "Add Tour"
        document.getElementById("tour-id-t").innerText = tour.id
        document.getElementById("input-name-t").value = tour.name
        document.getElementById("input-description-t").value = tour.description
        document.getElementById("input-maxMembers-t").value = tour.maxMembers
        document.getElementById("input-duration-t").value = tour.duration
        makeSelectRows()
        if (document.getElementById("modal-title-tour").innerText === "Edit Tour") {
            makeRowsSetSelected(tour)
        }
        myModal.show()
    }else if (document.title === "Map"){
        const myModal = new bootstrap.Modal(document.getElementById('attraction-modal-index'))

        const beskrivelse = "Beskrivelse: <br>"
        const maxMembers = "Max deltagere: <br>"
        const duration = "Turen varer : <br>"
        document.getElementById("attraction-name").innerHTML = tour.name
        document.getElementById("attraction-description").innerHTML = beskrivelse + tour.description + "<br>"
        document.getElementById("attraction-interestPoints").innerHTML = maxMembers + tour.maxMembers + "<br>"
        //document.getElementById("attraction-map").innerHTML = tour.duration + "<br>"
        document.getElementById("attraction-timeToBoat").innerHTML = duration + tour.duration + " min"
        myModal.show()
    }
}
    function makeRowsSetSelected(tour){
         for (let i = 0, iLen= tour.attractions.length; i < iLen; i++){
             let aID = tour.attractions[i].id
             document.getElementById("attraction-"+aID).checked = true
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

    let checkboxes = document.querySelectorAll('input[type=checkbox]:checked')
    for(let i = 0, iLen = checkboxes.length; i<iLen; i++){
        tour.attractions.push(localACache.findById(checkboxes[i].value))
    }


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
            window.location.replace("admin.html")
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