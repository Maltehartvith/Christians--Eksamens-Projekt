package system.Model;

import java.util.ArrayList;
import java.util.List;
import javax.persistence.*;

@Entity
@Table(name="tours")
public class Tour{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="name")
    private String name;

    @Column(name="description")
    private String description;

    @Column(name="maxMembers")
    private int maxMembers = 30;

    @Column(name="duration")
    private int duration;

    /* cascade = CascadeType.ALL, fetch = FetchType.LAZY*/

    @ManyToMany
    @JoinTable(
            name="tour_attractions",
            joinColumns = @JoinColumn(name="tours_id"),
            inverseJoinColumns = @JoinColumn(name="attractions_id")
    )
    private List<Attraction> tourAttraction = new ArrayList<>();

    public Tour(){}

    public long getId(){
        return id;
    }

    public void setId(long tourID){
        this.id =tourID;
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

    public int getMaxMembers(){
        return maxMembers;
    }

    public void setMaxMembers(int maxMembers){
        this.maxMembers=maxMembers;
    }

    public int getDuration(){
        return duration;
    }

    public void setDuration(int duration){
        this.duration=duration;
    }

    public List<Attraction> getAttractions() {
        return tourAttraction;
    }

    public void addAttraction(Attraction attraction){
        tourAttraction.add(attraction);
    }

    public void removeAttraction(Attraction attraction){
        tourAttraction.remove(attraction);
    }

}
