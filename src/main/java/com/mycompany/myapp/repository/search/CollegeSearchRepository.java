package com.mycompany.myapp.repository.search;

import com.mycompany.myapp.domain.College;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the College entity.
 */
public interface CollegeSearchRepository extends ElasticsearchRepository<College, Long> {
}
