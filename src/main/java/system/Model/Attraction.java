package system.Model;
import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name="attractions")
public class Attraction extends Object {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="name")
    private String name;

    @Column(name="description", length = 600)
    private String description;

    @Column(name="interestPoints")
    private String interestPoints;

    @Column(name="latitude")
    private double latitude;

    @Column(name="longtitude")
    private double longtitude;

    @Column(name="timeToBoat")
    private int timeToBoat;

    @ManyToMany(mappedBy = ("routeAttraction"))
    private List<Route> routeArrayList = new ArrayList<>();

    @ManyToMany(mappedBy = "tourAttraction")
    private List<Tour> tourArrayList = new ArrayList<>();

    @Column(name="imagefilename")
    private String imagefilename;

    @Column(name="soundfilename")
    private String soundfilename;

    public Attraction(Long id, String name, String description, String interestPoints, double latitude, double longtitude, int timeToBoat) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.interestPoints = interestPoints;
        this.latitude = latitude;
        this.longtitude = longtitude;
        this.timeToBoat = timeToBoat;
    }

    public Attraction(Long id, String name, String description, String interestPoints, double latitude, double longtitude, int timeToBoat, String imagefilename) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.interestPoints = interestPoints;
        this.latitude = latitude;
        this.longtitude = longtitude;
        this.timeToBoat = timeToBoat;
        this.imagefilename = imagefilename;
    }

    public Attraction(Long id, String name, String description, String interestPoints, double latitude, double longtitude, int timeToBoat, String imagefilename, String soundfilename) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.interestPoints = interestPoints;
        this.latitude = latitude;
        this.longtitude = longtitude;
        this.timeToBoat = timeToBoat;
        this.imagefilename = imagefilename;
        this.soundfilename = soundfilename;
    }

    public Attraction(){}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName(){
        return name;
    }

    public void setName(String name){
        this.name=name;
    }

    public String getDescription(){
        return description;
    }

    public void setDescription(String description){
        this.description=description;
    }

    public String getInterestPoints(){
        return interestPoints;
    }

    public void setInterestPoints(String interestPoints){
        this.interestPoints=interestPoints;
    }

    public double getLatitude(){
        return latitude;
    }

    public void setLatitude(double latitude){
        this.latitude=latitude;
    }

    public double getLongtitude(){
        return longtitude;
    }

    public void setLongtitude(double longtitude){
        this.longtitude=longtitude;
    }

    public int getTimeToBoat(){
        return timeToBoat;
    }

    public void setTimeToBoat(int timeToBoat){
        this.timeToBoat=timeToBoat;
    }

    public String getImagefilename() {
        return imagefilename;
    }

    public void setImagefilename(String imagefilename) {
        this.imagefilename = imagefilename;
    }

    public String getSoundfilename() {
        return soundfilename;
    }

    public void setSoundfilename(String soundfilename) {
        this.soundfilename = soundfilename;
    }
}
