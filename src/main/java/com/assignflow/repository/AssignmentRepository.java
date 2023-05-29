package com.assignflow.repository;

import com.assignflow.entities.Assignment;
import com.assignflow.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AssignmentRepository extends JpaRepository<Assignment,Long> {

}
