package com.virtusa.springapp.service;

import java.util.List;

import com.virtusa.springapp.model.Order;

import org.springframework.stereotype.Component;

@Component
public interface OrderServiceInterface {
    public Order addOrder(Order order);
    public List<Order> getAllOrders();
    public Order getOrderById(int id);
    public void deleteOrder(int id);
    public void editOrder(Order order);
}