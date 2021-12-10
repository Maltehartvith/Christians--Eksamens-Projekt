
function makeTourRows(){

    const rows = localTCache.getAll().map(u => `
         <tr>
           <td>${u.id}</td>
           <td>${encode(u.name)}</td>
           <td>${encode(u.description)}</td>
           <td>${u.maxMembers}</td>
           <td>${u.duration}</td>
         </tr>
        `)
    document.getElementById("tour-table-body").innerHTML =  rows.join("")
}
/*function setUpHandlersTour() {
    //document.getElementById("tour-table-body").onclick = handleTableClickTour
    //document.getElementById("btn-save-tour").onclick = saveTour
    //document.getElementById("btn-add-tour").onclick = makeNewTour
}
setUpHandlersTour()*/
