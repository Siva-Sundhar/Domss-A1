package com.Domss.A1.controller;

import com.Domss.A1.entity.Company;
import com.Domss.A1.service.CompanyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("http://localhost:5173")
@RequestMapping("company")
public class CompanyController {


    @Autowired
    private CompanyService companyService;

    @PostMapping("save_company")
    public ResponseEntity<Company> saveCompany(@RequestBody Company company){
        return companyService.saveCompany(company);
    }
}
