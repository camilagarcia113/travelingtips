package unq.tip.travelingtips.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.transaction.annotation.Transactional;
import unq.tip.travelingtips.model.User;

import java.util.List;

@Transactional(readOnly = true)
public interface UserRepository extends CrudRepository<User, Long> {

    User findByToken(String userToken);

    List<User> findByNameContainingIgnoreCase(String name);
}
