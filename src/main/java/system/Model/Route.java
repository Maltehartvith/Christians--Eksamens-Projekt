package system.Model;
import java.util.ArrayList;
import javax.persistence.*;

@Entity @Table(name="routes")
public class Route{
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="routeID")
    private long routeID;


    private Arraylist<Attraction> attractions = new ArrayList<>();

    public Route(){}
    public long getRouteID(){return routeID;}
    public void setRouteID(long tourID){this.routeID=routeID;}
    public Arraylist<Attraction> getAttractions(){return attractions;}
    public addAttraction(Attraction attraction){attractions.add(attraction);}
    public removeAttraction(Attraction attraction){attractions.remove(attraction);}
}
