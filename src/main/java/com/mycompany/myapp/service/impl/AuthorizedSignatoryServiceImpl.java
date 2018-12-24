package com.mycompany.myapp.service.impl;

import com.mycompany.myapp.service.AuthorizedSignatoryService;
import com.mycompany.myapp.domain.AuthorizedSignatory;
import com.mycompany.myapp.repository.AuthorizedSignatoryRepository;
import com.mycompany.myapp.repository.search.AuthorizedSignatorySearchRepository;
import com.mycompany.myapp.service.dto.AuthorizedSignatoryDTO;
import com.mycompany.myapp.service.mapper.AuthorizedSignatoryMapper;
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
 * Service Implementation for managing AuthorizedSignatory.
 */
@Service
@Transactional
public class AuthorizedSignatoryServiceImpl implements AuthorizedSignatoryService {

    private final Logger log = LoggerFactory.getLogger(AuthorizedSignatoryServiceImpl.class);

    private final AuthorizedSignatoryRepository authorizedSignatoryRepository;

    private final AuthorizedSignatoryMapper authorizedSignatoryMapper;

    private final AuthorizedSignatorySearchRepository authorizedSignatorySearchRepository;

    public AuthorizedSignatoryServiceImpl(AuthorizedSignatoryRepository authorizedSignatoryRepository, AuthorizedSignatoryMapper authorizedSignatoryMapper, AuthorizedSignatorySearchRepository authorizedSignatorySearchRepository) {
        this.authorizedSignatoryRepository = authorizedSignatoryRepository;
        this.authorizedSignatoryMapper = authorizedSignatoryMapper;
        this.authorizedSignatorySearchRepository = authorizedSignatorySearchRepository;
    }

    /**
     * Save a authorizedSignatory.
     *
     * @param authorizedSignatoryDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public AuthorizedSignatoryDTO save(AuthorizedSignatoryDTO authorizedSignatoryDTO) {
        log.debug("Request to save AuthorizedSignatory : {}", authorizedSignatoryDTO);
        AuthorizedSignatory authorizedSignatory = authorizedSignatoryMapper.toEntity(authorizedSignatoryDTO);
        authorizedSignatory = authorizedSignatoryRepository.save(authorizedSignatory);
        AuthorizedSignatoryDTO result = authorizedSignatoryMapper.toDto(authorizedSignatory);
        authorizedSignatorySearchRepository.save(authorizedSignatory);
        return result;
    }

    /**
     * Get all the authorizedSignatories.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<AuthorizedSignatoryDTO> findAll() {
        log.debug("Request to get all AuthorizedSignatories");
        return authorizedSignatoryRepository.findAll().stream()
            .map(authorizedSignatoryMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one authorizedSignatory by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<AuthorizedSignatoryDTO> findOne(Long id) {
        log.debug("Request to get AuthorizedSignatory : {}", id);
        return authorizedSignatoryRepository.findById(id)
            .map(authorizedSignatoryMapper::toDto);
    }

    /**
     * Delete the authorizedSignatory by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete AuthorizedSignatory : {}", id);
        authorizedSignatoryRepository.deleteById(id);
        authorizedSignatorySearchRepository.deleteById(id);
    }

    /**
     * Search for the authorizedSignatory corresponding to the query.
     *
     * @param query the query of the search
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<AuthorizedSignatoryDTO> search(String query) {
        log.debug("Request to search AuthorizedSignatories for query {}", query);
        return StreamSupport
            .stream(authorizedSignatorySearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .map(authorizedSignatoryMapper::toDto)
            .collect(Collectors.toList());
    }
}
