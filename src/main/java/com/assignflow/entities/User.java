package com.assignflow.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "users")
@Getter
@Setter
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private LocalDate cohortStartDate;
    private String username;

    @JsonIgnore
    private String password;

    @OneToMany(mappedBy = "user",fetch = FetchType.EAGER)
    @JsonIgnore
    private List<Authority> authorities;

    @OneToMany(mappedBy = "user")
    @JsonIgnore
    private List<Assignment> assignments;

    @OneToMany(mappedBy = "codeReviewer")
    @JsonIgnore
    private List<Assignment> reviewAssignments;
}
