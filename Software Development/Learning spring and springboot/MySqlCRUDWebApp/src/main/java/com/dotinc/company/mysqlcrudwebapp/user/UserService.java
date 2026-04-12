package com.dotinc.company.mysqlcrudwebapp.user;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private IUserRepository repository;
    public List<User> listAll() {
        return (List<User>) repository.findAll();
    }

    public void save(User user) {
        repository.save(user);
    }


    public User getUserById(Integer id) throws UserNotFoundException {
        Optional<User> results=  repository.findById(id);
        if (results.isPresent()) {
            return results.get();
        }
        throw new UserNotFoundException("Could not find any user with ID "+ id);
    }

    public void deleteUserById(Integer id) throws UserNotFoundException {
        Long total =  repository.countUserById(id);
        if (total==0 || total==null) {
            throw new UserNotFoundException("Could not find any user with ID"+ id);
        }
        repository.deleteById(id);
    }
}
