package pet.house.animal.Contracts;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import lombok.*;

@Getter
@Setter
public class ContractFlatDTO {

    // =========================
    // contract(N)
    // =========================
    private Long contractId;                     // 입양 신청서(분양계약서)ID
    private LocalDate adoptionAppDate;           // 입양신청일
    private String contractStatus;               // 입양신청상태
    private String confirmedAdopteeFlag;         // 입양확정자 Flag
    private LocalDate contractDate;              // 계약일자
    private String deliveryMethod;               // 인도조건
    private BigDecimal adoptionFee;              // 실 분양금액
    private BigDecimal commissionFee;            // 중개수수료
    private BigDecimal totalAmount;              // 입양자 총지불 금액
    private LocalDateTime contractCreatedAt;     // 입양정보 생성일
    private LocalDateTime contractUpdatedAt;     // 입양정보 수정일
    private Long buyerId;                        // 입양자 회원ID
    private String buyerUsername;                // 입양자 성명
    private String buyerAddress1;                // 입양자 주소1
    private String buyerAddress2;                // 입양자 주소2
    private String buyerUserType;                // 입양자 유형
    private String buyerEmail;                   // 입양자 이메일
    private String buyerPhoneNumber;             // 입양자 폰번호

    // =========================
    // post(1)
    // =========================
    private Long postId;                        // 분양신청 ID
    private String breed;                       // 품종
    private String gender;                      // 성별
    private LocalDate birthDate;                // 출생일
    private String colorFeatures;               // 모색 및 특징
    private BigDecimal price;                   // 분양가금액
    private String healthStatus;                // 건강상태
    private String adoptionStatus;              // 분양신청상태
    private String imageUrl;                    // 사진
    private String categoryName;                // 카테고리명
    private LocalDateTime postsCreatedAt;       // 생성일
    private LocalDateTime postsUpdatedAt;       // 수정일
    private Long sellerId;                      // 분양자 회원ID 
    private String sellerUsername;              // 분양자 성명
    private String sellerAddress1;              // 주소1
    private String sellerAddress2;              // 주소2
    private String sellerUserType;              // 유형
    private String sellerEmail;                 // 이메일
    private String sellerPhoneNumber;           // 폰번호
}