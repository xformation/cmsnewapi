package com.mycompany.myapp.service.mapper;

import com.mycompany.myapp.domain.*;
import com.mycompany.myapp.service.dto.CollegeBranchesDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity CollegeBranches and its DTO CollegeBranchesDTO.
 */
@Mapper(componentModel = "spring", uses = {CollegeMapper.class})
public interface CollegeBranchesMapper extends EntityMapper<CollegeBranchesDTO, CollegeBranches> {

    @Mapping(source = "college.id", target = "collegeId")
    CollegeBranchesDTO toDto(CollegeBranches collegeBranches);

    @Mapping(source = "collegeId", target = "college")
    CollegeBranches toEntity(CollegeBranchesDTO collegeBranchesDTO);

    default CollegeBranches fromId(Long id) {
        if (id == null) {
            return null;
        }
        CollegeBranches collegeBranches = new CollegeBranches();
        collegeBranches.setId(id);
        return collegeBranches;
    }
}
