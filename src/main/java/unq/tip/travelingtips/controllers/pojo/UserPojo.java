package unq.tip.travelingtips.controllers.pojo;

import unq.tip.travelingtips.model.Travel;
import unq.tip.travelingtips.model.User;

import java.util.List;

public class UserPojo {

    private Long id;
    private String token;
    private String name;
    private String photoUrl;
    private List<Travel> favouriteTravels;
    private List<User> friends;


    public Long getId() {
        return id;
    }

    public String getToken() {
        return token;
    }

    public String getName() {
        return name;
    }

    public String getPhotoUrl() {
        return photoUrl;
    }

    public List<Travel> getFavouriteTravels() {
        return favouriteTravels;
    }

    public List<User> getFriends() {
        return friends;
    }
}
