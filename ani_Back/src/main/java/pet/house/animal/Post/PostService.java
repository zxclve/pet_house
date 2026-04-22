package pet.house.animal.Post;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.JoinType;
import jakarta.persistence.criteria.Root;
import lombok.RequiredArgsConstructor;
import pet.house.animal.User.UserEntity;

@Service
@RequiredArgsConstructor
public class PostService {
    private final PostRepository postRepository;

    // 생성
    public void createPost(String breed, String gender, LocalDate birthDate,
                           String colorFeatures, BigDecimal price,
                           String healthStatus, String image_url) {

        PostSite savedPost = new PostSite();
        savedPost.setBreed(breed);
        savedPost.setGender(gender);
        savedPost.setBirthDate(birthDate);
        savedPost.setColorFeatures(colorFeatures);
        savedPost.setPrice(price);
        savedPost.setHealthStatus(healthStatus);
        savedPost.setStatus(PostStatus.A); // 기본값 A (Active)
        savedPost.setImage_url(image_url);
        savedPost.setCreatedAt(LocalDateTime.now());
        savedPost.setUpdatedAt(LocalDateTime.now());

        postRepository.save(savedPost);
    }

    // 페이징 처리
    public Page<PostSite> getList(int page, String keyword) {
        System.out.println("keyword: " + keyword);
        List<Sort.Order> sorts = new ArrayList<>();
        sorts.add(Sort.Order.desc("createdAt")); // 엔티티 필드명 기준
        Pageable pageable = PageRequest.of(page, 20, Sort.by(sorts));
        Specification<PostSite> spec = search(keyword);

        return postRepository.findAll(spec, pageable);
    }

    // 게시글 상세보기
    public PostSite getPost(Long postId) {
        Optional<PostSite> post = postRepository.findById(postId);
        if (post.isPresent()) {
            return post.get();
        } else {
            throw new RuntimeException("게시글을 찾을 수 없습니다.------(Service - getPost)");
        }
    }

    // 게시글 수정
    public void modifyPost(PostSite post, String breed, String gender, LocalDate birthDate,
                           String colorFeatures, BigDecimal price,
                           String healthStatus, String image_url) {

        post.setBreed(breed);
        post.setGender(gender);
        post.setBirthDate(birthDate);
        post.setColorFeatures(colorFeatures);
        post.setPrice(price);
        post.setHealthStatus(healthStatus);
        post.setImage_url(image_url);
        post.setUpdatedAt(LocalDateTime.now());

        postRepository.save(post);
    }

    // 게시글 삭제
    public void deletePost(PostSite post) {
        postRepository.delete(post);
    }

    // 검색 Specification
    public Specification<PostSite> search(String keyword) {
        return new Specification<>() {
            private static final long serialVersionUID = 1L;

            @Override
            public jakarta.persistence.criteria.Predicate toPredicate(
                    Root<PostSite> root, CriteriaQuery<?> query, CriteriaBuilder cb) {

                query.distinct(true); // 중복 제거
                Join<PostSite, UserEntity> seller = root.join("seller", JoinType.LEFT);

                return cb.or(
                        cb.like(root.get("breed"), "%" + keyword + "%"),
                        cb.like(root.get("colorFeatures"), "%" + keyword + "%"),
                        cb.like(seller.get("username"), "%" + keyword + "%")
                );
            }
        };
    }
}