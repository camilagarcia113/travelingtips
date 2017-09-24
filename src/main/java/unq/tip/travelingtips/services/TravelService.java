package unq.tip.travelingtips.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import unq.tip.travelingtips.controllers.TravelPojo;
import unq.tip.travelingtips.model.Marker;
import unq.tip.travelingtips.model.Travel;
import unq.tip.travelingtips.repositories.MarkerRepository;
import unq.tip.travelingtips.repositories.TravelRepository;

import java.util.List;

@Service
public class TravelService {

    @Autowired
    private TravelRepository travelRepository;

    @Autowired
    private MarkerRepository markerRepository;

    public void saveTravel(TravelPojo travel) {
        List<Marker> markers = travel.getMarkers();
        Travel newTravel = new Travel(travel.getUser(), travel.getTitle());
        newTravel.setPlacesVisited(markers);
        travelRepository.save(newTravel);
    }
}
