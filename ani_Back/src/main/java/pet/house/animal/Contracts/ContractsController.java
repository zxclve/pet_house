package pet.house.animal.Contracts;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;


@RestController
@RequiredArgsConstructor
@RequestMapping("/api/contracts")
public class ContractsController {

    private final ContractsService contractsService;

@GetMapping
public PostContractResponse getContracts(
        @RequestParam String type,
        @RequestParam(required = false) Long contractId,
        @RequestParam String status
) {
    return contractsService.getContracts(type, contractId, status);
}
}