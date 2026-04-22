package pet.house.animal.Category;

import java.time.LocalDate;
import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "categories")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Category {
    //DB명세에 맞게 작성
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) //auto_increase
    @Column(name = "category_id", nullable = false)
    private Long categoryId;

    @Column(name = "category_name", nullable = false, length = 100)
    private String category_name;

    @Column(name = "display_order", nullable = false, columnDefinition = "INT DEFAULT 1")
    private int display_order; //카테고리 노출 순서 

    @Column(name = "is_active", nullable = false, length = 1, columnDefinition = "CHAR(1) DEFAULT 'Y'")
    private String is_active; //카테고리 활성화 여부 (Y/N)

    @Column(name = "created_at", updatable = false,
            columnDefinition = "DATETIME DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime createdAt; //게시글 생성 시간 

    //수정 시간
    @Column(name = "updated_at",
            columnDefinition = "DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP")
    private LocalDateTime updatedAt;
}

