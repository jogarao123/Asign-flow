package com.assignflow.service;

import com.assignflow.dto.CommentDto;
import com.assignflow.entities.Comment;
import com.assignflow.entities.User;
import com.assignflow.repository.CommentRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Set;

@Service
@AllArgsConstructor
public class CommentService {
    private final CommentRepository commentRepository;
    private final AssignmentService assignmentService;

    public Comment save(CommentDto commentDto, User user) throws Exception {

        Comment comment = new Comment();
        comment.setId(commentDto.getId());
        if (comment.getId() == null)
            comment.setCreatedDate(LocalDateTime.now());
        else {
            //check whether user modifying comment is creator of comment
            Comment currentComment = commentRepository.findById(comment.getId()).get();
            if (currentComment.getCreatedBy().getId() != user.getId()) {
                throw new Exception("User cannot modify comment");
            }
        }
        comment.setText(commentDto.getText());
        comment.setCreatedBy(user);
        comment.setAssignment(assignmentService.findById(commentDto.getAssignmentId()).get());
        return commentRepository.save(comment);
    }

    public Set<Comment> getCommentsForAssignment(Long assignmentId) {
        return commentRepository.findByAssignmentId(assignmentId);
    }
}
