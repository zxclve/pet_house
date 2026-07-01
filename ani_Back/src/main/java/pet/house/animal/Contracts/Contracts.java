package pet.house.animal.Contracts;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

import org.hibernate.annotations.Comment;

import jakarta.persistence.Column;
import jakarta.persistence.Convert;
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
@Table(name = "adoption_contracts")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Contracts {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "contract_id", nullable = false)
    @Comment("입양계약 고유 ID")
    private Long contractId;

    @Column(name = "post_id", nullable = false)
    @Comment("분양 게시글 ID")
    private Long postId;

    @Column(name = "buyer_id", nullable = false)
    @Comment("입양 신청자 회원 ID")
    private Long buyerId;

    @Column(name = "adoption_app_date", nullable = false)
    @Comment("입양 신청일")
    private LocalDate adoptionAppDate;

    @jakarta.persistence.Enumerated(jakarta.persistence.EnumType.STRING)
    @Column(name = "status", columnDefinition = "CHAR(1)", nullable = false)
    @Comment("A:ACTIVE, C:CANCELLED, P:PENDING")
    private Status status;

    @Column(name = "confirmed_adoptee_flag", nullable = false, length = 1)
    @Builder.Default
    @Comment("입양 확정 여부")
    private String confirmedAdopteeFlag = "N";

    @Column(name = "contract_date")
    @Comment("계약 확정일")
    private LocalDate contractDate;

    @Column(name = "delivery_method", columnDefinition = "CHAR(3)", nullable = false)
    @Convert(converter = DeliveryMethodConverter.class)
    @Comment("인도 조건 코드")
    private DeliveryMethod deliveryMethod;

    @Column(precision = 10, scale = 2)
    @Builder.Default
    @Comment("분양 금액")
    private BigDecimal adoptionFee = BigDecimal.ZERO;

    @Column(precision = 10, scale = 2)
    @Builder.Default
    @Comment("중개 수수료")
    private BigDecimal commissionFee = BigDecimal.ZERO;

    @Column(precision = 10, scale = 2)
    @Builder.Default
    @Comment("총 결제 금액")
    private BigDecimal totalAmount = BigDecimal.ZERO;

    @Column(name = "created_at", updatable = false, columnDefinition = "DATETIME DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime createdAt;

    @Column(name = "updated_at", columnDefinition = "DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP")
    private LocalDateTime updatedAt;
}
