package com.mycompany.myapp.repository.search;

import com.mycompany.myapp.domain.Departments;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Departments entity.
 */
public interface DepartmentsSearchRepository extends ElasticsearchRepository<Departments, Long> {
}
