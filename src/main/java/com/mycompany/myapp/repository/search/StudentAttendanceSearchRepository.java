package com.mycompany.myapp.repository.search;

import com.mycompany.myapp.domain.StudentAttendance;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the StudentAttendance entity.
 */
public interface StudentAttendanceSearchRepository extends ElasticsearchRepository<StudentAttendance, Long> {
}
