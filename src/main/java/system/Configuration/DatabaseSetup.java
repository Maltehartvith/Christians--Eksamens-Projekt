package system.Configuration;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import system.Model.Attraction;
import system.Model.Route;
import system.Model.Tour;
import system.Repository.AttractionRepo;
import system.Repository.RouteRepo;
import system.Repository.TourRepo;

import java.util.ArrayList;
import java.util.List;

@Configuration
public class DatabaseSetup implements CommandLineRunner {

    TourRepo tourRepo;
    AttractionRepo attractionRepo;
    RouteRepo routeRepo;

    public DatabaseSetup(TourRepo tourRepo, AttractionRepo attractionRepo, RouteRepo routeRepo) {
        this.tourRepo = tourRepo;
        this.attractionRepo = attractionRepo;
        this.routeRepo = routeRepo;
    }

    @Override
    public void run(String... args) throws Exception {
        /*tourRepo.save(new Tour("Den bedste tur", "Det er en meget lang tur", 30, 200));
        tourRepo.save(new Tour("Den aller bedste tur", "Det er en meget meget meget lang tur", 30, 500));*/

        routeRepo.save(new Route(1L));

        attractionRepo.save(new Attraction (1L, "frø",  "Se de spændende frøer", "frø", 2.3, 2.2, 10));
        attractionRepo.save(new Attraction(2L, "Plante",  "Se de spændende planter", "Planter", 2.7, 2.6, 15));
        attractionRepo.save(new Attraction(3L, "Plante",  "Se de spændende planter", "Planter", 2.4, 2.6, 12));
        attractionRepo.save(new Attraction(4L, "Sæler",  "Se de spændende sæler", "dyr", 2.9, 2.6, 20));
        attractionRepo.save(new Attraction(5L,"Vester Kyst","Sæler","dyr",2.3,3.2,5));
        attractionRepo.save(new Attraction(6L, "Nordre Kyst", "Flot Struktur", "bygning", 2.4, 3.4, 5));
        attractionRepo.save(new Attraction(7L,"Myg", "Myggens hule", "dyr", 2.5, 3.5, 15));
        attractionRepo.save(new Attraction(8L, "Ø-Chef", "Ø chefen ","vigtige personer", 2.2, 3.6, 5));
        attractionRepo.save(new Attraction(9L, "Restaurent Christian", "Der er god mad","mad", 2.1, 3.1, 5));
        attractionRepo.save(new Attraction(10L, "Katakomber", "Pas på med at fare vild i katakomberne", "bygning", 2.8, 3.8, 6));



    }
}
