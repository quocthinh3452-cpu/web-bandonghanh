package com.project.companion.application.usecase;

import com.project.companion.infrastructure.persistence.repository.CompanionRepository;
import com.project.companion.presentation.dto.CompanionResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class GetCompanionDetailUseCase {

    private final CompanionRepository companionRepository;
    @Transactional(readOnly = true)
    public CompanionResponse execute(Long id) {
        var entity = companionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy người đồng hành"));
        return CompanionResponse.builder()
                .id(entity.getUserId())
                .fullName(entity.getUser().getFullName())
                .gender(entity.getGender())
                .age(entity.getAge())
                .location(entity.getLocation())
                .pricePerHour(entity.getPricePerHour())
                .description(entity.getDescription())
                .avatarUrl(entity.getAvatarUrl())
                .build();
    }
}
