package com.Domss.A1.dto;

import com.Domss.A1.entity.Company;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CompanyDto {

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
    private Boolean isMainCompany;

    private MainCompanyDto mainCompany;

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class MainCompanyDto{
        private Long id;
    }

}
