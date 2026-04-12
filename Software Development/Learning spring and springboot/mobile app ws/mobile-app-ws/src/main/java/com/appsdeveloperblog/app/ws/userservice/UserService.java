package com.appsdeveloperblog.app.ws.userservice;

import com.appsdeveloperblog.app.ws.ui.model.request.UpdateUserRequestModel;
import com.appsdeveloperblog.app.ws.ui.model.request.UserDetailsRequestModel;
import com.appsdeveloperblog.app.ws.ui.model.response.UserRest;

public interface UserService {

   UserRest createUser(UserDetailsRequestModel userDetailsRequestModel);
   UserRest getUser(String userId);
   UserRest updateUser(String userId, UpdateUserRequestModel updateUserRequestModel);
   void deleteUser( String userId);
} 