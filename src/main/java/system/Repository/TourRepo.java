package system.Repository;
import org.springframework.data.repository.CrudRepository;
import system.Model.Tour;

public interface TourRepo extends CrudRepository<Long, Tour>{}