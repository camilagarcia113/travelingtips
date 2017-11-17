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
    public @ResponseBody void saveUser(@RequestBody UserPojo data) {
        if(! userService.existsToken(data.getToken())) {
            userService.saveUser(data);
        }
    }

    @RequestMapping("/user/{token}")
    public @ResponseBody
    User getUser(@PathVariable("token") String userToken) {
        return userService.getUser(userToken);
    }

    @RequestMapping(value = "/findFriends/{name}/{userToken}")
    public @ResponseBody
    List<User> findFriends(@PathVariable("name") String name, @PathVariable("userToken") String userToken) {
        return userService.findByName(name, userToken);
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

    @RequestMapping(value = "/addFriend/{user}/{friend}", method = RequestMethod.POST)
    public @ResponseBody void addToFavourites(@PathVariable("user") String user,
                                              @PathVariable("friend") String friend) {
        userService.addFriend(user, friend);
    }

    @RequestMapping(value = "/deleteFriend/{user}/{friend}", method = RequestMethod.POST)
    public @ResponseBody void deleteFavouriteTravel(@PathVariable("user") String user,
                                                    @PathVariable("friend") String friend) {
        userService.deleteFriend(user, friend);
    }

    @RequestMapping("/friends")
    public @ResponseBody List<User> getFriends(@RequestParam(value="user", required=true) String userId) {
        return userService.getFriends(userId);
    }
}
