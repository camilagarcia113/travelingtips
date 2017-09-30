package unq.tip.travelingtips.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import unq.tip.travelingtips.controllers.TravelPojo;
import unq.tip.travelingtips.model.Marker;
import unq.tip.travelingtips.model.Travel;
import unq.tip.travelingtips.repositories.TravelRepository;

import java.util.List;

@Service
public class TravelService {

    @Autowired
    private TravelRepository travelRepository;

    public void saveTravel(TravelPojo travel) {
        Travel newTravel = new Travel(travel.getUser(), travel.getTitle(), travel.getMarkers());
        travelRepository.save(newTravel);
    }

    public List<Travel> getTravelsFromUser(String user) {
        return travelRepository.findByUser(user);
    }
}
