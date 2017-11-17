package unq.tip.travelingtips.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import unq.tip.travelingtips.controllers.pojo.MarkerPojo;
import unq.tip.travelingtips.controllers.pojo.TravelPojo;
import unq.tip.travelingtips.model.Travel;
import unq.tip.travelingtips.repositories.TravelRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TravelService {

    @Autowired
    private TravelRepository travelRepository;

    public void saveTravel(TravelPojo travel) {
        Travel newTravel = new Travel(travel.getUser(), travel.getTitle(), travel.getSummary(), travel.getMarkers());
        travelRepository.save(newTravel);
    }

    public void updateTravel(TravelPojo travel) {
        Travel newTravel = new Travel(travel.getId(), travel.getUser(), travel.getTitle(), travel.getSummary(), travel.getMarkers());
        travelRepository.save(newTravel);
    }

    public List<Travel> getTravelsFromUser(String user) {
        return travelRepository.findByUser(user);
    }

    public void deleteTravel(Long travelId) {
        travelRepository.delete(travelId);
    }

    public Travel getTravel(Long travelId) {
        return travelRepository.findOne(travelId);
    }

    public List<Travel> getTravelsByTitle(String user, String title) {
        return filterByUser(travelRepository.findByTitleContainingIgnoreCase(title), user);
    }

    public List<Travel> getTravelsByPlace(String user, MarkerPojo marker) {
        List<Travel> travels = (List<Travel>) travelRepository.findAll();
        return filterByUser(getNearTravelsFromMarker(marker, travels), user);
    }

    private List<Travel> getNearTravelsFromMarker(MarkerPojo marker, List<Travel> travels) {
        return travels.stream()
                .filter(travel -> travel.hasAMarkerNear(marker.getLatitude(), marker.getLongitude()))
                .collect(Collectors.toList());
    }

    private List<Travel> filterByUser(List<Travel> travels, String user) {
        return travels.stream()
                .filter(travel -> ! travel.getUser().equals(user))
                .collect(Collectors.toList());
    }
}
