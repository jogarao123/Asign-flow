package com.assignflow.service;

import com.assignflow.entities.User;
import com.assignflow.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public Optional<User> findByUserName(String username) {
        return userRepository.findByUsername(username);
    }
}
