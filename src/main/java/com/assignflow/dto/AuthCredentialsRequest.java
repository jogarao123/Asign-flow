package com.assignflow.dto;

import lombok.Data;

@Data
public class AuthCredentialsRequest {
    private String username;
    private String password;
}
