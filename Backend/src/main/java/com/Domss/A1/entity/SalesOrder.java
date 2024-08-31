package com.Domss.A1.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class SalesOrder {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String voucherNo;
    private String partyName;
    private String orderNo;

    @OneToMany( cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "sales_order_id")
    private List<OrderItem> orderItems = new ArrayList<>();

    private String narration;

//    public void addOrderItem(OrderItem item) {
//        if (orderItems == null) {
//            orderItems = new ArrayList<>();
//        }
//        orderItems.add(item);
//        item.setSalesOrder(this);
//    }
//
//    public void removeOrderItem(OrderItem item) {
//        if (orderItems != null) {
//            orderItems.remove(item);
//            item.setSalesOrder(null);
//        }
//    }
}
