package unq.tip.travelingtips.repositories;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;
import unq.tip.travelingtips.model.Travel;

import java.util.List;

@Transactional(readOnly = true)
public interface TravelRepository extends CrudRepository<Travel, Long> {

    Travel findByUserAndTitle(String user, String title);

    List<Travel> findByUser(String user);

    List<Travel> findByTitleContainingIgnoreCase(String title);

    @Query("SELECT s FROM Travel s LEFT JOIN s.placesVisited q WHERE :latitude = q.latitude AND :longitude = q.longitude")
    List<Travel> findTravelByPlacesVisited(@Param("latitude") String latitude, @Param("longitude") String longitude);
}
