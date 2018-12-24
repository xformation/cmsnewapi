package com.mycompany.myapp.service.dto;

import java.time.LocalDate;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;
import com.mycompany.myapp.domain.enumeration.Status;

/**
 * A DTO for the StudentAttendance entity.
 */
public class StudentAttendanceDTO implements Serializable {

    private Long id;

    @NotNull
    private LocalDate attendanceDate;

    @NotNull
    private String sName;

    @NotNull
    private Status status;

    @NotNull
    private String comments;

    private Long studentYearId;

    private Long departmentsId;

    private Long subjectId;

    private Long semesterId;

    private Long sectionId;

    private Long periodsId;

    private Long studentId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getAttendanceDate() {
        return attendanceDate;
    }

    public void setAttendanceDate(LocalDate attendanceDate) {
        this.attendanceDate = attendanceDate;
    }

    public String getsName() {
        return sName;
    }

    public void setsName(String sName) {
        this.sName = sName;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public String getComments() {
        return comments;
    }

    public void setComments(String comments) {
        this.comments = comments;
    }

    public Long getStudentYearId() {
        return studentYearId;
    }

    public void setStudentYearId(Long studentYearId) {
        this.studentYearId = studentYearId;
    }

    public Long getDepartmentsId() {
        return departmentsId;
    }

    public void setDepartmentsId(Long departmentsId) {
        this.departmentsId = departmentsId;
    }

    public Long getSubjectId() {
        return subjectId;
    }

    public void setSubjectId(Long subjectId) {
        this.subjectId = subjectId;
    }

    public Long getSemesterId() {
        return semesterId;
    }

    public void setSemesterId(Long semesterId) {
        this.semesterId = semesterId;
    }

    public Long getSectionId() {
        return sectionId;
    }

    public void setSectionId(Long sectionId) {
        this.sectionId = sectionId;
    }

    public Long getPeriodsId() {
        return periodsId;
    }

    public void setPeriodsId(Long periodsId) {
        this.periodsId = periodsId;
    }

    public Long getStudentId() {
        return studentId;
    }

    public void setStudentId(Long studentId) {
        this.studentId = studentId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        StudentAttendanceDTO studentAttendanceDTO = (StudentAttendanceDTO) o;
        if (studentAttendanceDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), studentAttendanceDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "StudentAttendanceDTO{" +
            "id=" + getId() +
            ", attendanceDate='" + getAttendanceDate() + "'" +
            ", sName='" + getsName() + "'" +
            ", status='" + getStatus() + "'" +
            ", comments='" + getComments() + "'" +
            ", studentYear=" + getStudentYearId() +
            ", departments=" + getDepartmentsId() +
            ", subject=" + getSubjectId() +
            ", semester=" + getSemesterId() +
            ", section=" + getSectionId() +
            ", periods=" + getPeriodsId() +
            ", student=" + getStudentId() +
            "}";
    }
}
