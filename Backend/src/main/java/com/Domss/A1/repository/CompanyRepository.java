package com.Domss.A1.repository;

import com.Domss.A1.entity.Company;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.http.HttpStatusCode;

import java.util.List;

public interface CompanyRepository extends JpaRepository<Company, Long> {

    Company findMainCompanyById(Long id);

    List<Company> findByIsMainCompany(Boolean b);
}
