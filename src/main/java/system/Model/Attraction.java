package system.Model;
import javax.persistence.*;

@Entity @Table(name="attractions")
public class Attraction {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="attractionID")
    private long attractionID;

    @Column(name="attractionID")
    private String name;

    @Column(name="description")
    private String description;

    @Column(name="interestPoints")
    private String interestPoints;

    @Column(name="latitude")
    private double latitude;

    @Column(name="longtitude")
    private double longtitude;

    @Column(name="timeToBoat")
    private int timeToBoat;

    public Attraction(){}
    public long getAttractionID(){return attractionID;}
    public void setAttractionID(long attractionID){this.attractionID=attractionID;}
    public String getName(){return name;}
    public void setName(String name){this.name=name;}
    public String getDescription(){return description;}
    public void setDescription(String description){this.description=description;}
    public String getInterestPoints(){return interestPoints;}
    public void setInterestPoints(String interestPoints){this.interestPoints=interestPoints;}
    public double getLatitude(){return latitude;}
    public void setLatitude(double latitude){this.latitude=latitude;}
    public double getLongtitude(){return longtitude;}
    public void setLongtitude(double longtitude){this.longtitude=longtitude;}
    public int getTimeToBoat(){return timeToBoat;}
    public void setTimeToBoat(int timeToBoat){this.timeToBoat=timeToBoat;}
}
