package com.assignflow.util;

import com.assignflow.entities.User;
import com.assignflow.enums.AuthorityEnum;

public class AuthorityUtil {
    public static Boolean hasAuthority(AuthorityEnum authorityEnum, User user) {
        return user.getAuthorities().stream()
                .filter(authority -> authority.getAuthority().equals(authorityEnum.name())).count() > 0;
    }
}
