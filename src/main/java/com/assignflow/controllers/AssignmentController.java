
package com.assignflow.controllers;

import com.assignflow.dto.AssignmentMetadataDto;
import com.assignflow.entities.Assignment;
import com.assignflow.entities.Authority;
import com.assignflow.entities.User;
import com.assignflow.enums.AuthorityEnum;
import com.assignflow.model.SecurityUser;
import com.assignflow.service.AssignmentService;
import com.assignflow.service.UserService;
import com.assignflow.util.AuthorityUtil;
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
    private final UserService userService;
    @PostMapping("")
    public ResponseEntity<Assignment> createAssignment(){
        Assignment newAssignment=assignmentService.save();
        return ResponseEntity.ok(newAssignment);
    }
    @GetMapping("/metadata")
    public ResponseEntity<AssignmentMetadataDto> getMetadata(){
        return ResponseEntity.ok(new AssignmentMetadataDto());
    }
    @GetMapping("")
    public ResponseEntity<Set<Assignment>> getAssignments(@AuthenticationPrincipal SecurityUser securityUser){
        Set<Assignment> assignments=assignmentService.findByUser(securityUser);
        return ResponseEntity.ok(assignments);
    }

    @GetMapping("/{assignmentId}")
    public ResponseEntity<Assignment> getAssignment(@PathVariable Long assignmentId,@AuthenticationPrincipal SecurityUser securityUser){
        Optional<Assignment> assignmentOpt=assignmentService.findById(assignmentId);
        return ResponseEntity.ok(assignmentOpt.orElse(new Assignment()));
    }

    @PutMapping("/{assignmentId}")
    public ResponseEntity<Assignment> updateAssignment(@PathVariable Long assignmentId
                                              ,@RequestBody Assignment assignment){
        if(assignment.getCodeReviewer()!=null){
            User codeReviewer = userService.findByUserName(assignment.getCodeReviewer().getUsername()).orElse(new User());
            if(AuthorityUtil.hasAuthority(AuthorityEnum.ROLE_CODE_REVIEWER,codeReviewer)){
                assignment.setCodeReviewer(codeReviewer);
            }
        }
        return ResponseEntity.ok(assignmentService.save(assignment));
    }

}
