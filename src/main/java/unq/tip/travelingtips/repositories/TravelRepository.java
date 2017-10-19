package unq.tip.travelingtips.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.transaction.annotation.Transactional;
import unq.tip.travelingtips.model.Travel;

import java.util.List;

@Transactional(readOnly = true)
public interface TravelRepository extends CrudRepository<Travel, Long> {

    Travel findByUserAndTitle(String user, String title);

    List<Travel> findByUser(String user);

}
