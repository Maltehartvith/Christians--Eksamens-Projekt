package system.Model;

import java.util.ArrayList;
import java.util.List;
import javax.persistence.*;

@Entity
@Table(name="routes")
public class Route{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToMany
    @JoinTable(
            name="route_attractions",
            joinColumns = @JoinColumn(name="routes_id"),
            inverseJoinColumns = @JoinColumn(name="attractions_id")
    )
    private List<Attraction> routeAttraction = new ArrayList<>();

    public Route(){}

    public Route(Long id) {
        this.id = id;
    }

    public long getId(){
        return id;
    }

    public void setId(long tourID){
        this.id = id;
    }

    public List<Attraction> getAttractions(){
        return routeAttraction;
    }

    public void addAttraction(Attraction attraction){
        routeAttraction.add(attraction);
    }

    public void removeAttraction(Attraction attraction){
        routeAttraction.remove(attraction);
    }

}
