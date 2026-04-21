package pet.house.animal.Contracts;

import java.util.List;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/contracts")
@RequiredArgsConstructor

public class ContractsController {
    private final ContractsService contractsService;

    @GetMapping
    public String list(Model model) {
        List<Contracts> contracts = contractsService.getList();
        model.addAttribute("contracts", contracts);
        return "contracts/list";
    }
}