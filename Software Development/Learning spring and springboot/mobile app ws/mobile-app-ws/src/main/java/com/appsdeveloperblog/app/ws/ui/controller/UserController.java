package com.appsdeveloperblog.app.ws.ui.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.appsdeveloperblog.app.ws.Exception.UserServiceException;
import com.appsdeveloperblog.app.ws.ui.model.request.UpdateUserRequestModel;
import com.appsdeveloperblog.app.ws.ui.model.request.UserDetailsRequestModel;
import com.appsdeveloperblog.app.ws.ui.model.response.UserRest;
import com.appsdeveloperblog.app.ws.userservice.UserService;
import jakarta.validation.Valid;

@RestController
@RequestMapping("users")
public class UserController {

        @Autowired
        UserService userService;

        @GetMapping
        public String getUsers(@RequestParam(value = "page", defaultValue = "1") int page,
                        @RequestParam(value = "limit", defaultValue = "10") int limit,
                        // Required allows us not to pass the sort parameter to request but still work
                        // but may break the request when no default value isn't specified.
                        // So, it is recommended to set a default value before using it
                        // And the "defaultValue" is the most recommended way
                        @RequestParam(value = "sort", defaultValue = "desc", required = false) String sort) {
                return "Paging request's respnse, Page " + page + " and limit " + limit;
        }

        @GetMapping(path = "/{userId}",

                        // Specifying the response format, just like in Http Headers
                        produces = {
                                        org.springframework.http.MediaType.APPLICATION_JSON_VALUE,
                                        org.springframework.http.MediaType.APPLICATION_XML_VALUE
                        })
        // Request status managed by springboot
        // public UserRest getUser(@PathVariable String userId){

        // UserRest user = new UserRest();

        // user.setEmail("email@domain.fields");
        // user.setFirstName("Sergey");
        // user.setLastName("Dandy");
        // return user;
        // }

        // Manually handling request status
        public ResponseEntity<UserRest> getUser(@PathVariable String userId) {

                // UserRest user = new UserRest();
                // user.setEmail("email@domain.fields");
                // user.setFirstName("Sergey");
                // user.setLastName("Dandy");

                // buggous section
                // String emString = null;
                // int len = emString.length();
                // if (true)
                // throw new UserServiceException("A user service exception occured");
                UserRest user = userService.getUser(userId);
                if (user == null)
                        return new ResponseEntity<UserRest>(HttpStatus.NO_CONTENT);

                return new ResponseEntity<UserRest>(user, HttpStatus.OK);

        }

        // Consumes and produces data in Application JSON and XML formats
        // @Valid // Turns ON the validation on each field of the ResquestDetails
        @PostMapping(consumes = {
                        org.springframework.http.MediaType.APPLICATION_JSON_VALUE,
                        org.springframework.http.MediaType.APPLICATION_XML_VALUE,
        }, produces = {
                        org.springframework.http.MediaType.APPLICATION_JSON_VALUE,
                        org.springframework.http.MediaType.APPLICATION_XML_VALUE,
        })
        public ResponseEntity<UserRest> createUser(
                        @Valid @RequestBody UserDetailsRequestModel userDetailsRequestModel) {

                UserRest user = userService.createUser(userDetailsRequestModel);
                return new ResponseEntity<UserRest>(user, HttpStatus.OK);
        }

        @PutMapping(path = "/{userId}", consumes = {
                        org.springframework.http.MediaType.APPLICATION_JSON_VALUE,
                        org.springframework.http.MediaType.APPLICATION_XML_VALUE,
        }, produces = {
                        org.springframework.http.MediaType.APPLICATION_JSON_VALUE,
                        org.springframework.http.MediaType.APPLICATION_XML_VALUE,
        })
        public UserRest updateUser(@PathVariable String userId,
                        @Valid @RequestBody UpdateUserRequestModel updateUserRequestModel) {

                UserRest retrievedUser = userService.updateUser(userId, updateUserRequestModel);
                return retrievedUser;
        }

        @DeleteMapping(path = "/{userId}")
        public ResponseEntity<Void> deleteUser(@PathVariable String userId) {

                userService.deleteUser(userId);
                return ResponseEntity.noContent().build();
        }
}
