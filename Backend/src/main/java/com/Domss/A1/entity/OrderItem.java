package com.Domss.A1.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String productCode;
    private String description;
    private LocalDate dueDate;
    private Double quantity;
    private Double rate;
    private String per;
    private Double discount;
    private Double amount;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonBackReference
    @JoinColumn(name = "sales_order_id")
    private SalesOrder salesOrder;

    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "order_item_id")
    private Set<BatchWiseItem> batchWiseItems = new HashSet<>();

//    public void setSalesOrder(SalesOrder salesOrder) {
//        this.salesOrder = salesOrder;
//        if (salesOrder != null && !salesOrder.getOrderItems().contains(this)) {
//            salesOrder.getOrderItems().add(this); // Ensure bidirectional consistency
//        }
//    }
//
//    public void addBatchWiseItem(BatchWiseItem batchWiseItem) {
//        if (batchWiseItems == null) {
//            batchWiseItems = new HashSet<>();
//        }
//        batchWiseItems.add(batchWiseItem);
//        batchWiseItem.setOrderItem(this); // Set the owning side
//    }
//
//    public void removeBatchWiseItem(BatchWiseItem batchWiseItem) {
//        batchWiseItems.remove(batchWiseItem);
//        batchWiseItem.setOrderItem(null);
//    }
}
