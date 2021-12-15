package system.Configuration;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import system.Model.Attraction;
import system.Model.Coordinate;
import system.Model.Route;
import system.Model.Tour;
import system.Repository.AttractionRepo;
import system.Repository.CoordinateRepo;
import system.Repository.RouteRepo;
import system.Repository.TourRepo;

import java.util.ArrayList;
import java.util.List;

//@Configuration
public class DatabaseSetup implements CommandLineRunner {

    TourRepo tourRepo;
    AttractionRepo attractionRepo;
    RouteRepo routeRepo;
    CoordinateRepo coordinateRepo;

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

        attractionRepo.save(new Attraction(1L, "Den blå hanes hus",  "Her kan du opleve den blå hanes hus helt tæt på", "Bygning", 55.3184577, 15.1899624, 2));
        attractionRepo.save(new Attraction(2L, "Danmarks østligste punkt i Danmark",  "Det østligste punkt i Danmark ", "Natur", 55.3194966, 15.1914682, 2));
        attractionRepo.save(new Attraction(3L, "Æble plantage",  "Her kan du se en æble plantage", "Natur", 55.3212630, 15.1891052, 2));
        attractionRepo.save(new Attraction(4L, "Latter frøer",  "Her er der tidligere set latter frøer ", "Natur", 55.3204756, 15.1876427, 2));
        attractionRepo.save(new Attraction(5L, "Fængsel",  "Her kan du opleve Christian Ø's fængsel", "Bygning", 55.3199894, 15.1845679, 2));
        attractionRepo.save(new Attraction(6L, "Bro",  "Her kan du se broen", "Bygning", 55.3204508, 15.1856262, 2));
        attractionRepo.save(new Attraction(7L, "Bro",  "Her kan du se broen", "Bygning", 55.3204404, 15.1862263, 2));
        attractionRepo.save(new Attraction(8L, "Hjertestarter",  "Hvis uheldet er ude - Hjertestarter her!", "SOS", 55.3203103, 15.1863093, 2));
        attractionRepo.save(new Attraction(9L, "Fyrtårn",  "Christians Ø's fyrtårn", "Bygning", 55.3204645, 15.1872536, 2));
        attractionRepo.save(new Attraction(10L, "Sæler",  "Til at teste implementation af billede og lyd (konceptuel attraction)", "Dyr", 55.3225185,15.1906426, 2,"Seal.jpg","BabySealSounds.mp3"));

        // NYE HARDCODEDE ATTRAKTIONS FRA INDEX(JANUS)
        //attractionRepo.save(new Attraction(1L, "Det store tårn",  "Her finder du christian ø's tårn", "Bygning", 55.3207358, 15.1867559, 2));
        //attractionRepo.save(new Attraction(2L, "Den hvide dame",  "Her er spøgelset den hvide dame blevet set ", "Spøgelser", 55.3196099 ,  15.1878977, 2));
        //attractionRepo.save(new Attraction(3L, "Den hvide dame",  "Her er spøgelset den hvide dame blevet set ", "Spøgelser", 55.3195853,  15.1878071, 2));
        //attractionRepo.save(new Attraction(4L, "Unavngivet",  "DET SKAL VI LIGE FINDE UD AF ", "??", 55.3196098,  15.1878440, 2));
        //attractionRepo.save(new Attraction(5L, "Udsigt til den hvide dame",  "Herfra kan du muligvis se den hvide dame! ", "Spøgelser", 55.3194137, 15.1880874, 2));
        //attractionRepo.save(new Attraction(6L, "Gryssehytten 98",  "Besøg gryssehytten 98 her ", "Bygning", 55.3193422, 15.1887374, 2));
        //attractionRepo.save(new Attraction(7L, "Skrald / Skraldespand",  "Kom af med skraldet her ", "Skrald", 55.3185370, 15.1875297, 2));
        //attractionRepo.save(new Attraction(8L, "Arteri maler hus til kunst",  "Stop her for at se lidt kunst ", "Bygning", 55.3178818, 15.1887374, 2));
        //attractionRepo.save(new Attraction(9L, "Kongens bakke",  "Her ser du Kongens bakke", "Natur", 55.3179035, 15.1888505, 2));

        //attractionRepo.save(new Attraction(11L, "Her slutter muren",  "Her slutter muren", "Bygning", 55.3182452, 15.1904174, 2));
        //attractionRepo.save(new Attraction(12L, "Verdens ende!",  "Her er verdens ende -Et af de absolut yderste punkter i Danmark", "Natur", 55.3194523, 15.1914865, 2));

        //attractionRepo.save(new Attraction(14L, "Sommerhytte uden vand og toilet",  "En fin lille hytte der dog hverken har vand eller toilet ", "Bygning", 55.3202036, 15.1918046, 2));
        //attractionRepo.save(new Attraction(15L, "Bombe margasin",  "Her kan du opleve et bombe margasin fra Christian den fjerdes tid", "Krig", 55.3202688, 15.1917908, 2));
        //attractionRepo.save(new Attraction(16L, "Kanon",  "Her kan du opleve en kanon fra Christian den fjerdes tid", "Krig", 55.3206473, 15.1918498, 2));
        //attractionRepo.save(new Attraction(17L, "Kenals vig",  "Et sted man ikke forventede et angreb", "Natur", 55.3207767, 15.1909375, 2));
        //attractionRepo.save(new Attraction(18L, "Sankthans bål",  "Her bliver der tændt bål til sankthans", "Natur", 55.3206729, 15.1905938, 2));
        //attractionRepo.save(new Attraction(19L, "Kunst maler har stået her",  "Her har der tidligere stået en kunst maler", "Natur", 55.3207202, 15.1896441, 2));
        //attractionRepo.save(new Attraction(20L, "Sti til sankt hans vandkilde",  "Her er der en sti til en famøs vandkilde", "Natur", 55.3210878, 15.1896714, 2));
        //attractionRepo.save(new Attraction(21L, "Rugmarken",  "Her kan rugmarken opleves", "Natur", 55.3223851, 15.1893255, 2));
        //attractionRepo.save(new Attraction(22L, "Skole",  "Skole på Christians Ø", "Bygning", 55.3218778, 15.1895314, 2));
        //attractionRepo.save(new Attraction(23L, "Telt & hytte mm.",  "Her kan man overnatte", "Natur/Bygning", 55.3218028, 15.1899838, 2));

        //attractionRepo.save(new Attraction(25L, "Haver",  "Her kan du se haver", "Natur", 55.3211813, 15.1889087, 2));
        //attractionRepo.save(new Attraction(26L, "Teltplads",  "Teltplads til 16 personer med køleskab", "Natur", 55.3212452, 15.1893447, 2));
        //attractionRepo.save(new Attraction(27L, "Krudthus ",  "Krudthus - Det ligger lavt", "Bygning", 55.3209563, 15.1881492, 2));
        //attractionRepo.save(new Attraction(28L, "Ruin ",  "Her kan du opleve en ruin", "Bygning", 55.3209214, 15.1880076, 2));

        //attractionRepo.save(new Attraction(30L, "Det gamle bryggeri",  "Her kan det gamle bryggeri opleves", "Bygning", 55.3202843, 15.1868364, 2));
        //attractionRepo.save(new Attraction(31L, "Trappe",  "Trappe", "Bygning", 55.3195776, 15.1849335, 2));

        //attractionRepo.save(new Attraction(33L, "Skrald / skraldespand",  "Her kan du komme af med dit skrald", "Bygning", 55.3203696, 15.1854099, 2));


        //attractionRepo.save(new Attraction(36L, "Grill",  "Her kan man grille", "Bygning", 55.3203118, 15.1863215, 2));

        //attractionRepo.save(new Attraction(38L, "Havnekontor",  "Her ligger Chritians Ø's havnekontor", "Bygning", 55.3203060, 15.1863116, 2));
        //attractionRepo.save(new Attraction(39L, "Trappe",  "Trappe", "Bygning", 55.3202163, 15.1864310, 2));
        //attractionRepo.save(new Attraction(40L, "Trappe",  "Trappe", "Bygning", 55.3204373, 15.1872110, 2));

        //attractionRepo.save(new Attraction(42L, "Øje",  "??", "Bygning", 55.3191383, 15.1888445, 2));
        //attractionRepo.save(new Attraction(43L, "Beliggenhed 98",  "Oplev beliggenhed 98 her", "Bygning", 55.3191105, 15.1889450, 2));
        //attractionRepo.save(new Attraction(44L, "Have",  "Her ligger en fin have", "Natur", 55.3192603, 15.1886435, 2));
        //attractionRepo.save(new Attraction(45L, "Dam",  "Her ligger en dam", "Natur", 55.3193819, 15.1886910, 2));
        //attractionRepo.save(new Attraction(46L, "Trappe",  "Trappe", "Bygning", 55.3195648, 15.1895525, 2));



        Tour t = new Tour("Den bedste tur", "Det er en meget lang tur", 30, 200);
        t.addAttraction(new Attraction(2L, "Den hvide dame",  "Her er spøgelset den hvide dame blevet set ", "Spøgelser", 55.3196099 ,  15.1878977, 2));
        tourRepo.save(t);
        //tourRepo.save(new Tour("Den bedste tur", "Det er en meget lang tur", 30, 200));
        tourRepo.save(new Tour("Den aller bedste tur", "Det er en meget meget meget lang tur", 30, 500));

        /*ArrayList<Coordinate> route0coords=new ArrayList<>();

        route0coords.add(new Coordinate(55.320783, 15.186147));
        route0coords.add(new Coordinate(55.320865, 15.186308));
        route0coords.add(new Coordinate(55.320914, 15.186443));
        route0coords.add(new Coordinate(55.320919, 15.187355));
        route0coords.add(new Coordinate(55.320851, 15.187840));
        route0coords.add(new Coordinate(55.321360, 15.189657));
        route0coords.add(new Coordinate(55.320560, 15.189646));
        route0coords.add(new Coordinate(55.320221, 15.189061));
        route0coords.add(new Coordinate(55.319913, 15.189120));
        route0coords.add(new Coordinate(55.319516, 15.188455));
        route0coords.add(new Coordinate(55.319243, 15.187435));
        route0coords.add(new Coordinate(55.319317, 15.186718));
        route0coords.add(new Coordinate(55.320229, 15.186411));

        routeRepo.save(new Route(1L));

        route0coords.forEach(c->{
            c.setRoute(routeRepo.getById(1L));
            CoordinateRepo check=coordinateRepo;
            coordinateRepo.save(c);
        });*/



    }
}
