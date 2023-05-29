
package com.assignflow.controllers;

import com.assignflow.entities.Assignment;
import com.assignflow.model.SecurityUser;
import com.assignflow.service.AssignmentService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.Set;

@RestController
@AllArgsConstructor
@RequestMapping("/api/assignments")
@CrossOrigin(origins = "*")
public class AssignmentController {
    private final AssignmentService assignmentService;

    @PostMapping("")
    public ResponseEntity<Assignment> createAssignment(){
        Assignment newAssignment=assignmentService.save();
        return ResponseEntity.ok(newAssignment);
    }
    @GetMapping("")
    public ResponseEntity<?> getAssignments(@AuthenticationPrincipal SecurityUser securityUser){
        Set<Assignment> assignments=assignmentService.findByUser(securityUser);
        return ResponseEntity.ok(assignments);
    }

    @GetMapping("/{assignmentId}")
    public ResponseEntity<?> getAssignments(@PathVariable Long assignmentId,@AuthenticationPrincipal SecurityUser securityUser){
        Optional<Assignment> assignmentOpt=assignmentService.findById(assignmentId);
        return ResponseEntity.ok(assignmentOpt.orElse(new Assignment()));
    }

}
