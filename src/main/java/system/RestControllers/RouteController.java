package system.RestControllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import system.Model.Coordinate;
import system.Model.Route;
import system.Model.Tour;
import system.Repository.CoordinateRepo;
import system.Repository.RouteRepo;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/routes")

public class RouteController {

    @Autowired
    RouteRepo routeRepo;

    @Autowired
    CoordinateRepo coordinateRepo;

    @GetMapping
    public ResponseEntity<List<Route>> findAll() {
        List<Route> routes = new ArrayList<>();
        routeRepo.findAll().forEach(routes::add);
        routes.forEach(r->{
            List<Coordinate> coords = coordinateRepo.findAll();
            System.out.println(coords);
            //r.setCoordinates(coords);
        });

        return ResponseEntity.status(HttpStatus.OK).body(routes);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<Route>> findById(@PathVariable Long id){
        Optional<Route> optionalRoute = routeRepo.findById(id);
        if (optionalRoute.isPresent()){
            return ResponseEntity.status(HttpStatus.OK).body(optionalRoute);
        }
        else{
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(optionalRoute);
        }
    }

    @PostMapping
    public ResponseEntity<Route> create(@RequestBody Route route) {
        Route newRoute = routeRepo.save(route);
        return ResponseEntity.status(HttpStatus.CREATED).header("Route", "/routes/" + newRoute.getId()).body(newRoute);
    }

}
