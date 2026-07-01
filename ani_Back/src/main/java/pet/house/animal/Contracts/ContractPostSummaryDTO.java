package pet.house.animal.Contracts;

import java.math.BigDecimal;

import lombok.Data;

@Data
public class ContractPostSummaryDTO {
    private Long postId;
    private String breed;
    private String categoryName;
    private String imageUrl;
    private String adoptionStatus;
    private String sellerUsername;
    private BigDecimal price;
    private Long latestContractId;
    private int contractCount;
    private int activeCount;
    private int pendingCount;
    private int cancelledCount;
}
