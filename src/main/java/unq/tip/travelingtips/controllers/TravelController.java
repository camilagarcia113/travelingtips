package unq.tip.travelingtips.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import unq.tip.travelingtips.model.Coordinate;
import unq.tip.travelingtips.services.TravelService;

import java.util.List;

@Controller
public class TravelController {

    @Autowired
    TravelService travelService;

    @RequestMapping(value = "/travels", consumes = "application/json", method = RequestMethod.POST)
    public ResponseEntity<String> saveMarkedTravel(@RequestBody List<Coordinate> data) {
        if(data != null) {
            travelService.saveTravel(data);
            return new ResponseEntity<>(HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }
}
