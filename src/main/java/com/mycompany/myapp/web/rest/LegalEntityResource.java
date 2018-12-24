package com.mycompany.myapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mycompany.myapp.service.LegalEntityService;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;
import com.mycompany.myapp.web.rest.util.HeaderUtil;
import com.mycompany.myapp.service.dto.LegalEntityDTO;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing LegalEntity.
 */
@RestController
@RequestMapping("/api")
public class LegalEntityResource {

    private final Logger log = LoggerFactory.getLogger(LegalEntityResource.class);

    private static final String ENTITY_NAME = "legalEntity";

    private final LegalEntityService legalEntityService;

    public LegalEntityResource(LegalEntityService legalEntityService) {
        this.legalEntityService = legalEntityService;
    }

    /**
     * POST  /legal-entities : Create a new legalEntity.
     *
     * @param legalEntityDTO the legalEntityDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new legalEntityDTO, or with status 400 (Bad Request) if the legalEntity has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/legal-entities")
    @Timed
    public ResponseEntity<LegalEntityDTO> createLegalEntity(@Valid @RequestBody LegalEntityDTO legalEntityDTO) throws URISyntaxException {
        log.debug("REST request to save LegalEntity : {}", legalEntityDTO);
        if (legalEntityDTO.getId() != null) {
            throw new BadRequestAlertException("A new legalEntity cannot already have an ID", ENTITY_NAME, "idexists");
        }
        LegalEntityDTO result = legalEntityService.save(legalEntityDTO);
        return ResponseEntity.created(new URI("/api/legal-entities/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /legal-entities : Updates an existing legalEntity.
     *
     * @param legalEntityDTO the legalEntityDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated legalEntityDTO,
     * or with status 400 (Bad Request) if the legalEntityDTO is not valid,
     * or with status 500 (Internal Server Error) if the legalEntityDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/legal-entities")
    @Timed
    public ResponseEntity<LegalEntityDTO> updateLegalEntity(@Valid @RequestBody LegalEntityDTO legalEntityDTO) throws URISyntaxException {
        log.debug("REST request to update LegalEntity : {}", legalEntityDTO);
        if (legalEntityDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        LegalEntityDTO result = legalEntityService.save(legalEntityDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, legalEntityDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /legal-entities : get all the legalEntities.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of legalEntities in body
     */
    @GetMapping("/legal-entities")
    @Timed
    public List<LegalEntityDTO> getAllLegalEntities() {
        log.debug("REST request to get all LegalEntities");
        return legalEntityService.findAll();
    }

    /**
     * GET  /legal-entities/:id : get the "id" legalEntity.
     *
     * @param id the id of the legalEntityDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the legalEntityDTO, or with status 404 (Not Found)
     */
    @GetMapping("/legal-entities/{id}")
    @Timed
    public ResponseEntity<LegalEntityDTO> getLegalEntity(@PathVariable Long id) {
        log.debug("REST request to get LegalEntity : {}", id);
        Optional<LegalEntityDTO> legalEntityDTO = legalEntityService.findOne(id);
        return ResponseUtil.wrapOrNotFound(legalEntityDTO);
    }

    /**
     * DELETE  /legal-entities/:id : delete the "id" legalEntity.
     *
     * @param id the id of the legalEntityDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/legal-entities/{id}")
    @Timed
    public ResponseEntity<Void> deleteLegalEntity(@PathVariable Long id) {
        log.debug("REST request to delete LegalEntity : {}", id);
        legalEntityService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/legal-entities?query=:query : search for the legalEntity corresponding
     * to the query.
     *
     * @param query the query of the legalEntity search
     * @return the result of the search
     */
    @GetMapping("/_search/legal-entities")
    @Timed
    public List<LegalEntityDTO> searchLegalEntities(@RequestParam String query) {
        log.debug("REST request to search LegalEntities for query {}", query);
        return legalEntityService.search(query);
    }

}
