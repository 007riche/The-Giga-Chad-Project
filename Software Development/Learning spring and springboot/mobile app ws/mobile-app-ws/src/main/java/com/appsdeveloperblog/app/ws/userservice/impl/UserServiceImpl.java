package com.appsdeveloperblog.app.ws.userservice.impl;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.appsdeveloperblog.app.ws.shared.Utils;
import com.appsdeveloperblog.app.ws.ui.model.request.UpdateUserRequestModel;
import com.appsdeveloperblog.app.ws.ui.model.request.UserDetailsRequestModel;
import com.appsdeveloperblog.app.ws.ui.model.response.UserRest;
import com.appsdeveloperblog.app.ws.userservice.UserService;

@Service
public class UserServiceImpl implements UserService {
    Map<String, UserRest> users = null;
    Utils utils;

    public UserServiceImpl() {
    }

    @Autowired
    public UserServiceImpl(Utils utils) {
        this.utils = utils;
    }

    @Override
    public UserRest createUser(UserDetailsRequestModel userDetailsRequestModel) {

        if (users == null)
            users = new HashMap<>();

        UserRest user = new UserRest();
        String userId = utils.generateUserId();
        user.setUserId(userId);
        user.setEmail(userDetailsRequestModel.getEmail());
        user.setFirstName(userDetailsRequestModel.getFirstName());
        user.setLastName(userDetailsRequestModel.getLastName());

        // insertion
        users.put(userId, user);
        return user;
    }

    @Override
    public UserRest getUser(String userId) {
        if (users.containsKey(userId)) {
            return users.get(userId);
        }
        return null;
    }

    @Override
    public UserRest updateUser(String userId, UpdateUserRequestModel updateUserRequestModel) {
        UserRest retrievedUser = users.get(userId);
        retrievedUser.setFirstName(updateUserRequestModel.getFirstName());
        retrievedUser.setLastName(updateUserRequestModel.getLastName());

        // updation
        users.put(userId, retrievedUser);
        return retrievedUser;
    }

    @Override
    public void deleteUser(String userId) {
        users.remove(userId);
    }

}
