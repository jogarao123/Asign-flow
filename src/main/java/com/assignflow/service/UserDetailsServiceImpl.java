package com.assignflow.service;

import com.assignflow.entities.User;
import com.assignflow.model.SecurityUser;
import com.assignflow.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> user=userRepository.findByUsername(username);

        return user.map(user1 -> new SecurityUser(user1))
                .orElseThrow(() -> new UsernameNotFoundException("Invalid credentials"));
    }
}
