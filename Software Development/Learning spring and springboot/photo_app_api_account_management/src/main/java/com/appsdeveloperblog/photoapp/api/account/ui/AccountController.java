package com.appsdeveloperblog.photoapp.api.account.ui;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
@RequestMapping("/account")
public class AccountController {
    @GetMapping("/status/check")
    public String status() {
        return "Account status under work in progress";
    }

}
