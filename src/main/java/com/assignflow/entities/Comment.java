package com.assignflow.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "comments")
@Getter
@Setter
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    private Assignment assignment;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User createdBy;
    private LocalDateTime createdDate;
    @Column(columnDefinition = "TEXT")
    private String text;
}
