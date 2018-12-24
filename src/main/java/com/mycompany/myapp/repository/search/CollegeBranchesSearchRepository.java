package com.mycompany.myapp.repository.search;

import com.mycompany.myapp.domain.CollegeBranches;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the CollegeBranches entity.
 */
public interface CollegeBranchesSearchRepository extends ElasticsearchRepository<CollegeBranches, Long> {
}
