package com.virtusa.springapp.repository;


import com.virtusa.springapp.model.Gift;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GiftRepository extends JpaRepository<Gift, Integer >  {

    
}
