package system.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import system.Model.Attraction;

public interface AttractionRepo extends JpaRepository<Attraction,Long> {}