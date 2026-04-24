package pet.house.animal.Contracts;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ContractFlatDTO {

    // =========================
    // contract(N)
    // =========================
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
    private Long buyerId;                        
    private String buyerUsername;                
    private String buyerAddress1;                
    private String buyerAddress2;                
    private String buyerUserType;                
    private String buyerEmail;                   
    private String buyerPhoneNumber;             

    // =========================
    // post(1)
    // =========================
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
    private Long sellerId;                      
    private String sellerUsername;              
    private String sellerAddress1;              
    private String sellerAddress2;              
    private String sellerUserType;              
    private String sellerEmail;                 
    private String sellerPhoneNumber;           
}