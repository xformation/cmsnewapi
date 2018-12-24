package com.mycompany.myapp.service.mapper;

import com.mycompany.myapp.domain.*;
import com.mycompany.myapp.service.dto.LegalEntityDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity LegalEntity and its DTO LegalEntityDTO.
 */
@Mapper(componentModel = "spring", uses = {AuthorizedSignatoryMapper.class})
public interface LegalEntityMapper extends EntityMapper<LegalEntityDTO, LegalEntity> {

    @Mapping(source = "authorizedSignatory.id", target = "authorizedSignatoryId")
    LegalEntityDTO toDto(LegalEntity legalEntity);

    @Mapping(source = "authorizedSignatoryId", target = "authorizedSignatory")
    LegalEntity toEntity(LegalEntityDTO legalEntityDTO);

    default LegalEntity fromId(Long id) {
        if (id == null) {
            return null;
        }
        LegalEntity legalEntity = new LegalEntity();
        legalEntity.setId(id);
        return legalEntity;
    }
}
