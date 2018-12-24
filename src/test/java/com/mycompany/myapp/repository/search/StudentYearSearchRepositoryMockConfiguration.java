package com.mycompany.myapp.repository.search;

import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Configuration;

/**
 * Configure a Mock version of StudentYearSearchRepository to test the
 * application without starting Elasticsearch.
 */
@Configuration
public class StudentYearSearchRepositoryMockConfiguration {

    @MockBean
    private StudentYearSearchRepository mockStudentYearSearchRepository;

}
