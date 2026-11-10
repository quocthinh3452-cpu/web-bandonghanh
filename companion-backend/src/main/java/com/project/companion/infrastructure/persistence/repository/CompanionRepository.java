package com.project.companion.infrastructure.persistence.repository;

import com.project.companion.infrastructure.persistence.entity.CompanionProfileEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CompanionRepository extends JpaRepository<CompanionProfileEntity, Long> {

    // Câu truy vấn tìm kiếm có bộ lọc (location, gender)
    @Query("SELECT c FROM CompanionProfileEntity c JOIN FETCH c.user u " +
            "WHERE u.status = 1 " +
            "AND (:location IS NULL OR c.location = :location) " +
            "AND (:gender IS NULL OR c.gender = :gender) " +
            "AND (:maxPrice IS NULL OR c.pricePerHour <= :maxPrice)")
    List<CompanionProfileEntity> searchCompanions(String location, Byte gender, Integer maxPrice);
}