package system.RestControllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import system.Model.Attraction;
import system.Model.Tour;
import system.Repository.AttractionRepo;
import system.Repository.TourRepo;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/tours")
public class TourController {

    @Autowired
    TourRepo tourRepo;

    @Autowired
    AttractionRepo attractionRepo;

    @GetMapping
    public ResponseEntity<List<Tour>> findAll() {
        List<Tour> tours = new ArrayList<>();
        tourRepo.findAll().forEach(tours::add);

        return ResponseEntity.status(HttpStatus.OK).body(tours);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<Tour>> findById(@PathVariable Long id){
        Optional<Tour> optionalTour = tourRepo.findById(id);
        if (optionalTour.isPresent()){
            return ResponseEntity.status(HttpStatus.OK).body(optionalTour);
        }
        else{
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(optionalTour);
        }
    }

    @CrossOrigin(origins = "*", exposedHeaders = "Location")
    @PostMapping
    public ResponseEntity<Tour> create(@RequestBody Tour tour) {
        // Skal fjernes eller ændres - men virker for nu
        /*if(tour.getId()== 0) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }*/
        Tour newTour = tourRepo.save(tour);

        return ResponseEntity.status(HttpStatus.CREATED).header("Location", "/tours/" + newTour.getId()).body(newTour);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Tour> edit(@RequestBody Tour tour) {
        Tour newTour = tourRepo.save(tour);
        return ResponseEntity.status(HttpStatus.OK).body(newTour);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id){
        Optional<Tour> optionalTour = tourRepo.findById(id);
        if (optionalTour.isPresent()){
            tourRepo.deleteById(id);
            return ResponseEntity.status(HttpStatus.OK).build();
        }
        else{
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

}
