package com.mycompany.myapp.repository.search;

import com.mycompany.myapp.domain.Periods;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Periods entity.
 */
public interface PeriodsSearchRepository extends ElasticsearchRepository<Periods, Long> {
}
