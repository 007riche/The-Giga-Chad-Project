package com.dotinc.company.mysqlcrudwebapp.user;

import org.springframework.data.repository.CrudRepository;

public interface IUserRepository extends CrudRepository <User, Integer> {
    public Long countUserById(Integer id);
}
