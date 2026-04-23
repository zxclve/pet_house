package pet.house.animal.Contracts;

import java.util.List;
import lombok.Data;

@Data
public class PostContractResponse {

    private PostHeaderDTO post;          // 1건 (게시글 + seller)
    private List<ContractDTO> contracts; // N건 (buyer + 계약)
}

 