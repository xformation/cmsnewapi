package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.util.Objects;

/**
 * A CollegeBranches.
 */
@Entity
@Table(name = "college_branches")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "collegebranches")
public class CollegeBranches implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "branch_name", nullable = false)
    private String branchName;

    @NotNull
    @Column(name = "description", nullable = false)
    private String description;

    @NotNull
    @Column(name = "college_head", nullable = false)
    private String collegeHead;

    @ManyToOne
    @JsonIgnoreProperties("")
    private College college;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getBranchName() {
        return branchName;
    }

    public CollegeBranches branchName(String branchName) {
        this.branchName = branchName;
        return this;
    }

    public void setBranchName(String branchName) {
        this.branchName = branchName;
    }

    public String getDescription() {
        return description;
    }

    public CollegeBranches description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getCollegeHead() {
        return collegeHead;
    }

    public CollegeBranches collegeHead(String collegeHead) {
        this.collegeHead = collegeHead;
        return this;
    }

    public void setCollegeHead(String collegeHead) {
        this.collegeHead = collegeHead;
    }

    public College getCollege() {
        return college;
    }

    public CollegeBranches college(College college) {
        this.college = college;
        return this;
    }

    public void setCollege(College college) {
        this.college = college;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        CollegeBranches collegeBranches = (CollegeBranches) o;
        if (collegeBranches.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), collegeBranches.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CollegeBranches{" +
            "id=" + getId() +
            ", branchName='" + getBranchName() + "'" +
            ", description='" + getDescription() + "'" +
            ", collegeHead='" + getCollegeHead() + "'" +
            "}";
    }
}
