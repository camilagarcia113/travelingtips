package unq.tip.travelingtips.repositories;

import org.springframework.data.repository.CrudRepository;
import unq.tip.travelingtips.model.Marker;

import javax.transaction.Transactional;

@Transactional
public interface MarkerRepository extends CrudRepository<Marker, Long> {
}
