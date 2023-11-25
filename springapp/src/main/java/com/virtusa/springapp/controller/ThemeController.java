package com.virtusa.springapp.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.CrossOrigin;
import com.virtusa.springapp.model.Theme;
import com.virtusa.springapp.service.ThemeServiceInterface;
@CrossOrigin(origins="http://localhost:3000/")
@RestController
public class ThemeController {
    
    @Autowired
    private ThemeServiceInterface themeService;

   
   @GetMapping("/admin/getTheme")
   @PreAuthorize("hasRole('Admin')")
   public List<Theme> getTheme(){
    return this.themeService.getTheme();
   }
   @PostMapping("/admin/addTheme")
   @PreAuthorize("hasRole('Admin')")
   public Theme addTheme(@RequestBody Theme theme){
       return this.themeService.addTheme(theme);
   }
   @DeleteMapping("/admin/deleteTheme/{themeId}")
   @PreAuthorize("hasRole('Admin')")
   public String deleteTheme(@PathVariable(value="themeId") Long id){
       return this.themeService.deleteTheme(id);
   }
   @PutMapping("/admin/editTheme/{themeId}")
   @PreAuthorize("hasRole('Admin')")
   public String editTheme(@PathVariable(value="themeId") Long id,@RequestBody Theme theme){
       return this.themeService.editTheme(id,theme);
   }

}
