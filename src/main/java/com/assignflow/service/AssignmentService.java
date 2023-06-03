package com.assignflow.service;

import com.assignflow.entities.Assignment;
import com.assignflow.entities.User;
import com.assignflow.enums.AssignmentStatusEnum;
import com.assignflow.model.SecurityUser;
import com.assignflow.repository.AssignmentRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.Set;

@Service
@AllArgsConstructor
public class AssignmentService {
    private final AssignmentRepository assignmentRepository;

    public Assignment save() {
        SecurityUser securityUser = (SecurityUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Assignment assignment = new Assignment();
        assignment.setStatus(AssignmentStatusEnum.PENDING_SUBMISSION.getStatus());
        assignment.setNumber(getNextNumber(securityUser.getUser()));
        assignment.setAssignedTo(securityUser.getUser());
        assignmentRepository.save(assignment);
        return assignment;
    }

    private int getNextNumber(User user) {
        Set<Assignment> assignmentsOfUser = assignmentRepository.findByAssignedTo(user);
        Optional<Integer> nxtNum = assignmentsOfUser.stream()
                .sorted((a1, a2) -> (a2.getNumber()).compareTo(a1.getNumber()))
                .map((assignment -> assignment.getNumber()+1))
                .findFirst();
        return nxtNum.orElse(1);

    }

    public Assignment save(Assignment assignment) {
        return assignmentRepository.save(assignment);
    }

    public Set<Assignment> findByUser(SecurityUser user) {
        return assignmentRepository.findByAssignedTo(user.getUser());
    }

    public Optional<Assignment> findById(Long assignmentId) {
        return assignmentRepository.findById(assignmentId);
    }
}
