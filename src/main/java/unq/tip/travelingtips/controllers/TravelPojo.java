package unq.tip.travelingtips.controllers;

import unq.tip.travelingtips.model.Coordinate;

import java.util.ArrayList;
import java.util.List;

public class TravelPojo {

    private String user;

    private String title;

    private List<Coordinate> coordinates = new ArrayList<>();

    public String getUser() {
        return user;
    }

    public void setUser(String user) {
        this.user = user;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public List<Coordinate> getCoordinates() {
        return coordinates;
    }

    public void setCoordinates(List<Coordinate> coordinates) {
        this.coordinates = coordinates;
    }
}
