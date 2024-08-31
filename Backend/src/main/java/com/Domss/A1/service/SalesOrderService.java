package com.Domss.A1.service;

import com.Domss.A1.entity.BatchWiseItem;
import com.Domss.A1.entity.OrderItem;
import com.Domss.A1.entity.SalesOrder;
import com.Domss.A1.repository.SalesOrderRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class SalesOrderService {

    private static final Logger logger = LoggerFactory.getLogger(SalesOrderService.class);


    private final SalesOrderRepository orderRepository;

    public SalesOrderService(SalesOrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    public ResponseEntity<SalesOrder> saveOrder(SalesOrder order) {
        try {
            // Ensure that order.getOrderItems() is not null
//            if (order.getOrderItems() != null) {
//                // Transform OrderItems and their associated BatchWiseItems
//                List<OrderItem> newOrderItems = order.getOrderItems().stream()
//                        .map(item -> {
//                            // Create and populate new OrderItem
//                            OrderItem newOrderItem = new OrderItem();
//                            newOrderItem.setProductCode(item.getProductCode());
//                            newOrderItem.setDescription(item.getDescription());
//                            newOrderItem.setDueDate(item.getDueDate());
//                            newOrderItem.setQuantity(item.getQuantity());
//                            newOrderItem.setRate(item.getRate());
//                            newOrderItem.setPer(item.getPer());
//                            newOrderItem.setDiscount(item.getDiscount());
//                            newOrderItem.setAmount(item.getAmount());
//                            newOrderItem.setSalesOrder(order); // Set parent relationship
//
//                             // Transform and set BatchWiseItems for the new OrderItem
//                            Set<BatchWiseItem> newBatchWiseItems = item.getBatchWiseItems() != null ?
//                                    item.getBatchWiseItems().stream()
//                                            .map(batchWiseItem -> {
//                                                // Create and populate new BatchWiseItem
//                                                BatchWiseItem newBatchWiseItem = new BatchWiseItem();
//                                                newBatchWiseItem.setDueDate(batchWiseItem.getDueDate());
//                                                newBatchWiseItem.setLocation(batchWiseItem.getLocation());
//                                                newBatchWiseItem.setBatchNo(batchWiseItem.getBatchNo());
//                                                newBatchWiseItem.setQuantity(batchWiseItem.getQuantity());
//                                                newBatchWiseItem.setRate(batchWiseItem.getRate());
//                                                newBatchWiseItem.setUom(batchWiseItem.getUom());
//                                                newBatchWiseItem.setDiscount(batchWiseItem.getDiscount());
//                                                newBatchWiseItem.setAmount(batchWiseItem.getAmount());
//                                                newBatchWiseItem.setOrderItem(newOrderItem); // Set parent relationship
//                                                return newBatchWiseItem;
//                                            })
//                                            .collect(Collectors.toSet()) : new HashSet<>();
//
//                            newOrderItem.setBatchWiseItems(newBatchWiseItems); // Set BatchWiseItems to OrderItem
//                            return newOrderItem;
//                        })
//                        .collect(Collectors.toList()); // Collect to List
//
//                // Set the new OrderItems to the SalesOrder
//                order.setOrderItems(newOrderItems);
//            }

            // Save the order and return the response
            return new ResponseEntity<>(orderRepository.save(order), HttpStatus.CREATED);
        } catch (Exception e) {
            logger.error("Error saving SalesOrder: {}", e.getMessage(), e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
