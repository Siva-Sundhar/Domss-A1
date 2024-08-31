package com.Domss.A1.controller;

import com.Domss.A1.entity.BatchWiseItem;
import com.Domss.A1.service.BatchWiseItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("batch")
public class BatchWiseItemController {

    @Autowired
    private BatchWiseItemService batchWiseItemService;

    @GetMapping("allItems")
    public ResponseEntity<List<BatchWiseItem>> getItems(){
        return batchWiseItemService.getAllItems();
    }

    @PostMapping("saveItem")
    public ResponseEntity<BatchWiseItem> saveItem(@RequestBody BatchWiseItem batchWiseItem){
        return batchWiseItemService.saveItem(batchWiseItem);
    }
}
