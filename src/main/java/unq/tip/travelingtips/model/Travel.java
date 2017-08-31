package unq.tip.travelingtips.model;

import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Travel implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Integer id;

    @ElementCollection
    @JoinTable(name="travel_coordinates" , joinColumns=@JoinColumn(name="travel_id"))
    private List<Coordinate> placesVisited = new ArrayList<>();

    public Travel () {}

    public Travel(List<Coordinate> places) {
        placesVisited = places;
    }

    public static long getSerialVersionUID() {
        return serialVersionUID;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public List<Coordinate> getPlacesVisited() {
        return placesVisited;
    }

    public void setPlacesVisited(List<Coordinate> placesVisited) {
        this.placesVisited = placesVisited;
    }
}