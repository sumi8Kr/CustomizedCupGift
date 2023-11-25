package com.virtusa.springapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.regex.Pattern;

import com.virtusa.springapp.model.User;
import com.virtusa.springapp.service.UserServiceImpl;

@RestController
public class UserController {
	private String emailRegex = "^[a-zA-Z][a-zA-Z0-9_+&*-]*(?:\\.[a-zA-Z0-9_+&*-]+)*@(?:([a-zA-Z])[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,7}$";
	private String mobileRegex = "^[1-9][0-9]{9}";

	@Autowired
	private UserServiceImpl userService;

	@PostMapping({ "/signup" })
	public User registerNewUser(@RequestBody User user) throws Exception {
		if (!Pattern.matches(emailRegex, user.getEmail())) {
			throw new Exception("Invalid email");
		} else if (!Pattern.matches(mobileRegex, user.getMobileNumber())) {
			throw new Exception("Invalid mobile number");
		}
		else if(user.getMobileNumber().length()!=0 || Long.parseLong(user.getMobileNumber())<1000000000){
			throw new Exception("Invalid mobile number");
		}
		else if(user.getUsername().length()<4){
			throw new Exception("user name should have at least 4 character");
		}
		else if(user.getPassword().length()<8){
			throw new Exception("Password must have 8 character");
		}
		user.setUserRole("User");
		return userService.registerNewUser(user);

	}

	@GetMapping("/superAdmin/getAllUsers")
	@PreAuthorize("hasRole('SuperAdmin')")
	public List<User> getUsers() {
		List<User> users = userService.getAllUsers();
		return users;
	}

	@GetMapping("/superAdmin/getUser/{id}")
	@PreAuthorize("hasRole('SuperAdmin')")
	public User getUser(@PathVariable(name = "id") Integer id) throws Exception {

		User user = null;
		try {
			user = userService.getById(id);
		} catch (Exception e) {
			throw new Exception("User not found!");
		}
		return user;
	}

	@DeleteMapping("/superAdmin/deleteUser/{id}")
	@PreAuthorize("hasRole('SuperAdmin')")
	public String deleteUser(@PathVariable(name = "id") Integer id) {
		return userService.deleteUser(id);
	}

	@PutMapping("/superAdmin/editUser/{id}")
	@PreAuthorize("hasRole('SuperAdmin')")
	public String editUser(@RequestBody User newUser, @PathVariable(name = "id") Integer id) {
		User user = userService.getById(id);
		user.setEmail(newUser.getEmail());
		user.setMobileNumber(newUser.getMobileNumber());
		// user.setPassword(newUser.getPassword());
		user.setUsername(newUser.getUsername());
		user.setUserRole(newUser.getUserRole());
		userService.saveUser(user);
		return ("User edited successfully");
	}

	@PostMapping("/superAdmin/addUser")
	@PreAuthorize("hasRole('SuperAdmin')")
	public User addUser(@RequestBody User user) throws Exception {
		if (!Pattern.matches(emailRegex, user.getEmail())) {
			throw new Exception("Invalid email");
		} else if (!Pattern.matches(mobileRegex, user.getMobileNumber())) {
			throw new Exception("Invalid mobile number");
		}
		else if(user.getMobileNumber().length()!=0 || Long.parseLong(user.getMobileNumber())<1000000000){
			throw new Exception("Invalid mobile number");
		}
		else if(user.getUsername().length()<4){
			throw new Exception("user name should have at least 4 character");
		}
		else if(user.getPassword().length()<8){
			throw new Exception("Password must have 8 character");
		}
		user.setUserRole("Admin");
		return userService.registerNewUser(user);
	}
}
