package com.Domss.A1.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Company {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String mailingName;
    private String address1;
    private String address2;
    private String address3;
    private String address4;
    private String city;
    private String district;
    private String state;
    private String country;
    private String pincode;
    private String telephone;
    private String mobile;
    private String email;
    private String website;
    private String gstNo;
    private String panNo;
    private String msmeNo;
    private String fssaiNo;
    private String headOffice;
    private String branchOffice;
    private String location;

    @Column(nullable = false)
    private Boolean isMainCompany;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "main_company_id")
    @JsonIgnore
    private Company mainCompany;

    @OneToMany(mappedBy = "mainCompany", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonInclude(Include.NON_EMPTY)
    private List<Company> groupCompanies;

    @JsonProperty("groupCompanies")
    public List<Company> getGroupCompanies(){
        if(isMainCompany){
            return groupCompanies;
        }
        return null;
    }
}
