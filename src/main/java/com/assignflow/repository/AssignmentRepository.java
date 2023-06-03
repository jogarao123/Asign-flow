package com.assignflow.repository;

import com.assignflow.entities.Assignment;
import com.assignflow.entities.User;
import com.assignflow.enums.AssignmentEnum;
import com.assignflow.enums.AssignmentStatusEnum;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;
import java.util.Set;

public interface AssignmentRepository extends JpaRepository<Assignment, Long> {
    Set<Assignment> findByUser(User user);

    @Query("select a from Assignment a where a.status='Submitted'")
    Set<Assignment> findByCodeReviewer(User user);
}
