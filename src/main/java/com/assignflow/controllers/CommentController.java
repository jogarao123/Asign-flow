package com.assignflow.controllers;

import com.assignflow.dto.CommentDto;
import com.assignflow.entities.Comment;
import com.assignflow.entities.User;
import com.assignflow.model.SecurityUser;
import com.assignflow.service.CommentService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@RequestMapping("api/comments")
@AllArgsConstructor
@CrossOrigin(origins = "*")
public class CommentController {

    private final CommentService commentService;

    @PostMapping
    public ResponseEntity<Comment> createComment(@RequestBody CommentDto commentDto
                ,@AuthenticationPrincipal SecurityUser securityUser){

        return ResponseEntity.ok(commentService.save(commentDto,securityUser.getUser()));
    }

    @GetMapping
    public ResponseEntity<Set<Comment>> getCommentsForAssignment(@RequestParam Long assignmentId){
        return ResponseEntity.ok(commentService.getCommentsForAssignment(assignmentId));
    }
}
