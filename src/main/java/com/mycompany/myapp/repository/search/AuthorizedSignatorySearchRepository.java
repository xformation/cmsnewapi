package com.mycompany.myapp.repository.search;

import com.mycompany.myapp.domain.AuthorizedSignatory;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the AuthorizedSignatory entity.
 */
public interface AuthorizedSignatorySearchRepository extends ElasticsearchRepository<AuthorizedSignatory, Long> {
}
