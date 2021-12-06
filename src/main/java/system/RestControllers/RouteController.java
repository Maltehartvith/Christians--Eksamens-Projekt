package system.RestControllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import system.Model.Route;
import system.Model.Tour;
import system.Repository.RouteRepo;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/routes")

public class RouteController {

    @Autowired
    RouteRepo routeRepo;

    @GetMapping
    public ResponseEntity<List<Route>> findAll() {
        List<Route> routes = new ArrayList<>();
        routeRepo.findAll().forEach(routes::add);

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
}
