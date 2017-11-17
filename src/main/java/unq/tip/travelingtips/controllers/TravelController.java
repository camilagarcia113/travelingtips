package unq.tip.travelingtips.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import unq.tip.travelingtips.controllers.pojo.MarkerPojo;
import unq.tip.travelingtips.controllers.pojo.TravelPojo;
import unq.tip.travelingtips.model.Travel;
import unq.tip.travelingtips.services.TravelService;

import java.util.List;

@Controller
public class TravelController {

    @Autowired
    TravelService travelService;

    @RequestMapping(value = "/travels", consumes = "application/json", method = RequestMethod.POST)
    public @ResponseBody void saveMarkedTravel(@RequestBody TravelPojo data) {
        if(data.getId() != null) {
            travelService.updateTravel(data);
        } else {
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

    @RequestMapping(value = "/findTravels/{user}/{title}")
    public @ResponseBody List<Travel> findTravels(@PathVariable("user") String user,
                                                  @PathVariable("title") String title) {
        return travelService.getTravelsByTitle(user, title);
    }

    @RequestMapping(value = "/findTravelsMap/{user}", consumes = "application/json", method = RequestMethod.POST)
    public @ResponseBody List<Travel> findTravelsMap(@PathVariable("user") String user,
                                                     @RequestBody MarkerPojo location) {
        return travelService.getTravelsByPlace(user, location);
    }
}
