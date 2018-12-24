package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Departments;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Departments entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DepartmentsRepository extends JpaRepository<Departments, Long> {

}
