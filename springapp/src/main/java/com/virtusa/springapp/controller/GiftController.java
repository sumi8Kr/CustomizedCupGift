package com.virtusa.springapp.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.virtusa.springapp.model.Gift;
import com.virtusa.springapp.repository.GiftRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
public class GiftController {

    @Autowired
    private GiftRepository repository;

    @GetMapping("/user/getAllgifts")
    @PreAuthorize("hasRole('User')")
    public List<Gift> getAllGiftsUser(){
        return repository.findAll().stream()
        .filter(gift->gift.getQuantity()>0).toList();
    }

    @GetMapping("/admin/getAllGifts")
    @PreAuthorize("hasRole('Admin')")
    public List<Gift> getAllGiftsAdmin(){
        return repository.findAll();
    }

    @PostMapping("/admin/addGift")
    @PreAuthorize("hasRole('Admin')")
    public Gift createGift(@RequestBody Gift gift){
        return repository.save(gift);
    }
    
    @GetMapping("/admin/getGift/{id}")
    @PreAuthorize("hasRole('Admin')")
    public ResponseEntity<Gift> getGiftById(@PathVariable int id){
        Gift gift = repository.findById(id).orElse(null);
        return ResponseEntity.ok(gift);
    }

    @GetMapping("/admin/selectGift/{id}")
    @PreAuthorize("hasRole('Admin')")
    public ResponseEntity<Gift> selectGiftById(@PathVariable int id){
        Gift gift = repository.findById(id).orElse(null);
        return ResponseEntity.ok(gift);
    }

    @PutMapping("/admin/editGift/{id}")
    @PreAuthorize("hasRole('Admin')")
    public ResponseEntity<Gift> updateGiftById(@PathVariable int id, @RequestBody Gift giftDetails){
        Gift gift = repository.findById(id).orElse(null);
        gift.setName(giftDetails.getName());
        gift.setUrl(giftDetails.getUrl());
        gift.setPrice(giftDetails.getPrice());
        gift.setQuantity(giftDetails.getQuantity());
        gift.setDetails(giftDetails.getDetails());

        Gift updateGift = repository.save(gift);
        return ResponseEntity.ok(updateGift);
    }

    @DeleteMapping("/admin/deleteGift/{id}")
    @PreAuthorize("hasRole('Admin')")
    public ResponseEntity<Map<String, Boolean>> deleteGift(@PathVariable int id){
        Gift gift = repository.findById(id).orElse(null);
        repository.delete(gift);
        Map<String, Boolean> response = new HashMap<>();
        response.put("delete", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
}
