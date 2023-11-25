package com.virtusa.springapp.repository;


import com.virtusa.springapp.model.Order;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

@Component
@Repository
public interface OrderRepository extends JpaRepository<Order, Integer>{
    
}
