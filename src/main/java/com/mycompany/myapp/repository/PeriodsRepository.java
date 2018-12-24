package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Periods;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Periods entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PeriodsRepository extends JpaRepository<Periods, Long> {

}
