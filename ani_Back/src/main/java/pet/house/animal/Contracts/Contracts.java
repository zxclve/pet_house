package pet.house.animal.Contracts;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

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
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pet.house.animal.Post.PostSite;
import pet.house.animal.User.User;

@Entity
@Table(name = "adoption_contracts")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Contracts {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) //auto_increase
    @Column(name = "contract_id", nullable = false)
    private Long contractId; //PK

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "post_id", nullable = false)
    private PostSite post; //FK (PostSite)

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "buyer_id", nullable = false)
    private User buyer; //FK (User)
    
    @Column(name = "adoption_app_date", nullable = false)
    private LocalDate adoption_app_date; //입양 신청 날짜

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false, columnDefinition = "CHAR(1) DEFAULT 'A'")
    private ContractsStatus status = ContractsStatus.A; //계약 상태
    
    @Column(name = "contract_date", nullable = false)
    private LocalDate contract_date; //계약 체결 날짜(분양일)
    
    @Enumerated(EnumType.STRING)
    @Column(name = "delivery_method", nullable = false)
    private Contracts_Delivery deliveryMethod = Contracts_Delivery.DIRECT; //인도 방법

    @Column(precision = 10, scale = 2, nullable = true, columnDefinition = "DECIMAL(10,2) DEFAULT 0.00")
    private BigDecimal adoption_fee = BigDecimal.ZERO; //순수 분양금액
    
    @Column(precision = 10, scale = 2, nullable = true, columnDefinition = "DECIMAL(10,2) DEFAULT 0.00")
    private BigDecimal commission_fee = BigDecimal.ZERO; //수수료 (예: 10% -> adoption_fee의 0.1)
    
    @Column(precision = 10, scale = 2, nullable = true, columnDefinition = "DECIMAL(10,2) DEFAULT 0.00")
    private BigDecimal total_amount = BigDecimal.ZERO; //총 결제 금액 (분양금액 + 추가 비용)


    @Column(name = "created_at", updatable = false,
        columnDefinition = "DATETIME DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime createdAt; //게시글 생성 시간 

    //수정 시간
    @Column(name = "updated_at",
        columnDefinition = "DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP")
    private LocalDateTime updatedAt;
    

}
