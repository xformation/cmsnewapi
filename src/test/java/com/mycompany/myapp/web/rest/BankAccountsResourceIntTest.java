package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.CmsprojectApp;

import com.mycompany.myapp.domain.BankAccounts;
import com.mycompany.myapp.repository.BankAccountsRepository;
import com.mycompany.myapp.repository.search.BankAccountsSearchRepository;
import com.mycompany.myapp.service.BankAccountsService;
import com.mycompany.myapp.service.dto.BankAccountsDTO;
import com.mycompany.myapp.service.mapper.BankAccountsMapper;
import com.mycompany.myapp.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.Collections;
import java.util.List;


import static com.mycompany.myapp.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.elasticsearch.index.query.QueryBuilders.queryStringQuery;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.mycompany.myapp.domain.enumeration.NameOfBank;
/**
 * Test class for the BankAccountsResource REST controller.
 *
 * @see BankAccountsResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = CmsprojectApp.class)
public class BankAccountsResourceIntTest {

    private static final NameOfBank DEFAULT_NAME_OF_BANK = NameOfBank.HDFC;
    private static final NameOfBank UPDATED_NAME_OF_BANK = NameOfBank.SBI;

    private static final Long DEFAULT_ACCOUNT_NUMBER = 1L;
    private static final Long UPDATED_ACCOUNT_NUMBER = 2L;

    private static final String DEFAULT_TYPE_OF_ACCOUNT = "AAAAAAAAAA";
    private static final String UPDATED_TYPE_OF_ACCOUNT = "BBBBBBBBBB";

    private static final String DEFAULT_IFS_CODE = "AAAAAAAAAA";
    private static final String UPDATED_IFS_CODE = "BBBBBBBBBB";

    private static final String DEFAULT_BRANCH = "AAAAAAAAAA";
    private static final String UPDATED_BRANCH = "BBBBBBBBBB";

    private static final Integer DEFAULT_CORPORATE_ID = 1;
    private static final Integer UPDATED_CORPORATE_ID = 2;

    @Autowired
    private BankAccountsRepository bankAccountsRepository;


    @Autowired
    private BankAccountsMapper bankAccountsMapper;
    

    @Autowired
    private BankAccountsService bankAccountsService;

    /**
     * This repository is mocked in the com.mycompany.myapp.repository.search test package.
     *
     * @see com.mycompany.myapp.repository.search.BankAccountsSearchRepositoryMockConfiguration
     */
    @Autowired
    private BankAccountsSearchRepository mockBankAccountsSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restBankAccountsMockMvc;

    private BankAccounts bankAccounts;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final BankAccountsResource bankAccountsResource = new BankAccountsResource(bankAccountsService);
        this.restBankAccountsMockMvc = MockMvcBuilders.standaloneSetup(bankAccountsResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static BankAccounts createEntity(EntityManager em) {
        BankAccounts bankAccounts = new BankAccounts()
            .nameOfBank(DEFAULT_NAME_OF_BANK)
            .accountNumber(DEFAULT_ACCOUNT_NUMBER)
            .typeOfAccount(DEFAULT_TYPE_OF_ACCOUNT)
            .ifsCode(DEFAULT_IFS_CODE)
            .branch(DEFAULT_BRANCH)
            .corporateId(DEFAULT_CORPORATE_ID);
        return bankAccounts;
    }

    @Before
    public void initTest() {
        bankAccounts = createEntity(em);
    }

    @Test
    @Transactional
    public void createBankAccounts() throws Exception {
        int databaseSizeBeforeCreate = bankAccountsRepository.findAll().size();

        // Create the BankAccounts
        BankAccountsDTO bankAccountsDTO = bankAccountsMapper.toDto(bankAccounts);
        restBankAccountsMockMvc.perform(post("/api/bank-accounts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(bankAccountsDTO)))
            .andExpect(status().isCreated());

        // Validate the BankAccounts in the database
        List<BankAccounts> bankAccountsList = bankAccountsRepository.findAll();
        assertThat(bankAccountsList).hasSize(databaseSizeBeforeCreate + 1);
        BankAccounts testBankAccounts = bankAccountsList.get(bankAccountsList.size() - 1);
        assertThat(testBankAccounts.getNameOfBank()).isEqualTo(DEFAULT_NAME_OF_BANK);
        assertThat(testBankAccounts.getAccountNumber()).isEqualTo(DEFAULT_ACCOUNT_NUMBER);
        assertThat(testBankAccounts.getTypeOfAccount()).isEqualTo(DEFAULT_TYPE_OF_ACCOUNT);
        assertThat(testBankAccounts.getIfsCode()).isEqualTo(DEFAULT_IFS_CODE);
        assertThat(testBankAccounts.getBranch()).isEqualTo(DEFAULT_BRANCH);
        assertThat(testBankAccounts.getCorporateId()).isEqualTo(DEFAULT_CORPORATE_ID);

        // Validate the BankAccounts in Elasticsearch
        verify(mockBankAccountsSearchRepository, times(1)).save(testBankAccounts);
    }

    @Test
    @Transactional
    public void createBankAccountsWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = bankAccountsRepository.findAll().size();

        // Create the BankAccounts with an existing ID
        bankAccounts.setId(1L);
        BankAccountsDTO bankAccountsDTO = bankAccountsMapper.toDto(bankAccounts);

        // An entity with an existing ID cannot be created, so this API call must fail
        restBankAccountsMockMvc.perform(post("/api/bank-accounts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(bankAccountsDTO)))
            .andExpect(status().isBadRequest());

        // Validate the BankAccounts in the database
        List<BankAccounts> bankAccountsList = bankAccountsRepository.findAll();
        assertThat(bankAccountsList).hasSize(databaseSizeBeforeCreate);

        // Validate the BankAccounts in Elasticsearch
        verify(mockBankAccountsSearchRepository, times(0)).save(bankAccounts);
    }

    @Test
    @Transactional
    public void checkNameOfBankIsRequired() throws Exception {
        int databaseSizeBeforeTest = bankAccountsRepository.findAll().size();
        // set the field null
        bankAccounts.setNameOfBank(null);

        // Create the BankAccounts, which fails.
        BankAccountsDTO bankAccountsDTO = bankAccountsMapper.toDto(bankAccounts);

        restBankAccountsMockMvc.perform(post("/api/bank-accounts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(bankAccountsDTO)))
            .andExpect(status().isBadRequest());

        List<BankAccounts> bankAccountsList = bankAccountsRepository.findAll();
        assertThat(bankAccountsList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkAccountNumberIsRequired() throws Exception {
        int databaseSizeBeforeTest = bankAccountsRepository.findAll().size();
        // set the field null
        bankAccounts.setAccountNumber(null);

        // Create the BankAccounts, which fails.
        BankAccountsDTO bankAccountsDTO = bankAccountsMapper.toDto(bankAccounts);

        restBankAccountsMockMvc.perform(post("/api/bank-accounts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(bankAccountsDTO)))
            .andExpect(status().isBadRequest());

        List<BankAccounts> bankAccountsList = bankAccountsRepository.findAll();
        assertThat(bankAccountsList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkTypeOfAccountIsRequired() throws Exception {
        int databaseSizeBeforeTest = bankAccountsRepository.findAll().size();
        // set the field null
        bankAccounts.setTypeOfAccount(null);

        // Create the BankAccounts, which fails.
        BankAccountsDTO bankAccountsDTO = bankAccountsMapper.toDto(bankAccounts);

        restBankAccountsMockMvc.perform(post("/api/bank-accounts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(bankAccountsDTO)))
            .andExpect(status().isBadRequest());

        List<BankAccounts> bankAccountsList = bankAccountsRepository.findAll();
        assertThat(bankAccountsList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkIfsCodeIsRequired() throws Exception {
        int databaseSizeBeforeTest = bankAccountsRepository.findAll().size();
        // set the field null
        bankAccounts.setIfsCode(null);

        // Create the BankAccounts, which fails.
        BankAccountsDTO bankAccountsDTO = bankAccountsMapper.toDto(bankAccounts);

        restBankAccountsMockMvc.perform(post("/api/bank-accounts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(bankAccountsDTO)))
            .andExpect(status().isBadRequest());

        List<BankAccounts> bankAccountsList = bankAccountsRepository.findAll();
        assertThat(bankAccountsList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkBranchIsRequired() throws Exception {
        int databaseSizeBeforeTest = bankAccountsRepository.findAll().size();
        // set the field null
        bankAccounts.setBranch(null);

        // Create the BankAccounts, which fails.
        BankAccountsDTO bankAccountsDTO = bankAccountsMapper.toDto(bankAccounts);

        restBankAccountsMockMvc.perform(post("/api/bank-accounts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(bankAccountsDTO)))
            .andExpect(status().isBadRequest());

        List<BankAccounts> bankAccountsList = bankAccountsRepository.findAll();
        assertThat(bankAccountsList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkCorporateIdIsRequired() throws Exception {
        int databaseSizeBeforeTest = bankAccountsRepository.findAll().size();
        // set the field null
        bankAccounts.setCorporateId(null);

        // Create the BankAccounts, which fails.
        BankAccountsDTO bankAccountsDTO = bankAccountsMapper.toDto(bankAccounts);

        restBankAccountsMockMvc.perform(post("/api/bank-accounts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(bankAccountsDTO)))
            .andExpect(status().isBadRequest());

        List<BankAccounts> bankAccountsList = bankAccountsRepository.findAll();
        assertThat(bankAccountsList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllBankAccounts() throws Exception {
        // Initialize the database
        bankAccountsRepository.saveAndFlush(bankAccounts);

        // Get all the bankAccountsList
        restBankAccountsMockMvc.perform(get("/api/bank-accounts?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(bankAccounts.getId().intValue())))
            .andExpect(jsonPath("$.[*].nameOfBank").value(hasItem(DEFAULT_NAME_OF_BANK.toString())))
            .andExpect(jsonPath("$.[*].accountNumber").value(hasItem(DEFAULT_ACCOUNT_NUMBER.intValue())))
            .andExpect(jsonPath("$.[*].typeOfAccount").value(hasItem(DEFAULT_TYPE_OF_ACCOUNT.toString())))
            .andExpect(jsonPath("$.[*].ifsCode").value(hasItem(DEFAULT_IFS_CODE.toString())))
            .andExpect(jsonPath("$.[*].branch").value(hasItem(DEFAULT_BRANCH.toString())))
            .andExpect(jsonPath("$.[*].corporateId").value(hasItem(DEFAULT_CORPORATE_ID)));
    }
    

    @Test
    @Transactional
    public void getBankAccounts() throws Exception {
        // Initialize the database
        bankAccountsRepository.saveAndFlush(bankAccounts);

        // Get the bankAccounts
        restBankAccountsMockMvc.perform(get("/api/bank-accounts/{id}", bankAccounts.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(bankAccounts.getId().intValue()))
            .andExpect(jsonPath("$.nameOfBank").value(DEFAULT_NAME_OF_BANK.toString()))
            .andExpect(jsonPath("$.accountNumber").value(DEFAULT_ACCOUNT_NUMBER.intValue()))
            .andExpect(jsonPath("$.typeOfAccount").value(DEFAULT_TYPE_OF_ACCOUNT.toString()))
            .andExpect(jsonPath("$.ifsCode").value(DEFAULT_IFS_CODE.toString()))
            .andExpect(jsonPath("$.branch").value(DEFAULT_BRANCH.toString()))
            .andExpect(jsonPath("$.corporateId").value(DEFAULT_CORPORATE_ID));
    }
    @Test
    @Transactional
    public void getNonExistingBankAccounts() throws Exception {
        // Get the bankAccounts
        restBankAccountsMockMvc.perform(get("/api/bank-accounts/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateBankAccounts() throws Exception {
        // Initialize the database
        bankAccountsRepository.saveAndFlush(bankAccounts);

        int databaseSizeBeforeUpdate = bankAccountsRepository.findAll().size();

        // Update the bankAccounts
        BankAccounts updatedBankAccounts = bankAccountsRepository.findById(bankAccounts.getId()).get();
        // Disconnect from session so that the updates on updatedBankAccounts are not directly saved in db
        em.detach(updatedBankAccounts);
        updatedBankAccounts
            .nameOfBank(UPDATED_NAME_OF_BANK)
            .accountNumber(UPDATED_ACCOUNT_NUMBER)
            .typeOfAccount(UPDATED_TYPE_OF_ACCOUNT)
            .ifsCode(UPDATED_IFS_CODE)
            .branch(UPDATED_BRANCH)
            .corporateId(UPDATED_CORPORATE_ID);
        BankAccountsDTO bankAccountsDTO = bankAccountsMapper.toDto(updatedBankAccounts);

        restBankAccountsMockMvc.perform(put("/api/bank-accounts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(bankAccountsDTO)))
            .andExpect(status().isOk());

        // Validate the BankAccounts in the database
        List<BankAccounts> bankAccountsList = bankAccountsRepository.findAll();
        assertThat(bankAccountsList).hasSize(databaseSizeBeforeUpdate);
        BankAccounts testBankAccounts = bankAccountsList.get(bankAccountsList.size() - 1);
        assertThat(testBankAccounts.getNameOfBank()).isEqualTo(UPDATED_NAME_OF_BANK);
        assertThat(testBankAccounts.getAccountNumber()).isEqualTo(UPDATED_ACCOUNT_NUMBER);
        assertThat(testBankAccounts.getTypeOfAccount()).isEqualTo(UPDATED_TYPE_OF_ACCOUNT);
        assertThat(testBankAccounts.getIfsCode()).isEqualTo(UPDATED_IFS_CODE);
        assertThat(testBankAccounts.getBranch()).isEqualTo(UPDATED_BRANCH);
        assertThat(testBankAccounts.getCorporateId()).isEqualTo(UPDATED_CORPORATE_ID);

        // Validate the BankAccounts in Elasticsearch
        verify(mockBankAccountsSearchRepository, times(1)).save(testBankAccounts);
    }

    @Test
    @Transactional
    public void updateNonExistingBankAccounts() throws Exception {
        int databaseSizeBeforeUpdate = bankAccountsRepository.findAll().size();

        // Create the BankAccounts
        BankAccountsDTO bankAccountsDTO = bankAccountsMapper.toDto(bankAccounts);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException 
        restBankAccountsMockMvc.perform(put("/api/bank-accounts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(bankAccountsDTO)))
            .andExpect(status().isBadRequest());

        // Validate the BankAccounts in the database
        List<BankAccounts> bankAccountsList = bankAccountsRepository.findAll();
        assertThat(bankAccountsList).hasSize(databaseSizeBeforeUpdate);

        // Validate the BankAccounts in Elasticsearch
        verify(mockBankAccountsSearchRepository, times(0)).save(bankAccounts);
    }

    @Test
    @Transactional
    public void deleteBankAccounts() throws Exception {
        // Initialize the database
        bankAccountsRepository.saveAndFlush(bankAccounts);

        int databaseSizeBeforeDelete = bankAccountsRepository.findAll().size();

        // Get the bankAccounts
        restBankAccountsMockMvc.perform(delete("/api/bank-accounts/{id}", bankAccounts.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<BankAccounts> bankAccountsList = bankAccountsRepository.findAll();
        assertThat(bankAccountsList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the BankAccounts in Elasticsearch
        verify(mockBankAccountsSearchRepository, times(1)).deleteById(bankAccounts.getId());
    }

    @Test
    @Transactional
    public void searchBankAccounts() throws Exception {
        // Initialize the database
        bankAccountsRepository.saveAndFlush(bankAccounts);
        when(mockBankAccountsSearchRepository.search(queryStringQuery("id:" + bankAccounts.getId())))
            .thenReturn(Collections.singletonList(bankAccounts));
        // Search the bankAccounts
        restBankAccountsMockMvc.perform(get("/api/_search/bank-accounts?query=id:" + bankAccounts.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(bankAccounts.getId().intValue())))
            .andExpect(jsonPath("$.[*].nameOfBank").value(hasItem(DEFAULT_NAME_OF_BANK.toString())))
            .andExpect(jsonPath("$.[*].accountNumber").value(hasItem(DEFAULT_ACCOUNT_NUMBER.intValue())))
            .andExpect(jsonPath("$.[*].typeOfAccount").value(hasItem(DEFAULT_TYPE_OF_ACCOUNT.toString())))
            .andExpect(jsonPath("$.[*].ifsCode").value(hasItem(DEFAULT_IFS_CODE.toString())))
            .andExpect(jsonPath("$.[*].branch").value(hasItem(DEFAULT_BRANCH.toString())))
            .andExpect(jsonPath("$.[*].corporateId").value(hasItem(DEFAULT_CORPORATE_ID)));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(BankAccounts.class);
        BankAccounts bankAccounts1 = new BankAccounts();
        bankAccounts1.setId(1L);
        BankAccounts bankAccounts2 = new BankAccounts();
        bankAccounts2.setId(bankAccounts1.getId());
        assertThat(bankAccounts1).isEqualTo(bankAccounts2);
        bankAccounts2.setId(2L);
        assertThat(bankAccounts1).isNotEqualTo(bankAccounts2);
        bankAccounts1.setId(null);
        assertThat(bankAccounts1).isNotEqualTo(bankAccounts2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(BankAccountsDTO.class);
        BankAccountsDTO bankAccountsDTO1 = new BankAccountsDTO();
        bankAccountsDTO1.setId(1L);
        BankAccountsDTO bankAccountsDTO2 = new BankAccountsDTO();
        assertThat(bankAccountsDTO1).isNotEqualTo(bankAccountsDTO2);
        bankAccountsDTO2.setId(bankAccountsDTO1.getId());
        assertThat(bankAccountsDTO1).isEqualTo(bankAccountsDTO2);
        bankAccountsDTO2.setId(2L);
        assertThat(bankAccountsDTO1).isNotEqualTo(bankAccountsDTO2);
        bankAccountsDTO1.setId(null);
        assertThat(bankAccountsDTO1).isNotEqualTo(bankAccountsDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(bankAccountsMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(bankAccountsMapper.fromId(null)).isNull();
    }
}
