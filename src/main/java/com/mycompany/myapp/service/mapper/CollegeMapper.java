package com.mycompany.myapp.service.mapper;

import com.mycompany.myapp.domain.*;
import com.mycompany.myapp.service.dto.CollegeDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity College and its DTO CollegeDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface CollegeMapper extends EntityMapper<CollegeDTO, College> {



    default College fromId(Long id) {
        if (id == null) {
            return null;
        }
        College college = new College();
        college.setId(id);
        return college;
    }
}
