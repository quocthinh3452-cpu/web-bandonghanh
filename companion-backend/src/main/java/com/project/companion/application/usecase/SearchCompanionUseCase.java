package com.project.companion.application.usecase;

import com.project.companion.infrastructure.persistence.repository.CompanionRepository;
import com.project.companion.presentation.dto.CompanionResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SearchCompanionUseCase {

    private final CompanionRepository companionRepository;

    public List<CompanionResponse> execute(String location, Byte gender, Integer maxPrice) {
        // Lấy từ DB
        var entities = companionRepository.searchCompanions(location, gender, maxPrice);

        // Map sang DTO để trả về Frontend
        return entities.stream().map(entity -> CompanionResponse.builder()
                .id(entity.getUserId())
                .fullName(entity.getUser().getFullName())
                .gender(entity.getGender())
                .age(entity.getAge())
                .location(entity.getLocation())
                .pricePerHour(entity.getPricePerHour())
                .description(entity.getDescription())
                .avatarUrl(entity.getAvatarUrl())
                .build()
        ).collect(Collectors.toList());
    }
}