package com.assignflow.dto;

import com.assignflow.entities.Assignment;
import com.assignflow.enums.AssignmentEnum;
import com.assignflow.enums.AssignmentStatusEnum;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AssignmentResponseDto {
    private Assignment assignment;

    public AssignmentResponseDto(Assignment assignment){
        this.assignment=assignment;
    }
}
