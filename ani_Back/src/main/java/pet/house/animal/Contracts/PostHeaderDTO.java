package pet.house.animal.Contracts;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import lombok.Data;

@Data
public class PostHeaderDTO {

    // =====================
    // post
    // =====================
    private Long postId;
    private String breed;
    private String gender;
    private LocalDate birthDate;
    private String colorFeatures;
    private BigDecimal price;
    private String healthStatus;
    private String adoptionStatus;
    private String imageUrl;
    private String categoryName;

    private LocalDateTime postsCreatedAt;
    private LocalDateTime postsUpdatedAt;

    // =====================
    // seller
    // =====================
    private Long sellerId;
    private String sellerUsername;
    private String sellerAddress1;
    private String sellerAddress2;
    private String sellerUserType;
    private String sellerEmail;
    private String sellerPhoneNumber;
    
}