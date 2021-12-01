package system.RestControllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;
import system.Repository.TourRepo;

@RestController
public class TourController {

    @Autowired
    TourRepo tourRepo;
}
