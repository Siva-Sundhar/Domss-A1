package com.Domss.A1.service;

import com.Domss.A1.dto.CompanyDto;
import com.Domss.A1.entity.Company;
import com.Domss.A1.repository.CompanyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;


import java.util.ArrayList;
import java.util.List;

@Service
public class CompanyService {

    @Autowired
    private CompanyRepository repository;

    public ResponseEntity<Company> saveCompany (CompanyDto companyDto){
        Company company = new Company();
        company.setName(companyDto.getName());
        company.setMailingName(companyDto.getMailingName());
        company.setAddress1(companyDto.getAddress1());
        company.setAddress2(companyDto.getAddress2());
        company.setAddress3(companyDto.getAddress3());
        company.setAddress4(companyDto.getAddress4());
        company.setCity(companyDto.getCity());
        company.setDistrict(companyDto.getDistrict());
        company.setState(companyDto.getState());
        company.setCountry(companyDto.getCountry());
        company.setPincode(companyDto.getPincode());
        company.setTelephone(companyDto.getTelephone());
        company.setMobile(companyDto.getMobile());
        company.setEmail(companyDto.getEmail());
        company.setWebsite(companyDto.getWebsite());
        company.setGstNo(companyDto.getGstNo());
        company.setPanNo(companyDto.getPanNo());
        company.setMsmeNo(companyDto.getMsmeNo());
        company.setFssaiNo(companyDto.getFssaiNo());
        company.setIsMainCompany(companyDto.getIsMainCompany());

        if (companyDto.getMainCompany() != null && companyDto.getMainCompany().getId() != null) {
            Company mainCompany = repository.findMainCompanyById(companyDto.getMainCompany().getId());
            company.setMainCompany(mainCompany);
        }
        return new ResponseEntity<>(repository.save(company), HttpStatus.CREATED);
    }

    public ResponseEntity<List<Company>> allCompany() {
        try {
            return new ResponseEntity<>(repository.findAll(), HttpStatus.OK);
        } catch (Exception e){
            System.out.println(e.getMessage());
        }
        return new ResponseEntity<>(new ArrayList<>(), HttpStatus.BAD_REQUEST);
    }

    public ResponseEntity<Company> getCompany(Long id) {
        try {
            return new ResponseEntity<>(repository.findById(id).get(), HttpStatus.OK);
        } catch (Exception e){
            System.out.println();
        }
        return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
    }

    public ResponseEntity<List<Company>> getMainCompanies() {
        try {
            return new ResponseEntity<>(repository.findByIsMainCompany(true), HttpStatus.OK);
        } catch (Exception e){
            System.out.println(e.getMessage());
        }
        return new ResponseEntity<>(new ArrayList<>(), HttpStatus.BAD_REQUEST);
    }
}
