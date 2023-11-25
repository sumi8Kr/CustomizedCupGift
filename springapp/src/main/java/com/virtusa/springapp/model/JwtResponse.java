package com.virtusa.springapp.model;

public class JwtResponse {

    private String userRole;
    private String jwtToken;
    private int userId;

    public JwtResponse(String userRole, String jwtToken, int userId) {
        this.userRole = userRole;
        this.jwtToken = jwtToken;
        this.userId=userId;
    }

    public int getUserId() {
        return userId;
    }

    public String getUserRole() {
        return userRole;
    }

    public String getJwtToken() {
        return jwtToken;
    }

}
