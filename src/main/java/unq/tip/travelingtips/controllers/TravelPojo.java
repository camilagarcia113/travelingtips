package unq.tip.travelingtips.controllers;

import unq.tip.travelingtips.model.Marker;

import java.util.ArrayList;
import java.util.List;

public class TravelPojo {

    private String user;

    private String title;

    private List<Marker> markers = new ArrayList<>();

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

    public List<Marker> getMarkers() {
        return markers;
    }

    public void setMarkers(List<Marker> markers) {
        this.markers = markers;
    }
}
