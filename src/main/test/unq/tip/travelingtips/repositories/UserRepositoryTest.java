package unq.tip.travelingtips.repositories;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.context.junit4.SpringRunner;
import unq.tip.travelingtips.model.User;

import java.util.List;

import static org.junit.Assert.assertEquals;

@RunWith(SpringRunner.class)
@DataJpaTest
public class UserRepositoryTest {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TestEntityManager entityManager;

    private User user1;
    private User user2;
    private User user3;

    @Before
    public void setUp() {
        user1 = new User("123456789", "Carlos", "http://photourl1");
        user2 = new User("123456790", "camila", "http://photourl2");
        user3 = new User("123456791", "Josefa", "http://photourl3");

        userRepository.save(user1);
        userRepository.save(user2);
        userRepository.save(user3);
    }

    @After
    public void cleanDB() {
        userRepository.deleteAll();
    }

    @Test
    public void shouldFindUserByToken() {
        User foundUser = userRepository.findByToken("123456791");

        assertEquals(user3.getToken(), foundUser.getToken());
        assertEquals(user3.getName(), foundUser.getName());
        assertEquals(user3.getPhotoUrl(), foundUser.getPhotoUrl());
    }

    @Test
    public void shouldFindUserByName() {
        List<User> foundUsers = userRepository.findByNameContainingIgnoreCase("ca");

        assertEquals(2, foundUsers.size());
        assertEquals(user1.getName(), foundUsers.get(0).getName());
        assertEquals(user2.getName(), foundUsers.get(1).getName());
    }
}
