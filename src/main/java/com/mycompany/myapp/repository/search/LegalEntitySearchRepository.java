package com.mycompany.myapp.repository.search;

import com.mycompany.myapp.domain.LegalEntity;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the LegalEntity entity.
 */
public interface LegalEntitySearchRepository extends ElasticsearchRepository<LegalEntity, Long> {
}
