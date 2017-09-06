package unq.tip.travelingtips.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import unq.tip.travelingtips.services.TravelService;

@Controller
public class TravelController {

    @Autowired
    TravelService travelService;

    @RequestMapping(value = "/travels", consumes = "application/json", method = RequestMethod.POST)
    public ResponseEntity<String> saveMarkedTravel(@RequestBody TravelPojo data) {
        if(data != null) {
            travelService.saveTravel(data.getUser(), data.getTitle(), data.getCoordinates());
            return new ResponseEntity<>(HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }
}
