package com.virtusa.springapp.service;

import java.util.List;
import java.util.UUID;

import com.virtusa.springapp.model.Theme;

public interface ThemeServiceInterface {
    List<Theme> getTheme();
    Theme addTheme(Theme theme);
    String deleteTheme(Long id);
    String editTheme(Long id,Theme theme);
}
