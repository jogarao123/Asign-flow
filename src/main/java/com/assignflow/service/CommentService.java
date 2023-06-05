package com.assignflow.service;

import com.assignflow.dto.CommentDto;
import com.assignflow.entities.Assignment;
import com.assignflow.entities.Comment;
import com.assignflow.entities.User;
import com.assignflow.repository.CommentRepository;
import lombok.AllArgsConstructor;
import org.springframework.expression.spel.ast.Assign;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Set;

@Service
@AllArgsConstructor
public class CommentService {
    private final CommentRepository commentRepository;
    private final AssignmentService assignmentService;

    public Comment  save(CommentDto commentDto, User user){
        Comment comment=new Comment();
        comment.setCreatedBy(user);
        comment.setText(commentDto.getText());
        comment.setCreatedDate(LocalDateTime.now());
        comment.setAssignment(assignmentService.findById(commentDto.getAssignmentId()).get());
        return commentRepository.save(comment);
    }

    public Set<Comment> getCommentsForAssignment(Long assignmentId ){
        return commentRepository.findByAssignmentId(assignmentId);
    }
}
