package com.virtusa.springapp.repository;

import java.util.UUID;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.virtusa.springapp.model.Theme;

import org.springframework.data.jpa.repository.JpaRepository;

@Repository

public interface ThemeRepository extends JpaRepository<Theme,Long> {
    @Modifying 
    @Transactional  
    @Query(value = "delete from theme where theme_id=?1",nativeQuery=true)  
    public void deleteByThemeId(Long id);

    @Modifying 
    @Transactional  
    @Query(value = "Update theme set theme_name=?2,theme_details=?3,theme_price=?4 where theme_id=?1",nativeQuery=true)  
    public void editByThemeId(Long id,String theme_name,String theme_details,int theme_price);
}
