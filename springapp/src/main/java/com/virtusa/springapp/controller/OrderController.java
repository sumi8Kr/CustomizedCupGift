package com.virtusa.springapp.controller;

import java.util.List;

import com.virtusa.springapp.model.Order;
import com.virtusa.springapp.service.OrderServiceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.security.access.prepost.PreAuthorize;

@RestController
@CrossOrigin
public class OrderController {
    @Autowired
    OrderServiceImpl orderServ;

    @PostMapping("/user/addOrder")
    @PreAuthorize("hasRole('User')")
    public Order addOrder(@RequestBody Order order){
        return orderServ.addOrder(order);   
    }
    @GetMapping("/user/myOrder")
    @PreAuthorize("hasRole('User')")
    public List<Order> getMyOrders(){
        return orderServ.getAllOrders();
    } 
    @PutMapping("/user/editOrder/{orderId}")
    @PreAuthorize("hasRole('User')")
    public void editOrderByUser(@RequestBody Order order, @PathVariable int orderId){
        order.setOrderId(orderId);
        orderServ.editOrder(order);
    }
    @DeleteMapping("/user/deleteOrder/{orderId}")
    @PreAuthorize("hasRole('User')")
    public void deleteOrderByUser(@PathVariable int orderId){
        orderServ.deleteOrder(orderId);
    }
    
    @PreAuthorize("hasRole('Admin')")
    @GetMapping("/admin/getAllOrders")
    public List<Order> getAllOrders(){
        return orderServ.getAllOrders();
    } 
    @PutMapping("/admin/editOrder/{orderId}")
    @PreAuthorize("hasRole('Admin')")
    public void editOrder(@RequestBody Order order, @PathVariable int orderId){
        order.setOrderId(orderId);
        orderServ.editOrder(order);
    }

    
    @DeleteMapping("/admin/deleteOrder/{orderId}")
    @PreAuthorize("hasRole('Admin')")
    public void deleteOrder(@PathVariable int orderId){
        orderServ.deleteOrder(orderId);
    }
    
}
