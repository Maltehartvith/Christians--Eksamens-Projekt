class Route {
    constructor() {
        this.id;
        this.coordinates;
    }
}
sessionStorage.setItem("SERVER_URL_ROUTES","api/routes");
const SERVER_URL_ROUTES = sessionStorage.getItem("SERVER_URL_ROUTES");
function localRouteCache(){
    let routeData = []
    const addEdit = (route,method) => {
        if(method==="POST"){
            routeData.push(route)
        }
        else if(method==="PUT") {
            routeData = routeData.map(u => u.id == route.id ? route: u)
        }
    }
    return {
        getAll : () => routeData , //This is the same as above
        addAll : (all) => routeData = all,
        deleteOne: (id) => routeData = routeData.filter(u => u.id !== Number(id)),
        findById : (id) => routeData.find(u => u.id == id),
        addEdit :addEdit
    }
}
function fetchRoute() {
    fetch(SERVER_URL_ROUTES)
        .then(res => res.json())
        .then(data => {
            localRCache.addAll(data)
            localRCache.getAll().forEach(r=>console.log(r))
        })
}
const localRCache = localRouteCache();
fetchRoute()