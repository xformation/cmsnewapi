package com.mycompany.myapp.graphql.resolvers;


import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.coxautodev.graphql.tools.GraphQLMutationResolver;
import com.mycompany.myapp.domain.enumeration.ClassPeriods;
import com.mycompany.myapp.domain.enumeration.ClassSection;
import com.mycompany.myapp.domain.enumeration.Common;
import com.mycompany.myapp.domain.enumeration.Elective;
import com.mycompany.myapp.domain.enumeration.NameOfBank;
import com.mycompany.myapp.domain.enumeration.SYear;
import com.mycompany.myapp.domain.enumeration.Sem;
import com.mycompany.myapp.domain.enumeration.Status;
import com.mycompany.myapp.domain.enumeration.TypeOfCollege;
import com.mycompany.myapp.service.dto.AuthorizedSignatoryDTO;
import com.mycompany.myapp.service.dto.BankAccountsDTO;
import com.mycompany.myapp.service.dto.CollegeBranchesDTO;
import com.mycompany.myapp.service.dto.CollegeDTO;
import com.mycompany.myapp.service.dto.DepartmentsDTO;
import com.mycompany.myapp.service.dto.LegalEntityDTO;
import com.mycompany.myapp.service.dto.LocationDTO;
import com.mycompany.myapp.service.dto.PeriodsDTO;
import com.mycompany.myapp.service.dto.SectionDTO;
import com.mycompany.myapp.service.dto.SemesterDTO;
import com.mycompany.myapp.service.dto.StudentAttendanceDTO;
import com.mycompany.myapp.service.dto.StudentDTO;
import com.mycompany.myapp.service.dto.StudentYearDTO;
import com.mycompany.myapp.service.dto.SubjectDTO;
import com.mycompany.myapp.service.dto.TeacherDTO;
import com.mycompany.myapp.service.impl.AuthorizedSignatoryServiceImpl;
import com.mycompany.myapp.service.impl.BankAccountsServiceImpl;
import com.mycompany.myapp.service.impl.CollegeBranchesServiceImpl;
import com.mycompany.myapp.service.impl.CollegeServiceImpl;
import com.mycompany.myapp.service.impl.DepartmentsServiceImpl;
import com.mycompany.myapp.service.impl.LegalEntityServiceImpl;
import com.mycompany.myapp.service.impl.LocationServiceImpl;
import com.mycompany.myapp.service.impl.PeriodsServiceImpl;
import com.mycompany.myapp.service.impl.SectionServiceImpl;
import com.mycompany.myapp.service.impl.SemesterServiceImpl;
import com.mycompany.myapp.service.impl.StudentAttendanceServiceImpl;
import com.mycompany.myapp.service.impl.StudentServiceImpl;
import com.mycompany.myapp.service.impl.StudentYearServiceImpl;
import com.mycompany.myapp.service.impl.SubjectServiceImpl;
import com.mycompany.myapp.service.impl.TeacherServiceImpl;

@Component
public class Mutation implements GraphQLMutationResolver{

	public LocalDate plusDay(LocalDate input) {
        return input.plusDays(1);
    }
	
	@Autowired
	private StudentYearServiceImpl studentYearServiceImpl;
	
	@Autowired
    private SectionServiceImpl sectionServiceImpl;
	
	@Autowired
	private PeriodsServiceImpl periodsServiceImpl;
	
	@Autowired
	private TeacherServiceImpl teacherServiceImpl;
	
	 @Autowired
	 private StudentServiceImpl studentServiceImpl;
	 
	 @Autowired
	 private SubjectServiceImpl subjectServiceImpl;
	
	 @Autowired
	 private CollegeBranchesServiceImpl collegeBranchesServiceImpl;
	 
	 @Autowired
	 private DepartmentsServiceImpl departmentsServiceImpl;
	 
	 @Autowired
	 private LocationServiceImpl locationServiceImpl;
	 
	 @Autowired
	 private CollegeServiceImpl collegeServiceImpl;
	 
	 @Autowired
	 private LegalEntityServiceImpl legalEntityServiceImpl;
		
	 @Autowired
	 private AuthorizedSignatoryServiceImpl authorizedSignatoryServiceImpl;
		
	 @Autowired
	 private BankAccountsServiceImpl bankAccountsServiceImpl;
	 
	 @Autowired
	 private StudentAttendanceServiceImpl studentAttendanceServiceImpl;
		
	 @Autowired
	 private SemesterServiceImpl semesterServiceImpl;
	
	public StudentYearDTO newStudentYear(Long id,SYear sYear) {
		StudentYearDTO studentYearDTO = new StudentYearDTO();
		studentYearDTO.setId(id);
		studentYearDTO.setsYear(sYear);
		StudentYearDTO val =studentYearServiceImpl.save(studentYearDTO);
		return val;
	}
	
	
	public boolean deleteStudentYear(Long id) {
		studentYearServiceImpl.delete(id);
        return true;
    }
	
	public StudentAttendanceDTO newStudentAttendance(Long id,LocalDate attendanceDate,String sName,Status status,String comments,Long studentYearId,Long departmentsId,
			Long subjectId,Long semesterId,Long sectionId,Long periodsId,Long studentId) {
		StudentAttendanceDTO studentAttendanceDTO = new StudentAttendanceDTO();
		studentAttendanceDTO.setId(id);
		studentAttendanceDTO.setAttendanceDate(attendanceDate);
		studentAttendanceDTO.setsName(sName);
		studentAttendanceDTO.setComments(comments);
		studentAttendanceDTO.setStatus(status);
		studentAttendanceDTO.setStudentYearId(studentYearId);
		studentAttendanceDTO.setPeriodsId(periodsId);
		studentAttendanceDTO.setSectionId(sectionId);
		studentAttendanceDTO.setDepartmentsId(departmentsId);
		studentAttendanceDTO.setSemesterId(semesterId);
		studentAttendanceDTO.setStudentId(studentId);
		studentAttendanceDTO.setSubjectId(subjectId);
		StudentAttendanceDTO val =studentAttendanceServiceImpl.save(studentAttendanceDTO);
		return val;
	}
	
	
	public boolean deleteStudentAttendance(Long id) {
		studentAttendanceServiceImpl.delete(id);
        return true;
    }
	
	public SemesterDTO newSemester(Long id,Sem sem) {
		SemesterDTO semesterDTO = new SemesterDTO();
		semesterDTO.setId(id);
		semesterDTO.setSem(sem);
		SemesterDTO val =semesterServiceImpl.save(semesterDTO);
		return val;
	}
	
	
	public boolean deleteSemester(Long id) {
		semesterServiceImpl.delete(id);
        return true;
    }
	
	public SectionDTO newSection(Long id, ClassSection section, Long studentYearId) {
        SectionDTO sectionDTO = new SectionDTO();
        sectionDTO.setId(id);
        sectionDTO.setSection(section);
        sectionDTO.setStudentyearId(studentYearId);
        SectionDTO val = sectionServiceImpl.save(sectionDTO);
        return val;
    }
	
	public boolean deleteSection(Long id) {
		sectionServiceImpl.delete(id);
        return true;
    }
	
	public PeriodsDTO newPeriods(Long id, ClassPeriods periods, Long sectionId) {
	    PeriodsDTO periodsDTO = new PeriodsDTO();
	    periodsDTO.setId(id);
	    periodsDTO.setPeriods(periods);
	    periodsDTO.setSectionId(sectionId);
	    PeriodsDTO val = periodsServiceImpl.save(periodsDTO);
	    return val;
	    }
	
	public boolean deletePeriods(Long id) {
		periodsServiceImpl.delete(id);
        return true;
    }
	
	public TeacherDTO newTeacher(Long id,String tName,Long periodsId){
        TeacherDTO teacherDTO = new TeacherDTO();
        teacherDTO.setId(id);
        teacherDTO.settName(tName);
        teacherDTO.setPeriodsId(periodsId);
        TeacherDTO val = teacherServiceImpl.save(teacherDTO);
        return val;
    }
	
	public boolean deleteTeacher(Long id) {
		teacherServiceImpl.delete(id);
        return true;
    }

	
	public StudentDTO newStudent(Long id,String sName,Boolean attendance,Elective electiveSub,Long teacherId){
        StudentDTO studentDTO = new StudentDTO();
        studentDTO.setId(id);
        studentDTO.setsName(sName);
        studentDTO.setAttendance(attendance);
        studentDTO.setElectiveSub(electiveSub);
        studentDTO.setTeacherId(teacherId);
        StudentDTO val = studentServiceImpl.save(studentDTO);
        return val;
    }
	
	public boolean deleteStudent(Long id) {
		studentServiceImpl.delete(id);
        return true;
    }
	
	public SubjectDTO newSubject(Long id, Common commonSub, Elective electiveSub, Long periodsId, Long studentId, Long teacherId) {
        SubjectDTO subjectDTO = new SubjectDTO();
        subjectDTO.setId(id);
        subjectDTO.setCommonSub(commonSub);
        subjectDTO.setElectiveSub(electiveSub);
        subjectDTO.setPeriodsId(periodsId);
        subjectDTO.setStudentId(studentId);
        subjectDTO.setTeacherId(teacherId);
        SubjectDTO val = subjectServiceImpl.save(subjectDTO);
        return val;
    }
	
	public boolean deleteSubject(Long id) {
		subjectServiceImpl.delete(id);
        return true;
    }
	
	public CollegeBranchesDTO newCollegeBranches(Long id,String branchName,String description,String collegeHead,Long collegeId) {
		  CollegeBranchesDTO collegeBranchesDTO = new CollegeBranchesDTO();
		  collegeBranchesDTO.setId(id);
		  collegeBranchesDTO.setBranchName(branchName);
		  collegeBranchesDTO.setDescription(description);
		  collegeBranchesDTO.setCollegeHead(collegeHead);
		  collegeBranchesDTO.setCollegeId(collegeId);
		  CollegeBranchesDTO val = collegeBranchesServiceImpl.save(collegeBranchesDTO);
	      return val;
		}
	
	public boolean deleteCollegeBranches(Long id) {
		collegeBranchesServiceImpl.delete(id);
        return true;
    }

	public DepartmentsDTO newDepartments(Long id,String name,String description,String deptHead) {
	    DepartmentsDTO departmentsDTO = new DepartmentsDTO();
	    departmentsDTO.setId(id);
	    departmentsDTO.setName(name);
	    departmentsDTO.setDescription(description);
	    departmentsDTO.setDeptHead(deptHead);
	    DepartmentsDTO val = departmentsServiceImpl.save(departmentsDTO);
	    return val;
	}
	
	public boolean deleteDepartments(Long id) {
		departmentsServiceImpl.delete(id);
        return true;
    }

	public LocationDTO newLocation(Long id,String name,String address,String appliesTo) {
		LocationDTO locationDTO = new LocationDTO();
		locationDTO.setId(id);
		locationDTO.setName(name);
		locationDTO.setAddress(address);
		locationDTO.setAppliesTo(appliesTo);
		LocationDTO val = locationServiceImpl.save(locationDTO);
		return val;
	}
	
	public boolean deleteLocation(Long id) {
		locationServiceImpl.delete(id);
        return true;
    }

	
	public CollegeDTO newCollege(Long id, String shortName, Long logo, Long backgroundImage, String instructionInformation) {
		CollegeDTO collegeDTO = new CollegeDTO();
		collegeDTO.setId(id);
		collegeDTO.setShortName(shortName);
		collegeDTO.setLogo(logo);
		collegeDTO.setBackgroundImage(backgroundImage);
		collegeDTO.setInstructionInformation(instructionInformation);
		CollegeDTO val = collegeServiceImpl.save(collegeDTO);
        return val;
    }
	
	public boolean deleteCollege(Long id) {
		collegeServiceImpl.delete(id);
        return true;
    }

	
	public LegalEntityDTO newLegalEntity(Long id,Long logo, String legalNameOfTheCollege, TypeOfCollege typeOfCollege, LocalDate dateOfIncorporation, String registeredOfficeAddress, String collegeIdentificationNumber, String pan, String tan, String tanCircleNumber, String citTdsLocation, String formSignatory, String pfNumber, LocalDate registrationDate, Long esiNumber, LocalDate ptRegistrationDate, String ptSignatory, Long ptNumber, Long authorizedSignatoryId  ) {
		LegalEntityDTO legalEntityDTO =new LegalEntityDTO();
		legalEntityDTO.setId(id);
		legalEntityDTO.setLogo(logo);
		legalEntityDTO.setLegalNameOfTheCollege(legalNameOfTheCollege);
		legalEntityDTO.setTypeOfCollege(typeOfCollege);
		legalEntityDTO.setDateOfIncorporation(dateOfIncorporation);
		legalEntityDTO.setRegisteredOfficeAddress(registeredOfficeAddress);
		legalEntityDTO.setCollegeIdentificationNumber(collegeIdentificationNumber);
		legalEntityDTO.setPan(pan);
		legalEntityDTO.setTan(tan);
		legalEntityDTO.setTanCircleNumber(tanCircleNumber);
		legalEntityDTO.setCitTdsLocation(citTdsLocation);
		legalEntityDTO.setFormSignatory(formSignatory);
		legalEntityDTO.setPfNumber(pfNumber);
		legalEntityDTO.setRegistrationDate(registrationDate);
		legalEntityDTO.setEsiNumber(esiNumber);
		legalEntityDTO.setPtRegistrationDate(ptRegistrationDate);
		legalEntityDTO.setPtSignatory(ptSignatory);
		legalEntityDTO.setPtNumber(ptNumber);
		legalEntityDTO.setAuthorizedSignatoryId(authorizedSignatoryId);
		LegalEntityDTO val = legalEntityServiceImpl.save(legalEntityDTO);
        return val ;
		
	}
	
	public boolean deleteLegalEntity(Long id) {
		legalEntityServiceImpl.delete(id);
        return true;
    }

	
	public AuthorizedSignatoryDTO newAuthorizedSignatory(Long id, String signatoryName, String signatoryFatherName, String signatoryDesignation, String address, String email, String panCardNumber) {
		AuthorizedSignatoryDTO authorizedSignatoryDTO =new AuthorizedSignatoryDTO();
		authorizedSignatoryDTO.setId(id);
		authorizedSignatoryDTO.setSignatoryName(signatoryName);
		authorizedSignatoryDTO.setSignatoryFatherName(signatoryFatherName);
		authorizedSignatoryDTO.setSignatoryDesignation(signatoryDesignation);
		authorizedSignatoryDTO.setAddress(address);
		authorizedSignatoryDTO.setEmail(email);
		authorizedSignatoryDTO.setPanCardNumber(panCardNumber);
		AuthorizedSignatoryDTO val = authorizedSignatoryServiceImpl.save(authorizedSignatoryDTO);
        return val ;
		
	}
	
	public boolean deleteAuthorizedSignatory(Long id) {
		authorizedSignatoryServiceImpl.delete(id);
        return true;
    }

	
	public BankAccountsDTO newBankAccounts(Long id, NameOfBank nameOfBank, Long accountNumber, String typeOfAccount, String ifsCode, String branch, Integer corporateId) {
		BankAccountsDTO bankAccountsDTO =new BankAccountsDTO();
		bankAccountsDTO.setId(id);
		bankAccountsDTO.setNameOfBank(nameOfBank);
		bankAccountsDTO.setAccountNumber(accountNumber);
		bankAccountsDTO.setTypeOfAccount(typeOfAccount);
		bankAccountsDTO.setIfsCode(ifsCode);
		bankAccountsDTO.setBranch(branch);
		bankAccountsDTO.setCorporateId(corporateId);
		BankAccountsDTO val = bankAccountsServiceImpl.save(bankAccountsDTO);
        return val ;
		
	}
	
	public boolean deleteBankAccounts(Long id) {
		bankAccountsServiceImpl.delete(id);
        return true;
    }

	
}

