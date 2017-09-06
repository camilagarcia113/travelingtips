package unq.tip.travelingtips.model;

import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(uniqueConstraints={@UniqueConstraint(columnNames={"ID", "TITLE", "USER"})})
public class Travel implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Integer id;

    private String user;

    private String title;

    @ElementCollection
    @JoinTable(name="travel_coordinates" , joinColumns=@JoinColumn(name="travel_id"))
    private List<Coordinate> placesVisited = new ArrayList<>();

    public Travel () {}

    public Travel(String aUser, String aTitle, List<Coordinate> places) {
        user = aUser;
        title = aTitle;
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

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getUser() {
        return user;
    }

    public void setUser(String user) {
        this.user = user;
    }

    public List<Coordinate> getPlacesVisited() {
        return placesVisited;
    }

    public void setPlacesVisited(List<Coordinate> placesVisited) {
        this.placesVisited = placesVisited;
    }
}