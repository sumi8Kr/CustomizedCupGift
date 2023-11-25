package com.virtusa.springapp.service;

import com.virtusa.springapp.model.User;

import org.springframework.stereotype.Component;

@Component
public interface UserServiceInterface {
    User registerNewUser(User user);
    void saveUser(User user);
    User findUserByEmail(String email);
    User getById(Integer id);
    String deleteUser(Integer id);
}
