package unq.tip.travelingtips.model;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Embeddable
public class Marker implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "travel_id", referencedColumnName = "ID")
    private Travel travel;

    private String latitude;
    private String longitude;
    private Integer sequence;
    private String comment;
    private Integer rating;

    public Marker(String aLatitude, String aLongitude, Integer aSequence,
                  String aComment, Integer aRating) {
        sequence = aSequence;
        latitude = aLatitude;
        longitude = aLongitude;
        comment = aComment;
        rating = aRating;
    }

    public Marker() {}

    public static long getSerialVersionUID() {
        return serialVersionUID;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getSequence() {
        return sequence;
    }

    public void setSequence(Integer sequence) {
        this.sequence = sequence;
    }

    public String getLatitude() {
        return latitude;
    }

    public void setLatitude(String latitude) {
        this.latitude = latitude;
    }

    public String getLongitude() {
        return longitude;
    }

    public void setLongitude(String longitude) {
        this.longitude = longitude;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public Integer getRating() {
        return rating;
    }

    public void setRating(Integer rating) {
        this.rating = rating;
    }

    public Travel getTravel() {
        return travel;
    }

    public void setTravel(Travel travel) {
        this.travel = travel;
    }
}