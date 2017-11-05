package unq.tip.travelingtips.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import unq.tip.travelingtips.controllers.pojo.UserPojo;
import unq.tip.travelingtips.model.Travel;
import unq.tip.travelingtips.model.User;
import unq.tip.travelingtips.repositories.TravelRepository;
import unq.tip.travelingtips.repositories.UserRepository;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TravelRepository travelRepository;

    public void saveUser(UserPojo user) {
        User newUser = new User(user.getId(), user.getName(), user.getPhotoUrl(), user.getEmail());
        userRepository.save(newUser);
    }

    public User getUser(String userId) {
        return userRepository.findOne(userId);
    }

    public List<User> findByName(String name) {
        return userRepository.findByNameContainingIgnoreCase(name);
    }

    public void addToFavourites(Long travelId, String user) {
        User userFound = userRepository.findOne(user);
        userFound.addFavouriteTravel(travelId);
        userRepository.save(userFound);
    }

    public List<Travel> getFavourites(String userId) {
        User user = userRepository.findOne(userId);
        List<Long> favouritesIds = user.getFavouriteTravels();
        return (List<Travel>) travelRepository.findAll(favouritesIds);
    }
}
