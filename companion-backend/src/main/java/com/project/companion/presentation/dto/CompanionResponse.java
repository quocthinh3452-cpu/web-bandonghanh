package com.project.companion.presentation.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CompanionResponse {
    private Long id;
    private String fullName;
    private Byte gender;
    private Integer age;
    private String location;
    private Integer pricePerHour;
    private String avatarUrl;
    private String description;
}