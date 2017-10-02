package unq.tip.travelingtips.model;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

@Entity
@Table(uniqueConstraints={@UniqueConstraint(columnNames={"ID", "TITLE", "USER"})})
public class Travel implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Long id;

    private String user;

    private String title;

    private String summary;

    @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private List<Marker> placesVisited;

    public Travel () {}

    public Travel(String aUser, String aTitle, String aSummary, List<Marker> places) {
        user = aUser;
        title = aTitle;
        summary = aSummary;
        placesVisited = places;
    }

    public static long getSerialVersionUID() {
        return serialVersionUID;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getSummary() {
        return summary;
    }

    public void setSummary(String summary) {
        this.summary = summary;
    }

    public String getUser() {
        return user;
    }

    public void setUser(String user) {
        this.user = user;
    }

    public List<Marker> getPlacesVisited() {
        return placesVisited;
    }

    public void setPlacesVisited(List<Marker> placesVisited) {
        this.placesVisited = placesVisited;
    }
}