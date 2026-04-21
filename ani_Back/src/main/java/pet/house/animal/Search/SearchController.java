package pet.house.animal.Search;

import pet.house.animal.Category.Category;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import lombok.RequiredArgsConstructor;
import java.util.List;


// 검색페이지 전용
@Controller
@RequiredArgsConstructor
public class SearchController {
 
    private final SearchService searchService;
    
    @GetMapping("/search")
    public String searchCategory(@RequestParam("categoryName") String categoryName, Model model) {
        List<Category> foundCategory = searchService.searchCategory(categoryName);
        model.addAttribute("category", foundCategory);     
        return "search";
    }
}
