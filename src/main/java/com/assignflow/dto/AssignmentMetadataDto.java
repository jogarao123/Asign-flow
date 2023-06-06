package com.assignflow.dto;

import com.assignflow.enums.AssignmentEnum;
import com.assignflow.enums.AssignmentStatusEnum;
import lombok.Getter;

@Getter
public class AssignmentMetadataDto {
    private AssignmentEnum[] assignmentEnums= AssignmentEnum.values();
    private AssignmentStatusEnum[] assignmentStatusEnums=AssignmentStatusEnum.values();
}
