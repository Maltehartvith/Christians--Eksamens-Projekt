package system.Model;
import java.util.ArrayList;
import javax.persistence.*;

@Entity @Table(name="tours")
public class Tour{
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="tourID")
    private long tourID;

    @Column(name="name")
    private String name;

    @Column(name="description")
    private String description;

    @Column(name="maxMembers")
    private int maxMembers = 30;

    @Column(name="duration")
    private int duration;


    private Arraylist<Attraction> attractions = new ArrayList<>();

    public Tour(){}
    public long getTourID(){return tourID;}
    public void setTourID(long tourID){this.tourID=tourID;}
    public String getName(){return name;}
    public void setName(String name){this.name=name;}
    public String getDescription(){return description;}
    public void setDescription(String description){this.description=description;}
    public int getMaxMembers(){return maxMembers;}
    public void setMaxMembers(int maxMembers){this.maxMembers=maxMembers;}
    public int getDuration(){return duration;}
    public void setDuration(int duration){this.duration=duration;}
    public Arraylist<Attraction> getAttractions() {return attractions;}
    public addAttraction(Attraction attraction){attractions.add(attraction);}
    public removeAttraction(Attraction attraction){attractions.remove(attraction);}
}
