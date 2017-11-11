package unq.tip.travelingtips.model;

import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Entity
//@Table(uniqueConstraints={@UniqueConstraint(columnNames={"ID", "TOKEN"})})
public class User implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Long id;

    private String token;
    private String name;
    private String photoUrl;

    @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private List<Travel> favouriteTravels;

    @ElementCollection
    private List<String> friends;

    public User() {}

    public User(String aToken, String aName, String aUrl) {
        token = aToken;
        name = aName;
        photoUrl = aUrl;
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

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
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

    public List<Travel> getFavouriteTravels() {
        return favouriteTravels;
    }

    public void setFavouriteTravels(List<Travel> favouriteTravels) {
        this.favouriteTravels = favouriteTravels;
    }

    public void addFavouriteTravel(Travel travel) {
        favouriteTravels.add(travel);
    }

    public void removeFavouriteTravel(Travel travel) {
        favouriteTravels.remove(travel);
    }

    public List<String> getFriends() {
        return friends;
    }

    public void setFriends(List<String> friends) {
        this.friends = friends;
    }

    public void addFriend(String friend) {
        friends.add(friend);
    }

    public void removeFriend(String friend) {
        friends.remove(friend);
    }
}
