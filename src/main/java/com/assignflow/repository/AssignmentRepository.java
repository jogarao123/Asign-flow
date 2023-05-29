package com.assignflow.repository;

import com.assignflow.entities.Assignment;
import com.assignflow.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.Set;

public interface AssignmentRepository extends JpaRepository<Assignment,Long> {
    Set<Assignment> findByAssignedTo(User assignedTo);
}
