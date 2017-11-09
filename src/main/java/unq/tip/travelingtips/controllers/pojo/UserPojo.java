package unq.tip.travelingtips.controllers.pojo;

import unq.tip.travelingtips.model.Travel;

import java.util.List;

public class UserPojo {

    private Long id;
    private String token;
    private String name;
    private String photoUrl;
    private List<Travel> favouriteTravels;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPhotoUrl() {
        return photoUrl;
    }

    public void setPhotoUrl(String photoUrl) {
        this.photoUrl = photoUrl;
    }

    public List<Travel> getFavouriteTravels() {
        return favouriteTravels;
    }

    public void setFavouriteTravels(List<Travel> favouriteTravels) {
        this.favouriteTravels = favouriteTravels;
    }
}
