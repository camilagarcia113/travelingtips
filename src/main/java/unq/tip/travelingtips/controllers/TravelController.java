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
    public ResponseEntity<String> saveMarkedTravel(@RequestBody TravelPojo data) {
        if(data != null) {
            travelService.saveTravel(data);
            return new ResponseEntity<>(HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }

    // /travels?user=pepe
    @RequestMapping("/travels")
    public @ResponseBody List<Travel> getTravels(@RequestParam(value="user", required=true) String userId, Model model) {
        model.addAttribute("user", userId);
        return travelService.getTravelsFromUser(userId);
    }

    @RequestMapping(value = "/deleteTravel", method = RequestMethod.POST)
    public @ResponseBody void deleteTravel(@RequestParam(value="user", required=true) String userId,
                             @RequestParam(value="title", required=true) String travelTitle) {
        travelService.deleteTravel(userId, travelTitle);
    }


}
