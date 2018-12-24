package com.mycompany.myapp.repository.search;

import com.mycompany.myapp.domain.Semester;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Semester entity.
 */
public interface SemesterSearchRepository extends ElasticsearchRepository<Semester, Long> {
}
