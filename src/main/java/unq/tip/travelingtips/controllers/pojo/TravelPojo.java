package unq.tip.travelingtips.controllers.pojo;

import unq.tip.travelingtips.model.Marker;

import java.util.ArrayList;
import java.util.List;

public class TravelPojo {

    private Long id;

    private String user;

    private String title;

    private String summary;

    private List<Marker> markers = new ArrayList<>();

    public Long getId() {
        return id;
    }

    public String getUser() {
        return user;
    }

    public String getTitle() {
        return title;
    }

    public String getSummary() {
        return summary;
    }

    public List<Marker> getMarkers() {
        return markers;
    }

}
