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

sessionStorage.setItem("SERVER_URL_ATTRACTION","api/attractions");
const SERVER_URL_ATTRACTIONS = sessionStorage.getItem("SERVER_URL_ATTRACTION");

    function makeSelectRows(){

    const rows = localACache.getAll().map(a => `
        <option id="attraction-${a.id}" value="${a.id}">${a.id} : ${a.name}</option>
    `)

    document.getElementById("input-attraction-t").innerHTML = rows.join("")

}
    // Metode der laver rækkerne i tabellen.
    function makeAttractionRows() {
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
}
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
    function setUpHandlersAttraction() {
        document.getElementById("attraction-table-body").onclick = handleTableClickAttraction
        if(document.getElementById("btn-save-attraction") !==null)
        document.getElementById("btn-save-attraction").onclick = saveAttraction
        if(document.getElementById("btn-add-attraction") !== null)
        document.getElementById("btn-add-attraction").onclick = makeNewAttraction
    }

    setUpHandlersAttraction()

    function handleTableClickAttraction(evt) {
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
                    }
                })
        }
        //Observe change compared to video
        if (target.dataset.idEdit) {
            const idToEdit = Number(target.dataset.idEdit)
            const attraction = localACache.findById(idToEdit)
            showAttractionModal(attraction)
        }

    }


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

    function showAttractionModal(attraction) {
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
}

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
            window.location.replace("test.html")
        })
        .catch(e=>alert(e))
}

    function fetchAttraction() {
    fetch(SERVER_URL_ATTRACTIONS)
        .then(res => res.json())
        .then(data=> {
            localACache.addAll(data)
            makeAttractionRows()
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