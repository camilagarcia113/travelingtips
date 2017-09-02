package unq.tip.travelingtips.repositories;

import org.springframework.data.repository.CrudRepository;
import unq.tip.travelingtips.model.Coordinate;

import javax.transaction.Transactional;

@Transactional
public interface CoordinateRepository extends CrudRepository<Coordinate, Long> {
}
