package system.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import system.Model.Tour;

public interface TourRepo extends JpaRepository<Tour, Long> {}