package unq.tip.travelingtips.repositories;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.context.junit4.SpringRunner;
import unq.tip.travelingtips.model.Marker;
import unq.tip.travelingtips.model.Travel;

import java.util.ArrayList;
import java.util.List;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNull;

@RunWith(SpringRunner.class)
@DataJpaTest
public class TravelRepositoryTest {

    @Autowired
    private TravelRepository travelRepository;

    @Autowired
    private TestEntityManager entityManager;

    private Travel travel1;
    private List<Marker> placesTravel1;

    private Travel travel2;
    private List<Marker> placesTravel2;

    @Before
    public void setUp() {
        Marker marker1 = new Marker("-32.1234", "-45.5678", 1, "Really good", 4);
        Marker marker2 = new Marker("-32.1253", "-45.5678", 2, "Really good", 4);
        Marker marker3 = new Marker("-32.123", "-45.5678", 3, "Really good", 4);
        List<Marker> placesTravel1 = new ArrayList<>();
        placesTravel1.add(marker1);
        placesTravel1.add(marker2);
        placesTravel1.add(marker3);
        travel1 = new Travel("Carlos", "My fabulous trip to NY", "Summary", placesTravel1);

        Marker marker4 = new Marker("-32.1234", "-45.5678", 1, "Really good", 4);
        Marker marker5 = new Marker("-32.123", "-45.5678", 2, "Really good", 4);
        Marker marker6 = new Marker("-32.123", "-45.5678", 3, "Really good", 4);
        Marker marker7 = new Marker("-32.234", "-45.5678", 4, "Really good", 4);
        List<Marker> placesTravel2 = new ArrayList<>();
        placesTravel2.add(marker4);
        placesTravel2.add(marker5);
        placesTravel2.add(marker6);
        placesTravel2.add(marker7);
        travel2 = new Travel("Ricky", "Bolivia and Peru", "Summary", placesTravel2);

        entityManager.persist(travel1);
        entityManager.persist(travel2);
        entityManager.flush();
    }

    @After
    public void cleanDB() {
        travelRepository.deleteAll();
    }

    @Test
    public void shouldFindAllSavedTravels() {
        List<Travel> foundTravels = (List<Travel>) travelRepository.findAll();

        assertEquals(2, foundTravels.size());
        assertEquals(travel1.getTitle(), foundTravels.get(0).getTitle());
        assertEquals(travel1.getSummary(), foundTravels.get(0).getSummary());
        assertEquals(travel1.getUser(), foundTravels.get(0).getUser());
        assertEquals(travel1.getPlacesVisited().size(), foundTravels.get(0).getPlacesVisited().size());

        assertEquals(travel2.getTitle(), foundTravels.get(1).getTitle());
        assertEquals(travel2.getUser(), foundTravels.get(1).getUser());
        assertEquals(travel2.getPlacesVisited().size(), foundTravels.get(1).getPlacesVisited().size());
    }

    @Test
    public void shouldFindTravelByUserAndTitle() {
        Travel foundTravel = travelRepository.findByUserAndTitle("Ricky", "Bolivia and Peru");

        assertEquals(travel2.getTitle(), foundTravel.getTitle());
        assertEquals(travel2.getSummary(), foundTravel.getSummary());
        assertEquals(travel2.getUser(), foundTravel.getUser());
        assertEquals(travel2.getPlacesVisited().size(), foundTravel.getPlacesVisited().size());

    }

    @Test
    public void shouldFindAllUserTravels() {
        Marker marker8 = new Marker("-32.1234", "-45.5678", 1, "Really good", 4);
        Marker marker9 = new Marker("-32.1234", "-45.5678", 2, "Really good", 4);
        List<Marker> placesTravel3 = new ArrayList<>();
        placesTravel3.add(marker8);
        placesTravel3.add(marker9);
        Travel travel3 = new Travel("Carlos", "Tandil", "Summary", placesTravel3);

        entityManager.persist(travel3);

        List<Travel> foundTravels = travelRepository.findByUser("Carlos");

        assertEquals(2, foundTravels.size());
        assertEquals(travel1.getTitle(), foundTravels.get(0).getTitle());
        assertEquals(travel1.getSummary(), foundTravels.get(0).getSummary());
        assertEquals(travel1.getUser(), foundTravels.get(0).getUser());
        assertEquals(travel1.getPlacesVisited().size(), foundTravels.get(0).getPlacesVisited().size());
        assertEquals(travel3.getTitle(), foundTravels.get(1).getTitle());
        assertEquals(travel3.getUser(), foundTravels.get(1).getUser());
        assertEquals(travel3.getPlacesVisited().size(), foundTravels.get(1).getPlacesVisited().size());
    }

    @Test
    public void shouldUpdateASavedTravel() {
        Travel travelToEdit = travelRepository.findByUserAndTitle("Ricky", "Bolivia and Peru");
        travelToEdit.setTitle("Latinoamerica en 3 meses");
        travelRepository.save(travelToEdit);

        Travel foundTravel = travelRepository.findByUserAndTitle("Ricky", "Latinoamerica en 3 meses");

        assertEquals(travel2.getTitle(), foundTravel.getTitle());
        assertEquals(travel2.getSummary(), foundTravel.getSummary());
        assertEquals(travel2.getUser(), foundTravel.getUser());
        assertEquals(travel2.getPlacesVisited().size(), foundTravel.getPlacesVisited().size());
    }

    @Test
    public void shouldDeleteTravel() {
        List<Travel> travels1 = (List<Travel>) travelRepository.findAll();
        assertEquals(2, travels1.size());

        travelRepository.delete(travel1.getId());

        Travel travel = travelRepository.findByUserAndTitle("Carlos", "My fabulous trip to NY");
        assertNull(travel);

        List<Travel> travels2 = (List<Travel>) travelRepository.findAll();
        assertEquals(1, travels2.size());
    }

    @Test
    public void shouldFindByTitle() {
        List<Travel> foundTravels = travelRepository.findByTitleContainingIgnoreCase("trip");

        assertEquals(1, foundTravels.size());
        assertEquals("My fabulous trip to NY", foundTravels.get(0).getTitle());
    }

    @Test
    public void shouldFindByPlace() {
        List<Travel> foundTravels = travelRepository.findTravelByPlacesVisited("-32.1234", "-45.5678");

        assertEquals(2, foundTravels.size());
        assertEquals("My fabulous trip to NY", foundTravels.get(0).getTitle());
        assertEquals("Bolivia and Peru", foundTravels.get(1).getTitle());
    }
}
