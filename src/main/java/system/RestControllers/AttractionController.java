package system.RestControllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import system.Model.Attraction;
import system.Model.Tour;
import system.Repository.AttractionRepo;

@RestController
@RequestMapping("api/attractions")
public class AttractionController {

    @Autowired
    AttractionRepo attractionRepo;

    @GetMapping
    public ResponseEntity<List<Attraction>> findAll(){
        List<Attraction> attractions = new ArrayList<>();
        attractionRepo.findAll().forEach(attractions::add);
        return ResponseEntity.status(HttpStatus.OK).body(attractions);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<Attraction>> findById(@PathVariable Long id){
        Optional<Attraction> optionalAttraction = attractionRepo.findById(id);
        if(optionalAttraction.isPresent()){
            return ResponseEntity.status(HttpStatus.OK).body(optionalAttraction);
        }else{
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(optionalAttraction);
        }
    }

    @CrossOrigin(origins = "*", exposedHeaders = "Location")
    @PostMapping
    public ResponseEntity<Attraction> create(@RequestBody Attraction attraction) {
       /* if(attraction.getId()!=0) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }*/

        Attraction newAttraction = attractionRepo.save(attraction);

        return ResponseEntity.status(HttpStatus.CREATED).header("Location", "/attractions/" + newAttraction.getId()).body(newAttraction);
    }
    @PutMapping("/{id}")
    public ResponseEntity<Attraction> edit(@RequestBody Attraction attraction) {

        Attraction newAttraction = attractionRepo.save(attraction);
        return ResponseEntity.status(HttpStatus.OK).body(newAttraction);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id){
        Optional<Attraction> optionalAttraction = attractionRepo.findById(id);
        if (optionalAttraction.isPresent()){
            attractionRepo.deleteById(id);
            return ResponseEntity.status(HttpStatus.OK).build();
        }
        else{
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }



}