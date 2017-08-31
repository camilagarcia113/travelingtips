package unq.tip.travelingtips.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import unq.tip.travelingtips.model.Coordinate;
import unq.tip.travelingtips.model.Travel;
import unq.tip.travelingtips.repositories.CoordinateRepository;
import unq.tip.travelingtips.repositories.TravelRepository;

import java.util.List;

@Service
public class TravelService {

    @Autowired
    private TravelRepository travelRepository;

    @Autowired
    private CoordinateRepository coordinateRepository;

    public void saveTravel(List<Coordinate> coordinates) {
        coordinateRepository.save(coordinates);
        Travel travel = new Travel(coordinates);
        travelRepository.save(travel);
    }
}
