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
         </tr>
        `)
    document.getElementById("attraction-table-body").innerHTML = rows.join("")
}

function setUpHandlersAttraction() {
    document.getElementById("attraction-table-body").onclick = handleTableClickAttraction
    //document.getElementById("btn-save-attraction").onclick = saveAttraction
    //document.getElementById("btn-add-attraction").onclick = makeNewAttraction
}
setUpHandlersAttraction()
