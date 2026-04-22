package pet.house.animal.Post;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Set;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pet.house.animal.Category.Category;
import pet.house.animal.User.User;

@Entity
@Table(name = "adoption_posts")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PostSite {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "post_id", nullable = false)
    private Long postId;

    // FK (Category)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    // FK (User = seller)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "seller_id", nullable = false)
    private User seller;

    @Column(nullable = false, length = 50)
    private String breed; //품종

    @Column(nullable = false, length = 1, columnDefinition = "CHAR(1) DEFAULT 'M'")
    private String gender; // 동물 "M" or "F"

    @Column(name = "birth_date", nullable = false)
    private LocalDate birthDate; //동물생년월일

    @Column(name = "color_features", nullable = false, columnDefinition = "TEXT")
    private String colorFeatures; //동물 특징

    @Builder.Default
    @Column(precision = 10, scale = 2, nullable = false, columnDefinition = "DECIMAL(10,2) DEFAULT 0.00")
    private BigDecimal price = BigDecimal.ZERO; //가격

    @Column(name = "health_status", columnDefinition = "TEXT")
    private String healthStatus; //건강

    // ENUM 매핑
    @Enumerated(EnumType.STRING)
    @Builder.Default
    @Column(name = "status", nullable = false, columnDefinition = "CHAR(1) DEFAULT 'A'")
    private PostStatus status = PostStatus.A; 
    //게시글 상태, enum으로 관리 (A: Active, S: Sold, D: Deleted) 기본값 A 

    //사진 경로
    @Column(name = "image_url", nullable = true, length = 255)
    private String image_url;

    @Column(name = "created_at", updatable = false,
            columnDefinition = "DATETIME DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime createdAt; //게시글 생성 시간 

    //수정 시간
    @Column(name = "updated_at",
            columnDefinition = "DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP")
    private LocalDateTime updatedAt;
    
    //입양 신청수 
    @OneToMany
    Set<UserEntity> adoption_sumit;
    
    //분양 신청수
    @OneToMany
    Set<UserEntity> sale_sumit;
}
