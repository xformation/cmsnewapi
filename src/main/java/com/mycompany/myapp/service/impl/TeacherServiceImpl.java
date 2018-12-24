package com.mycompany.myapp.service.impl;

import com.mycompany.myapp.service.TeacherService;
import com.mycompany.myapp.domain.Teacher;
import com.mycompany.myapp.repository.TeacherRepository;
import com.mycompany.myapp.repository.search.TeacherSearchRepository;
import com.mycompany.myapp.service.dto.TeacherDTO;
import com.mycompany.myapp.service.mapper.TeacherMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing Teacher.
 */
@Service
@Transactional
public class TeacherServiceImpl implements TeacherService {

    private final Logger log = LoggerFactory.getLogger(TeacherServiceImpl.class);

    private final TeacherRepository teacherRepository;

    private final TeacherMapper teacherMapper;

    private final TeacherSearchRepository teacherSearchRepository;

    public TeacherServiceImpl(TeacherRepository teacherRepository, TeacherMapper teacherMapper, TeacherSearchRepository teacherSearchRepository) {
        this.teacherRepository = teacherRepository;
        this.teacherMapper = teacherMapper;
        this.teacherSearchRepository = teacherSearchRepository;
    }

    /**
     * Save a teacher.
     *
     * @param teacherDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public TeacherDTO save(TeacherDTO teacherDTO) {
        log.debug("Request to save Teacher : {}", teacherDTO);
        Teacher teacher = teacherMapper.toEntity(teacherDTO);
        teacher = teacherRepository.save(teacher);
        TeacherDTO result = teacherMapper.toDto(teacher);
        teacherSearchRepository.save(teacher);
        return result;
    }

    /**
     * Get all the teachers.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<TeacherDTO> findAll() {
        log.debug("Request to get all Teachers");
        return teacherRepository.findAll().stream()
            .map(teacherMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one teacher by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<TeacherDTO> findOne(Long id) {
        log.debug("Request to get Teacher : {}", id);
        return teacherRepository.findById(id)
            .map(teacherMapper::toDto);
    }

    /**
     * Delete the teacher by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Teacher : {}", id);
        teacherRepository.deleteById(id);
        teacherSearchRepository.deleteById(id);
    }

    /**
     * Search for the teacher corresponding to the query.
     *
     * @param query the query of the search
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<TeacherDTO> search(String query) {
        log.debug("Request to search Teachers for query {}", query);
        return StreamSupport
            .stream(teacherSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .map(teacherMapper::toDto)
            .collect(Collectors.toList());
    }
}
