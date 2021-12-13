package system.Model;

import javax.persistence.*;

@Entity
@Table(name="coordinates")
public class Coordinate {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="latitude")
    private double latitude;

    @Column(name="longtitude")
    private double longtitude;

    @ManyToOne
    @JoinColumn(name="route_id", nullable=false)
    private Route route;

    public Coordinate(){}

    public Coordinate(double latitude, double longtitude) {
        this.latitude = latitude;
        this.longtitude = longtitude;
    }

    public double getLatitude() {
        return latitude;
    }

    public void setLatitude(double latitude) {
        this.latitude = latitude;
    }

    public double getLongtitude() {
        return longtitude;
    }

    public void setLongtitude(double longtitude) {
        this.longtitude = longtitude;
    }

    public void setRoute(Route route) {
        this.route = route;
    }
}
