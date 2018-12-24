package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.CollegeBranches;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the CollegeBranches entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CollegeBranchesRepository extends JpaRepository<CollegeBranches, Long> {

}
