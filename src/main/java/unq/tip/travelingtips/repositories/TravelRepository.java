package unq.tip.travelingtips.repositories;

import org.springframework.data.repository.CrudRepository;
import unq.tip.travelingtips.model.Travel;

import javax.transaction.Transactional;

@Transactional
public interface TravelRepository extends CrudRepository<Travel, Long> {
}
