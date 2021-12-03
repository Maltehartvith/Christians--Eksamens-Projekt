package system.RestControllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import system.Model.Tour;
import system.Repository.TourRepo;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RequestMapping("tours")
@RestController
public class TourController {

    @Autowired
    TourRepo tourRepo;

    @GetMapping("/read")
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
        if(tour.getId()!=0) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        Tour newTour = tourRepo.save(tour);

        return ResponseEntity.status(HttpStatus.CREATED).header("Location", "/tours/" + newTour.getId()).body(newTour);
    }


    @PutMapping("/{id}")
    public ResponseEntity<Tour> editOne(@RequestBody Tour tour, @PathVariable("id") Long id) {
        Tour t = tourRepo.findById(id).get();
        t.setId(tour.getId());
        t.setName(tour.getName());
        t.setDescription(tour.getDescription());
        t.setMaxMembers(t.getMaxMembers());
        t.setDuration(t.getDuration());

        Tour newTour = tourRepo.save(t);
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
