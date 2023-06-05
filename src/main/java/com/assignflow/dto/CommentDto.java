package com.assignflow.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Setter
@Getter
public class CommentDto {
    private Long assignmentId;
    private String text;
}
