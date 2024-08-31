package com.Domss.A1.controller;

import com.Domss.A1.entity.SalesOrder;
import com.Domss.A1.service.SalesOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SalesOrderController {


    private final SalesOrderService salesOrderService;

    public SalesOrderController(SalesOrderService salesOrderService) {
        this.salesOrderService = salesOrderService;
    }

    @PostMapping("save")
    public ResponseEntity<SalesOrder> saveSaleOrder(@RequestBody SalesOrder order){
        return salesOrderService.saveOrder(order);
    }
}
