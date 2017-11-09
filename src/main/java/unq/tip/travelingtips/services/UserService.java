package unq.tip.travelingtips.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import unq.tip.travelingtips.controllers.pojo.UserPojo;
import unq.tip.travelingtips.model.Travel;
import unq.tip.travelingtips.model.User;
import unq.tip.travelingtips.repositories.TravelRepository;
import unq.tip.travelingtips.repositories.UserRepository;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TravelRepository travelRepository;

    public void saveUser(UserPojo user) {
        User newUser = new User(user.getToken(), user.getName(), user.getPhotoUrl());
        userRepository.save(newUser);
    }

    public User getUser(String userToken) {
        return userRepository.findByToken(userToken);
    }

    public List<User> findByName(String name) {
        return userRepository.findByNameContainingIgnoreCase(name);
    }

    public void addToFavourites(Long travel, String userToken) {
        User userFound = userRepository.findByToken(userToken);
        Travel travelFound = travelRepository.findOne(travel);
        userFound.addFavouriteTravel(travelFound);
        userRepository.save(userFound);
    }

    public List<Travel> getFavourites(String userToken) {
        return userRepository.findByToken(userToken).getFavouriteTravels();
    }

    public void deleteFavouriteTravel(Long travelId, String userToken) {
        User user = userRepository.findByToken(userToken);
        Travel travel = travelRepository.findOne(travelId);
        user.removeFavouriteTravel(travel);
        userRepository.save(user);
    }

    public boolean existsToken(String token) {
        User userFound = userRepository.findByToken(token);
        return userFound != null;
    }
}
