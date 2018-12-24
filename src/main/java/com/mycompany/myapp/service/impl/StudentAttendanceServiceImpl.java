package com.mycompany.myapp.service.impl;

import static org.elasticsearch.index.query.QueryBuilders.queryStringQuery;

import java.util.Collection;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.mycompany.myapp.domain.StudentAttendance;
import com.mycompany.myapp.graphql.resolvers.StudentAttendanceFilter;
import com.mycompany.myapp.graphql.resolvers.StudentAttendanceOrder;
import com.mycompany.myapp.repository.StudentAttendanceRepository;
import com.mycompany.myapp.repository.search.StudentAttendanceSearchRepository;
import com.mycompany.myapp.service.StudentAttendanceService;
import com.mycompany.myapp.service.dto.StudentAttendanceDTO;
import com.mycompany.myapp.service.mapper.StudentAttendanceMapper;

/**
 * Service Implementation for managing StudentAttendance.
 */
@Service
@Transactional
public class StudentAttendanceServiceImpl implements StudentAttendanceService {
	
	@PersistenceContext
    private EntityManager em;

    private final Logger log = LoggerFactory.getLogger(StudentAttendanceServiceImpl.class);

    private final StudentAttendanceRepository studentAttendanceRepository;

    private final StudentAttendanceMapper studentAttendanceMapper;

    private final StudentAttendanceSearchRepository studentAttendanceSearchRepository;

    public StudentAttendanceServiceImpl(StudentAttendanceRepository studentAttendanceRepository, StudentAttendanceMapper studentAttendanceMapper, StudentAttendanceSearchRepository studentAttendanceSearchRepository) {
        this.studentAttendanceRepository = studentAttendanceRepository;
        this.studentAttendanceMapper = studentAttendanceMapper;
        this.studentAttendanceSearchRepository = studentAttendanceSearchRepository;
    }

    /**
     * Save a studentAttendance.
     *
     * @param studentAttendanceDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public StudentAttendanceDTO save(StudentAttendanceDTO studentAttendanceDTO) {
        log.debug("Request to save StudentAttendance : {}", studentAttendanceDTO);

        StudentAttendance studentAttendance = studentAttendanceMapper.toEntity(studentAttendanceDTO);
        studentAttendance = studentAttendanceRepository.save(studentAttendance);
        StudentAttendanceDTO result = studentAttendanceMapper.toDto(studentAttendance);
        studentAttendanceSearchRepository.save(studentAttendance);
        return result;
    }

    /**
     * Get all the studentAttendances.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<StudentAttendanceDTO> findAll() {
        log.debug("Request to get all StudentAttendances");
        return studentAttendanceRepository.findAll().stream()
            .map(studentAttendanceMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one studentAttendance by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<StudentAttendanceDTO> findOne(Long id) {
        log.debug("Request to get StudentAttendance : {}", id);
        return studentAttendanceRepository.findById(id)
            .map(studentAttendanceMapper::toDto);
    }

    /**
     * Delete the studentAttendance by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete StudentAttendance : {}", id);
        studentAttendanceRepository.deleteById(id);
        studentAttendanceSearchRepository.deleteById(id);
    }

    /**
     * Search for the studentAttendance corresponding to the query.
     *
     * @param query the query of the search
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<StudentAttendanceDTO> search(String query) {
        log.debug("Request to search StudentAttendances for query {}", query);
        return StreamSupport
            .stream(studentAttendanceSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .map(studentAttendanceMapper::toDto)
            .collect(Collectors.toList());
    }
    
    @SuppressWarnings("unchecked")
    @Override
    public Collection<StudentAttendance> findAllByFilterOrder(StudentAttendanceFilter filter, List<StudentAttendanceOrder> orders) throws DataAccessException{
   
    	StringBuilder sb = new StringBuilder("SELECT student_attendance FROM StudentAttendance student_attendance");

        Optional<StudentAttendanceFilter> nonNullFilter = Optional.ofNullable(filter);
        nonNullFilter.ifPresent(f -> sb.append(f.buildJpaQuery()));

        sb.append(StudentAttendanceOrder.buildOrderJpaQuery(orders));

        Query query = this.em.createQuery(sb.toString());
        nonNullFilter.ifPresent(f -> f.buildJpaQueryParameters(query));

        return query.getResultList();
    }

}
