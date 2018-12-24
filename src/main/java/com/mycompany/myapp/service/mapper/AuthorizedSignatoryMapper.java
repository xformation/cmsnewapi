package com.mycompany.myapp.service.mapper;

import com.mycompany.myapp.domain.*;
import com.mycompany.myapp.service.dto.AuthorizedSignatoryDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity AuthorizedSignatory and its DTO AuthorizedSignatoryDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface AuthorizedSignatoryMapper extends EntityMapper<AuthorizedSignatoryDTO, AuthorizedSignatory> {



    default AuthorizedSignatory fromId(Long id) {
        if (id == null) {
            return null;
        }
        AuthorizedSignatory authorizedSignatory = new AuthorizedSignatory();
        authorizedSignatory.setId(id);
        return authorizedSignatory;
    }
}
