package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.StudentYear;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the StudentYear entity.
 */
@SuppressWarnings("unused")
@Repository
public interface StudentYearRepository extends JpaRepository<StudentYear, Long> {

}
