package com.Domss.A1.service;

import com.Domss.A1.entity.Company;
import com.Domss.A1.repository.CompanyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@Service
public class CompanyService {

    @Autowired
    private CompanyRepository repository;

    public ResponseEntity<Company> saveCompany (Company company){
        return new ResponseEntity<>(repository.save(company), HttpStatus.CREATED);
    }
}
