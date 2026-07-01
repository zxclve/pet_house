package pet.house.animal.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import lombok.RequiredArgsConstructor;
import pet.house.animal.Category.Category;
import pet.house.animal.Category.CategoryRepository;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final CategoryRepository categoryRepository;

    @Override
    public void run(String... args) {
        if (categoryRepository.count() > 0) {
            return;
        }
        int order = 1;
        categoryRepository.save(Category.builder()
                .categoryName("강아지")
                .displayOrder(order++)
                .isActive("Y")
                .build());
        categoryRepository.save(Category.builder()
                .categoryName("고양이")
                .displayOrder(order++)
                .isActive("Y")
                .build());
        categoryRepository.save(Category.builder()
                .categoryName("토끼")
                .displayOrder(order++)
                .isActive("Y")
                .build());
        categoryRepository.save(Category.builder()
                .categoryName("햄스터")
                .displayOrder(order++)
                .isActive("Y")
                .build());
        categoryRepository.save(Category.builder()
                .categoryName("새")
                .displayOrder(order++)
                .isActive("Y")
                .build());
    }
}
