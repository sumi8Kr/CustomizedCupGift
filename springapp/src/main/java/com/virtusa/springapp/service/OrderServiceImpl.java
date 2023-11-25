package com.virtusa.springapp.service;

import java.util.List;
import java.util.Optional;

import com.virtusa.springapp.model.Order;
import com.virtusa.springapp.repository.OrderRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class OrderServiceImpl implements OrderServiceInterface{

    @Autowired
    OrderRepository orderRepo;
    public Order addOrder(Order order) {
        return (orderRepo.save(order));
    }

    public List<Order> getAllOrders() {
        List<Order> order = orderRepo.findAll();
        return order;
    }

    public Order getOrderById(int id) {
        Optional<Order> order = orderRepo.findById(id);
        return order.get();
    }

    public void deleteOrder(int id) {
        Optional<Order> order = orderRepo.findById(id);
        orderRepo.delete(order.get());
        
    }

    public void editOrder(Order order) {

        orderRepo.save(order); 
    }
}