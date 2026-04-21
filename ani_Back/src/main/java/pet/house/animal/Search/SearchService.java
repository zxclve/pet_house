package pet.house.animal.Search;

import pet.house.animal.Category.CategoryRepository;
import java.util.List;
import pet.house.animal.Category.Category;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SearchService {
    private final CategoryRepository categoryRepository;
    
    public List<Category> searchCategory(String categoryName) {
        return categoryRepository.findByCategoryNameContaining(categoryName);
    }
}
