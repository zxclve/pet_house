package pet.house.animal.Contracts;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/contracts")
public class ContractsController {

    private final ContractsService contractsService;

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public PostContractResponse getContracts(
            @RequestParam(required = false) String type,
            @RequestParam(required = false) Long postId,
            @RequestParam(required = false) Long contractId,
            @RequestParam(required = false) String status
    ) {
        return contractsService.getContracts(type, postId, contractId, status);
    }

    @GetMapping("/posts")
    @PreAuthorize("hasRole('ADMIN')")
    public ContractPostsResponse getContractPosts(@RequestParam(required = false) String status) {
        return contractsService.getContractPosts(status);
    }
}
