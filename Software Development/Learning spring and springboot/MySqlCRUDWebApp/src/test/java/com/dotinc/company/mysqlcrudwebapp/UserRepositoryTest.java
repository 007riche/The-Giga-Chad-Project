package com.dotinc.company.mysqlcrudwebapp;

import com.dotinc.company.mysqlcrudwebapp.user.IUserRepository;
import com.dotinc.company.mysqlcrudwebapp.user.User;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.annotation.Rollback;

import java.util.Optional;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@Rollback(value = false)
public class UserRepositoryTest {
    @Autowired private IUserRepository repo;


    @Test
    public void testAddNew() {
        User user = new User();

        user.setEmail("Rickprime@adultswim.com");
        user.setPassword("adminRackur");
        user.setFirstName("Rick");
        user.setLastName("Prime");

        User savedUser = repo.save(user);
//        Assertions.assertNotNull(savedUser);
//        Assertions.
    }

    @Test
    public void testListAll() {
     Iterable<User> users =   repo.findAll();

     Assertions.assertNotNull(users);

     for (User user: users) {
         System.out.println(user);
     }
    }

    @Test
    public void testUpdate() {
        Integer userId =1;
        Optional<User> byId = repo.findById(userId);
        User user = byId.get();
        user.setPassword("geek manga");
        repo.save(user);

        Optional<User> updatedUsers = repo.findById(userId);

        User updatedUser = updatedUsers.get();
       Assertions.assertEquals(updatedUser.getPassword(), "geek manga");

        System.out.println(updatedUser);
    }

    @Test
    public void testGet() {
        Integer userId =2;
        Optional<User> byId = repo.findById(userId);
        User user = byId.get();

        Assertions.assertNotNull(user.getFirstName());
        System.out.println(user);

    }

    @Test
    public void testDelete() {
        Integer userId =2;
        repo.deleteById(userId);

        Optional<User> byId = repo.findById(userId);
//       Assertions.assertNull(byId);
        System.out.println(byId);
    }

}
