package com.mycompany.myapp.service.mapper;

import com.mycompany.myapp.domain.*;
import com.mycompany.myapp.service.dto.SectionDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Section and its DTO SectionDTO.
 */
@Mapper(componentModel = "spring", uses = {StudentYearMapper.class})
public interface SectionMapper extends EntityMapper<SectionDTO, Section> {

    @Mapping(source = "studentyear.id", target = "studentyearId")
    SectionDTO toDto(Section section);

    @Mapping(source = "studentyearId", target = "studentyear")
    Section toEntity(SectionDTO sectionDTO);

    default Section fromId(Long id) {
        if (id == null) {
            return null;
        }
        Section section = new Section();
        section.setId(id);
        return section;
    }
}
