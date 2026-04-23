package pet.house.animal.Contracts;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import lombok.Data;

@Data
public class ContractDTO {

    // ======================
    // contract (1 row)
    // ======================
    private Long contractId;
    private LocalDate adoptionAppDate;
    private String contractStatus;
    private String confirmedAdopteeFlag;
    private LocalDate contractDate;
    private String deliveryMethod;
    private BigDecimal adoptionFee;
    private BigDecimal commissionFee;
    private BigDecimal totalAmount;
    private LocalDateTime contractCreatedAt;
    private LocalDateTime contractUpdatedAt;

    // ======================
    // buyer (1 contract 기준 1명)
    // ======================
    private Long buyerId;
    private String buyerUsername;
    private String buyerAddress1;
    private String buyerAddress2;
    private String buyerUserType;
    private String buyerEmail;
    private String buyerPhoneNumber;
}