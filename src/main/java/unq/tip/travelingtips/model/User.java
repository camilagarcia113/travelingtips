package unq.tip.travelingtips.model;

import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.Id;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Entity
public class User implements Serializable{

    private static final long serialVersionUID = 1L;

    @Id
    private String id;
    private String name;
    private String photoUrl;
    private String email;

    @ElementCollection
    private List<Long> favouriteTravels;

    public User() {}

    public User(String anId, String aName, String aUrl, String anEmail) {
        id = anId;
        name = aName;
        photoUrl = aUrl;
        email = anEmail;
        favouriteTravels = new ArrayList<>();
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
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

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public List<Long> getFavouriteTravels() {
        return favouriteTravels;
    }

    public void setFavouriteTravels(List<Long> favouriteTravels) {
        this.favouriteTravels = favouriteTravels;
    }

    public void addFavouriteTravel(Long travelId) {
        favouriteTravels.add(travelId);
    }
}
