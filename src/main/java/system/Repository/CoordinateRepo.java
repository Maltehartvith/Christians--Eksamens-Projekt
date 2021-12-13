package system.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import system.Model.Coordinate;

import java.util.List;

@Repository
public interface CoordinateRepo extends JpaRepository<Coordinate,Long> {
    List<Coordinate> findAllByRouteId(Long routeId);
}
