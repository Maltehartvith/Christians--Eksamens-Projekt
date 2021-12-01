package system.RestControllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;
import system.Repository.RouteRepo;

@RestController
public class RouteController {

    @Autowired
    RouteRepo routeRepo;
}
