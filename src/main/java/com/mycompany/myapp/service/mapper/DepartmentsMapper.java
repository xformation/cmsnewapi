package com.mycompany.myapp.service.mapper;

import com.mycompany.myapp.domain.*;
import com.mycompany.myapp.service.dto.DepartmentsDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Departments and its DTO DepartmentsDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface DepartmentsMapper extends EntityMapper<DepartmentsDTO, Departments> {



    default Departments fromId(Long id) {
        if (id == null) {
            return null;
        }
        Departments departments = new Departments();
        departments.setId(id);
        return departments;
    }
}
