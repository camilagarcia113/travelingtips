package unq.tip.travelingtips.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import unq.tip.travelingtips.model.Travel;
import unq.tip.travelingtips.services.TravelService;

import java.util.List;

@Controller
public class TravelController {

    @Autowired
    TravelService travelService;

    @RequestMapping(value = "/travels", consumes = "application/json", method = RequestMethod.POST)
    public @ResponseBody void saveMarkedTravel(@RequestBody TravelPojo data) {
        if(data != null) {
            travelService.saveTravel(data);
        }
    }

    @RequestMapping("/travels")
    public @ResponseBody List<Travel> getTravels(@RequestParam(value="user", required=true) String userId) {
        return travelService.getTravelsFromUser(userId);
    }


    @RequestMapping("/travel/{id}")
    public @ResponseBody Travel getTravel(@PathVariable("id") Long travelId) {
        return travelService.getTravel(travelId);
    }

    @RequestMapping(value = "/deleteTravel/{id}", method = RequestMethod.POST)
    public @ResponseBody void deleteTravel(@PathVariable("id") Long travelId) {
        travelService.deleteTravel(travelId);
    }

    @RequestMapping(value = "/findTravels")
    public @ResponseBody List<Travel> findTravels(@RequestParam(value="title", required=true) String title) {
        return travelService.getTravelsByTitle(title);
    }

    @RequestMapping(value = "/findTravelsMap", consumes = "application/json", method = RequestMethod.POST)
    public @ResponseBody List<Travel> findTravelsMap(@RequestBody MarkerPojo location) {
        return travelService.getTravelsByPlace(location);
    }
}
