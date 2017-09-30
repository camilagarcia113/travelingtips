package unq.tip.travelingtips.repositories;

import org.springframework.data.repository.CrudRepository;
import unq.tip.travelingtips.model.Travel;

import javax.transaction.Transactional;
import java.util.List;

@Transactional
public interface TravelRepository extends CrudRepository<Travel, Long> {

    Travel findByUserAndTitle(String user, String title);

    Long deleteByUserAndTitle(String user, String title);

    List<Travel> findByUser(String user);
}
