package com.assignflow.controllers;

import com.assignflow.dto.CommentDto;
import com.assignflow.entities.Comment;
import com.assignflow.model.SecurityUser;
import com.assignflow.service.CommentService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Set;

@RestController
@RequestMapping("api/comments")
@AllArgsConstructor
@CrossOrigin(origins = "*")
public class CommentController {

    private final CommentService commentService;

    @PostMapping
    public ResponseEntity<Comment> createComment(@RequestBody CommentDto commentDto
            , @AuthenticationPrincipal SecurityUser securityUser) throws Exception {

        return ResponseEntity.ok(commentService.save(commentDto, securityUser.getUser()));
    }

    @PutMapping("{commentId}")
    public ResponseEntity<Comment> updateComment(@RequestBody CommentDto commentDto, @AuthenticationPrincipal SecurityUser suser) throws Exception {
        Comment comment = commentService.save(commentDto, suser.getUser());
        return ResponseEntity.ok(comment);
    }

    @DeleteMapping("{commentId}")
    public ResponseEntity<?> deleteComment(@PathVariable Long commentId, @AuthenticationPrincipal SecurityUser securityUser) {
        try {
            commentService.delete(commentId, securityUser.getUser());
            return ResponseEntity.ok(new HashMap<>());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<Set<Comment>> getCommentsForAssignment(@RequestParam Long assignmentId) {
        return ResponseEntity.ok(commentService.getCommentsForAssignment(assignmentId));
    }
}
