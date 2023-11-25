package com.virtusa.springapp.controller;

import com.virtusa.springapp.model.JwtResponse;
import com.virtusa.springapp.model.Login;
import com.virtusa.springapp.model.User;
import com.virtusa.springapp.service.JwtService;
import com.virtusa.springapp.service.UserServiceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
public class AuthController {
	
	@Autowired
	private UserServiceImpl userService;

    @Autowired
    private JwtService jwtService;
	
    @PostMapping({"/login"})
    public JwtResponse createJwtToken(@RequestBody Login data) throws Exception {
        return jwtService.createJwtToken(data);
    }

	@PostMapping({"/isAdmin"})
	public boolean isAdminPresent(@RequestBody String email) {
		User user = userService.findUserByEmail(email);
		if (user != null && user.getUserRole().equals("Admin"))
			return(true);
		return(false);
	}
	@PostMapping({"/isUser"})
	public boolean isUserPresent(@RequestBody String email) {
		User user = userService.findUserByEmail(email);
		if (user != null && user.getUserRole().equals("User"))
			return true;
		return false;
	}
	@PostMapping({"/isSuperAdmin"})
	public boolean isSuperAdminPresent(@RequestBody String email) {
		User user = userService.findUserByEmail(email);
		if (user != null && user.getUserRole().equals("SuperAdmin"))
			return true;
		return false;
	}
}
