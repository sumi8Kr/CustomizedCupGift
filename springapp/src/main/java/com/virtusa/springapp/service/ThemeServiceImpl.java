package com.virtusa.springapp.service;

import java.util.List;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Autowired;
import com.virtusa.springapp.repository.ThemeRepository;

import com.virtusa.springapp.model.Theme;
import org.springframework.stereotype.Service;

@Service
public class ThemeServiceImpl implements ThemeServiceInterface {
    @Autowired
    private ThemeRepository themedao;

    public void ThemeServiceImp() {
		
	}
    @Override
    public List<Theme> getTheme() {
        return themedao.findAll();
    }
    @Override
    public Theme addTheme(Theme theme) {
        themedao.save(theme);
        return theme;
    }
    @Override
    public String deleteTheme(Long id) {
        themedao.deleteByThemeId(id);
        return "Theme Deleted Successfully!";
    }
    @Override
    public String editTheme(Long id,Theme theme) {
        String theme_name=theme.getThemeName();
        String theme_details=theme.getThemeDetails();
        int theme_price=theme.getThemePrice();
        themedao.editByThemeId(id,theme_name,theme_details,theme_price);
        return "Theme Updated Successfully!";
    }
    
}
