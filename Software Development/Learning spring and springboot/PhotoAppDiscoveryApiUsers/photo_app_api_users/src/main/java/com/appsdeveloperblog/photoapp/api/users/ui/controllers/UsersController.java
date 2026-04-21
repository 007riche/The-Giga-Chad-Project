package com.appsdeveloperblog.photoapp.api.users.ui.controllers;

import org.springframework.web.bind.annotation.RestController;

import com.appsdeveloperblog.photoapp.api.users.service.UserService;
import com.appsdeveloperblog.photoapp.api.users.shared.UserDTO;
import com.appsdeveloperblog.photoapp.api.users.ui.model.CreateUserRequestModel;

import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.RequestMapping;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/users")
public class UsersController {

    @Autowired
    private Environment environment;

    @Autowired
    UserService userService;

    @GetMapping("/status/check")
    public String status() {
        return "Work in progress in an instance of " + environment.getProperty("local.server.port");
    }

    @GetMapping
    public String hitMe() {
        return "Hit me at the base /users";
    }

    @PostMapping
    public String createUser(@Valid @RequestBody CreateUserRequestModel userDetails) {
        // TODO: process POST request
        ModelMapper modelMapper = new ModelMapper();
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);

        UserDTO userDTO = modelMapper.map(userDetails, UserDTO.class);
        userService.createUser(userDTO);
        return "entity";
    }

}
