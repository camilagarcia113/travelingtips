package unq.tip.travelingtips.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import unq.tip.travelingtips.controllers.pojo.UserPojo;
import unq.tip.travelingtips.model.User;
import unq.tip.travelingtips.repositories.UserRepository;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

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
}
