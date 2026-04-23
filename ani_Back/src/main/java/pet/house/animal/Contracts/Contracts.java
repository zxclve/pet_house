package pet.house.animal.Contracts;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

import org.hibernate.annotations.Comment;

import jakarta.persistence.*;
import lombok.*;

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
    @Comment("입양계약서ID: 분양계약서ID로 사용")
    private Long contractId;

    @Column(name = "post_id", nullable = false)
    @Comment("분양 신청 ID")
    private Long postId;

    @Column(name = "buyer_id", nullable = false)
    @Comment("입양자 (회원ID)")
    private Long buyerId;

    @Column(name = "adoption_app_date", nullable = false)
    @Comment("입양신청일(Adoption application date)")
    private LocalDate adoptionAppDate;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", columnDefinition = "CHAR(1)", nullable = false)
    @Comment("A:신청(ACTIVE),C:CANCELLED,P:PENDING")
    private Status status;

    @Column(name = "confirmed_adoptee_flag", nullable = false, length = 1)
    @Builder.Default
    @Comment("입양확정자FLAG")
    private String confirmedAdopteeFlag = "N";

    @Column(name = "contract_date")
    @Comment("계약일자")
    private LocalDate contractDate;

    @Enumerated(EnumType.STRING)
    @Column(name = "delivery_method", columnDefinition = "CHAR(3)", nullable = false)
    @Comment("인도조건 [ DIR:DIRECT(직접 방문), MET:MEET(직거래), PIK:PICKUP(배송 서비스), DLV:DELIVER(분양자 직접 배송),ETC:ETC(기타)]")
    private DeliveryMethod deliveryMethod;

    @Column(precision = 10, scale = 2)
    @Builder.Default
    @Comment("순수분양금액")
    private BigDecimal adoptionFee = BigDecimal.ZERO;

    @Column(precision = 10, scale = 2)
    @Builder.Default
    @Comment("플랫폼 중개수수료")
    private BigDecimal commissionFee = BigDecimal.ZERO;

    @Column(precision = 10, scale = 2)
    @Builder.Default
    @Comment("입양자 총지불 금액")
    private BigDecimal totalAmount = BigDecimal.ZERO;

    @Column(name = "created_at", updatable = false,
    columnDefinition = "DATETIME DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime createdAt;

    @Column(name = "updated_at",
    columnDefinition = "DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP")
    private LocalDateTime updatedAt;

}