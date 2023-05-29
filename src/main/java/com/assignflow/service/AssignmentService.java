package com.assignflow.service;

import com.assignflow.entities.Assignment;
import com.assignflow.model.SecurityUser;
import com.assignflow.repository.AssignmentRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class AssignmentService {
    private final AssignmentRepository assignmentRepository;

    public Assignment save(){
        SecurityUser securityUser= (SecurityUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Assignment assignment = new Assignment();
        assignment.setStatus("Needs to be Submitted");
        assignment.setAssignedTo(securityUser.getUser());
        assignmentRepository.save(assignment);

        return assignment;
    }
}
