package com.virtusa.springapp.model;

import java.util.UUID;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.GenerationType;
import org.hibernate.annotations.GenericGenerator;

@Entity
public class Theme {
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long themeId;
    private String themeName,themeDetails;
    private int themePrice;


    public Theme(Long id, String themeName, String themeDetails, int themePrice) {
        this.themeId = id;
        this.themeName = themeName;
        this.themeDetails = themeDetails;
        this.themePrice = themePrice;
    }

    public Theme() {
    }


    public Long getId() {
        return this.themeId;
    }

    public void setId(Long id) {
        this.themeId = id;
    }

    public String getThemeName() {
        return this.themeName;
    }

    public void setThemeName(String themeName) {
        this.themeName = themeName;
    }

    public String getThemeDetails() {
        return this.themeDetails;
    }

    public void setThemeDetails(String themeDetails) {
        this.themeDetails = themeDetails;
    }

    public int getThemePrice() {
        return this.themePrice;
    }

    public void setThemePrice(int themePrice) {
        this.themePrice = themePrice;
    }

    @Override
    public String toString() {
        return "{" +
            " themeId='" + getId() + "'" +
            ", themeName='" + getThemeName() + "'" +
            ", themeDetails='" + getThemeDetails() + "'" +
            ", themePrice='" + getThemePrice() + "'" +
            "}";
    }


}
