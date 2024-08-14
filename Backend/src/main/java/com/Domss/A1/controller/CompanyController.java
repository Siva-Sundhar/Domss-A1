package com.Domss.A1.controller;

import com.Domss.A1.dto.CompanyDto;
import com.Domss.A1.entity.Company;
import com.Domss.A1.service.CompanyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:5173")
@RequestMapping("company")
public class CompanyController {


    @Autowired
    private CompanyService companyService;

    @PostMapping("save_company")
    public ResponseEntity<Company> saveCompany(@RequestBody CompanyDto companyDto){
        return companyService.saveCompany(companyDto);
    }

    @GetMapping("all_company")
    public ResponseEntity<List<Company>> allCompany(){
        return companyService.allCompany();
    }

    @GetMapping("{id}")
    public ResponseEntity<Company> getCompany(@PathVariable Long id){
        return companyService.getCompany(id);
    }

    @GetMapping("mainCompanies")
    public ResponseEntity<List<Company>> getMainCompanies(){
        return companyService.getMainCompanies();
    }
}
