package com.mycompany.myapp.service.dto;

import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;
import com.mycompany.myapp.domain.enumeration.SYear;

/**
 * A DTO for the StudentYear entity.
 */
public class StudentYearDTO implements Serializable {

    private Long id;

    @NotNull
    private SYear sYear;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public SYear getsYear() {
        return sYear;
    }

    public void setsYear(SYear sYear) {
        this.sYear = sYear;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        StudentYearDTO studentYearDTO = (StudentYearDTO) o;
        if (studentYearDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), studentYearDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "StudentYearDTO{" +
            "id=" + getId() +
            ", sYear='" + getsYear() + "'" +
            "}";
    }
}
