package com.assignflow.service;

import com.assignflow.entities.Assignment;
import com.assignflow.entities.User;
import com.assignflow.enums.AssignmentStatusEnum;
import com.assignflow.enums.AuthorityEnum;
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
        assignment.setUser(securityUser.getUser());
        assignmentRepository.save(assignment);
        return assignment;
    }

    private int getNextNumber(User user) {
        Set<Assignment> assignmentsOfUser = assignmentRepository.findByUser(user);
        Optional<Integer> nxtNum = assignmentsOfUser.stream()
                .sorted((a1, a2) -> (a2.getNumber()).compareTo(a1.getNumber()))
                .map((assignment -> assignment.getNumber() + 1))
                .findFirst();
        return nxtNum.orElse(1);
    }

    public Assignment save(Assignment assignment) {
        return assignmentRepository.save(assignment);
    }

    public Set<Assignment> findByUser(SecurityUser securityUser) {
        User user = securityUser.getUser();
        boolean isCodeReviewer = user.getAuthorities()
                .stream()
                .filter(authority -> authority.getAuthority().equals(AuthorityEnum.ROLE_CODE_REVIEWER.name()))
                .count() > 0;
        if (isCodeReviewer)
            return assignmentRepository.findByCodeReviewer(user);
        return assignmentRepository.findByUser(user);
    }

    public Optional<Assignment> findById(Long assignmentId) {
        return assignmentRepository.findById(assignmentId);
    }
}
