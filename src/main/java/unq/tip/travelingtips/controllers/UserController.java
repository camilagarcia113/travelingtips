package unq.tip.travelingtips.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import unq.tip.travelingtips.controllers.pojo.UserPojo;
import unq.tip.travelingtips.model.Travel;
import unq.tip.travelingtips.model.User;
import unq.tip.travelingtips.services.UserService;

import java.util.List;

@Controller
public class UserController {

    @Autowired
    UserService userService;

    @RequestMapping(value = "/user", consumes = "application/json", method = RequestMethod.POST)
    public @ResponseBody void saveMarkedTravel(@RequestBody UserPojo data) {
        userService.saveUser(data);
    }

    @RequestMapping("/user/{id}")
    public @ResponseBody
    User getUser(@PathVariable("id") String userId) {
        return userService.getUser(userId);
    }

    @RequestMapping(value = "/findFriends/{name}")
    public @ResponseBody
    List<User> findFriends(@PathVariable("name") String name) {
        return userService.findByName(name);
    }

    @RequestMapping(value = "/addToFavourites/{id}/{user}", method = RequestMethod.POST)
    public @ResponseBody void addToFavourites(@PathVariable("id") Long travelId,
                                              @PathVariable("user") String user) {
        userService.addToFavourites(travelId, user);
    }

    @RequestMapping("/favouriteTravels")
    public @ResponseBody List<Travel> getFavourites(@RequestParam(value="user", required=true) String userId) {
        return userService.getFavourites(userId);
    }

    @RequestMapping(value = "/deleteFavouriteTravel/{id}/{user}", method = RequestMethod.POST)
    public @ResponseBody void deleteFavouriteTravel(@PathVariable("id") Long travelId,
                                                    @PathVariable("user") String user) {
        userService.deleteFavouriteTravel(travelId, user);
    }

}
