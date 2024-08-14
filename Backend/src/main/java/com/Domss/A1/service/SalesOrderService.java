package com.Domss.A1.service;

import com.Domss.A1.entity.OrderItems;
import com.Domss.A1.entity.SalesOrder;
import com.Domss.A1.repository.OrderItemsRepository;
import com.Domss.A1.repository.SalesOrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class SalesOrderService {


    @Autowired
    private SalesOrderRepository orderRepository;


    public ResponseEntity<SalesOrder> saveOrder(SalesOrder order){
        try {
//            List<OrderItems> items = order.getOrderItems().stream().map(item ->{
//                OrderItems orderItems = new OrderItems();
//                orderItems.setProductCode(item.getProductCode());
//                orderItems.setDescription(item.getDescription());
//                orderItems.setDueDate(item.getDueDate());
//                orderItems.setQuantity(item.getQuantity());
//                orderItems.setRate(item.getRate());
//                orderItems.setPer(item.getPer());
//                orderItems.setDiscount(item.getDiscount());
//                orderItems.setAmount(item.getAmount());
//                return orderItems;
//            }).toList();
//            order.setOrderItems(items);
            order.getOrderItems().forEach(item -> item.setSalesOrder(order));
            return new ResponseEntity<>(orderRepository.save(order), HttpStatus.CREATED);
        } catch (Exception e){
            System.out.println(e.getMessage());
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
}
