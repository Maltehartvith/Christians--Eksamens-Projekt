package system.Model;

import javax.persistence.*;
import java.util.ArrayList;

@Entity @Table(name="routes")
public class Route{
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="routeID")
    private long routeID;

    @ManyToMany
    private ArrayList<Attraction> attractions = new ArrayList<>();

    public Route(){}
    public long getRouteID(){return routeID;}
    public void setRouteID(long tourID){this.routeID=routeID;}
    public ArrayList<Attraction> getAttractions(){return attractions;}
    public void addAttraction(Attraction attraction){attractions.add(attraction);}
    public void removeAttraction(Attraction attraction){attractions.remove(attraction);}
}
