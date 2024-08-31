package com.Domss.A1.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class BatchWiseItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String dueDate;
    private String location;
    private String batchNo;
    private BigDecimal quantity;
    private BigDecimal rate;
    private String uom;
    private BigDecimal discount;
    private BigDecimal amount;

//    @ManyToOne(fetch = FetchType.LAZY)
//    @JsonBackReference
//    @JoinColumn(name = "order_item_id")
//    private OrderItem orderItem;

//    public void setOrderItem(OrderItem orderItem) {
//        this.orderItem = orderItem;
//        if (orderItem != null && !orderItem.getBatchWiseItems().contains(this)) {
//            orderItem.getBatchWiseItems().add(this); // Ensure bidirectional consistency
//        }
//    }
}
