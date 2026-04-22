package pet.house.animal.Contracts;

public interface ContractsService {

    PostContractResponse getContracts(
            String type,
            Long contractId,
            String status
    );
}
