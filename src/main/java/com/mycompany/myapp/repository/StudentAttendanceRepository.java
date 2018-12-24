package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.StudentAttendance;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the StudentAttendance entity.
 */
@SuppressWarnings("unused")
@Repository
public interface StudentAttendanceRepository extends JpaRepository<StudentAttendance, Long> {

}
