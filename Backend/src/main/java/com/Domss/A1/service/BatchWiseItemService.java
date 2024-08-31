package com.Domss.A1.service;

import com.Domss.A1.entity.BatchWiseItem;
import com.Domss.A1.repository.BatchWiseItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class BatchWiseItemService {
    @Autowired
    private BatchWiseItemRepository batchWiseItemRepository;

    public ResponseEntity<BatchWiseItem> saveItem(BatchWiseItem batchWiseItem){
        try {
            return new ResponseEntity<>(batchWiseItemRepository.save(batchWiseItem), HttpStatus.CREATED);
        } catch (Exception e){
            System.out.println(e.getMessage());
            e.printStackTrace();
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    public ResponseEntity<List<BatchWiseItem>> getAllItems(){
        try {
            return new ResponseEntity<>(batchWiseItemRepository.findAll(), HttpStatus.OK);
        } catch (Exception e){
            e.printStackTrace();
            System.out.println(e.getMessage());
        }
        return new ResponseEntity<>(new ArrayList<>(), HttpStatus.BAD_REQUEST);
    }
}
