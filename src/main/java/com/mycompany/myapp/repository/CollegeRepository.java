package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.College;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the College entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CollegeRepository extends JpaRepository<College, Long> {

}
