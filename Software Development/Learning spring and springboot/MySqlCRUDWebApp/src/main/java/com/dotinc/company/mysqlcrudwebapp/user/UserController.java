package com.dotinc.company.mysqlcrudwebapp.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.util.List;

@Controller
public class UserController {

    @Autowired
    private UserService service;

    @GetMapping("/users")
    private String showUserList(Model model) {
        List<User> listUsers = service.listAll();

        model.addAttribute("listUsers", listUsers);
        return "users";
    }

    @GetMapping("/users/new")
    public String showRegistrationForm(Model model) {
        model.addAttribute("user", new User());
        model.addAttribute("pageTitle", "New User Registration");
        return "registration_form";
    }

    @PostMapping("/users/save")
    public String newUserRegistrationProcess(User user, RedirectAttributes redirectAttributes) {
        service.save(user);
        redirectAttributes.addFlashAttribute("message", "The new user has been successfully added!");
        return "redirect:/users";
    }

    @GetMapping("/user/{id}/edit")
    public String showEditForm(@PathVariable("id") Integer id, Model model, RedirectAttributes redirectAttributes) {
        try {
           User user= service.getUserById(id);
           model.addAttribute("user", user);
           model.addAttribute("pageTitle", "Edit user #"+id);
           redirectAttributes.addFlashAttribute("message_info", "The update is successful");
           return "registration_form";
        } catch (UserNotFoundException e) {
            redirectAttributes.addFlashAttribute("message_warning", e.getMessage());
            return "redirect:/users";
        }
    }


    @GetMapping("/user/{id}/delete")
    public String deleteUser(@PathVariable("id") Integer id, RedirectAttributes redirectAttributes) {
        try {
            User user= service.getUserById(id);
            service.deleteUserById(id);
            redirectAttributes.addFlashAttribute("message_danger", "The user <<"+
                    user.getFirstName() + " " +user.getLastName() + ">> have been successfully and definitely deleted");
        } catch (UserNotFoundException e) {
            redirectAttributes.addFlashAttribute("message_warning", e.getMessage());
        }

        return "redirect:/users";
    }
}
