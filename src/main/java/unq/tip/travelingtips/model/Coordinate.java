package unq.tip.travelingtips.model;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Embeddable
public class Coordinate implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Integer id;

    private String latitude;
    private String longitude;
    private Integer sequence;
    private String comment;
    private Integer rating;

    public Coordinate (String aLatitude, String aLongitude, Integer aSequence,
                       String aComment, Integer aRating) {
        sequence = aSequence;
        latitude = aLatitude;
        longitude = aLongitude;
        comment = aComment;
        rating = aRating;
    }

    public Coordinate() {}

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
}