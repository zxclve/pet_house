package pet.house.animal.Contracts;

import java.util.List;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/contracts")
@RequiredArgsConstructor

public class ContractsController {
    private final ContractsService contractsService;

    // @GetMapping
    // public String list(Model model) {
    //     List<Contracts> contracts = contractsService.getList();
    //     model.addAttribute("contracts", contracts);
    //     return "contracts/list";
    // }
    //restful api로 변경
    @GetMapping
    public List<Contracts> list() {
        return contractsService.getList();
    }
}