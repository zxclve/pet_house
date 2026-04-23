package pet.house.animal.Contracts;

import org.springframework.web.bind.annotation.*;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/contracts")
public class ContractsController {

    private final ContractsService contractsService;

    @GetMapping
    public PostContractResponse getContracts(
            @RequestParam(required = false) String type,
            @RequestParam(required = false) Long contractId,
            @RequestParam(required = false) String status
    ) {
        return contractsService.getContracts(type, contractId, status);
    }
}