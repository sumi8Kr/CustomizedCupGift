package com.virtusa.springapp.service;

import java.util.List;

import com.virtusa.springapp.model.User;
import com.virtusa.springapp.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserServiceInterface{

	@Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;
    
    public User registerNewUser(User user) {
        user.setPassword(getEncodedPassword(user.getPassword()));
        return userRepository.save(user);
    }
    public void saveUser(User user) {
    	userRepository.save(user);
    }
    public String getEncodedPassword(String password) {
        return passwordEncoder.encode(password);
    }
    public User findUserByEmail(String email) {
		User user = userRepository.findByEmail(email);
		return user;
	}
    
    public List<User> getAllUsers(){
    	List<User> users = userRepository.findAll().stream()
    			.filter(user->!user.getUserRole().equals("SuperAdmin")).toList();
		return users;
	}
    
    public User getById(Integer id){
        return userRepository.findById(id).get();
    }
    
    public String deleteUser(Integer id) {
    	userRepository.deleteById(id);
    	return "User deleted successfully";
    }
}
