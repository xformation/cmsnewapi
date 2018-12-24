package com.mycompany.myapp.repository.search;

import com.mycompany.myapp.domain.BankAccounts;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the BankAccounts entity.
 */
public interface BankAccountsSearchRepository extends ElasticsearchRepository<BankAccounts, Long> {
}
