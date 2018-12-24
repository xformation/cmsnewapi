package com.mycompany.myapp.service.mapper;

import com.mycompany.myapp.domain.*;
import com.mycompany.myapp.service.dto.BankAccountsDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity BankAccounts and its DTO BankAccountsDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface BankAccountsMapper extends EntityMapper<BankAccountsDTO, BankAccounts> {



    default BankAccounts fromId(Long id) {
        if (id == null) {
            return null;
        }
        BankAccounts bankAccounts = new BankAccounts();
        bankAccounts.setId(id);
        return bankAccounts;
    }
}
