package pet.house.animal.Contracts;

import java.util.List;

import lombok.Data;

@Data
public class ContractPostsResponse {
    private List<ContractPostSummaryDTO> posts;
}
