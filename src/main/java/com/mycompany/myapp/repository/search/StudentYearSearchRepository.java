package com.mycompany.myapp.repository.search;

import com.mycompany.myapp.domain.StudentYear;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the StudentYear entity.
 */
public interface StudentYearSearchRepository extends ElasticsearchRepository<StudentYear, Long> {
}
