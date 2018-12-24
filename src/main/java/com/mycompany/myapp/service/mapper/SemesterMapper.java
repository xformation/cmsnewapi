package com.mycompany.myapp.service.mapper;

import com.mycompany.myapp.domain.*;
import com.mycompany.myapp.service.dto.SemesterDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Semester and its DTO SemesterDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface SemesterMapper extends EntityMapper<SemesterDTO, Semester> {



    default Semester fromId(Long id) {
        if (id == null) {
            return null;
        }
        Semester semester = new Semester();
        semester.setId(id);
        return semester;
    }
}
