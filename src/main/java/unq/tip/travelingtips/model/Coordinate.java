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

    private Integer sequence;
    private String latitude;
    private String longitude;

    public Coordinate (String aLatitude, String aLongitude, Integer aSequence) {
        sequence = aSequence;
        latitude = aLatitude;
        longitude = aLongitude;
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
}