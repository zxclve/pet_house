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
import org.springframework.util.StringUtils;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.JoinType;
import jakarta.persistence.criteria.Root;
import lombok.RequiredArgsConstructor;
import pet.house.animal.User.User;

@Service //서비스 컴포넌트
@RequiredArgsConstructor // 이거 final 필드에 자동으로 인젝션할려고 사용(의존성 주입)
public class PostService {
    private final PostRepository postRepository;

    //게시글 생성
    public PostSite createPost(PostSite postSite) {
        //생성 시간이 비어있으면 현재시간으로 설정
        if (postSite.getCreatedAt() == null) {
            postSite.setCreatedAt(LocalDateTime.now());
        }
        //수정시간은 현재시간으로
        postSite.setUpdatedAt(LocalDateTime.now());
        //상태값 없으면 기본값인(A)로 설정 -> 상태값은 enum으로 관리
        if (postSite.getStatus() == null) {
            postSite.setStatus(PostStatus.A);
        }
        //DB에 저장한 후 저장된 엔티티 반환 
        return postRepository.save(postSite);
    }

    // 게시글 목록 조회 + 페이징 + 검색
    public Page<PostSite> getList(int page, String keyword){
        List<Sort.Order> sorts = new ArrayList<>();  //정렬리스트 생성
        sorts.add(Sort.Order.desc("createdAt")); //createdAt 기준 내림차순 정렬 (이러면은 가장 높은값인 최신게 앞으로)
		Pageable pageable = PageRequest.of(page, 20, Sort.by(sorts)); //페이지 설정 -> 한 페이지당 20개씩
		Specification<PostSite> spec = search(keyword); //검색 조건 생성(KeyWord 기준으로)
		
		return postRepository.findAll(spec,pageable); //조건 + 페이징 해서 조회
    }

    //게시글 상세보기
    public PostSite getPost(Long postId) {
        Optional<PostSite> post = postRepository.findById(postId); //ID로 게시글 조회
        if(post.isPresent()){
            return post.get(); //있으면 반환 없으면 아래 에러 던짐
        } else {
            throw new RuntimeException("게시글을 찾을 수 없습니다.------(Service - getPost)");
        }
    }

    //게시글 상태 변경
    public PostSite updateStatus(Long postId, PostStatus status) {
        PostSite post = getPost(postId); //기존 게시글 조회
        post.setStatus(status); // 상태 변경
        post.setUpdatedAt(LocalDateTime.now()); //수정 날짜 업데이트

        PostSite saved = postRepository.save(post); // DB저장

        postSseService.broadcastPostUpdated(postId); // 실시간 이벤트 전송(SSE) - 글이 변경되었다고 클라이언트에 알림 
        return saved;
    }

    //게시글 내용수정
    public void modifyPost(PostSite post, String breed, String gender, LocalDate birthDate, String colorFeatures, BigDecimal price, String healthStatus, String image_url) {    
        post.setBreed(breed);
        post.setGender(gender);
        post.setBirthDate(birthDate);
        post.setColorFeatures(colorFeatures);
        post.setPrice(price);
        post.setHealthStatus(healthStatus);
        post.setImage_url(image_url);
        post.setUpdatedAt(LocalDateTime.now()); //수정시간 갱신

        this.postRepository.save(post); //저장
    }

    //게시글 삭제 
    public void deletePost(PostSite post) {
        this.postRepository.delete(post); //삭제 
    }

    //검색 Specification기반 동적 쿼리[JAVA Specification란 JPA Criteria API를 사용해서 동적인 쿼리 생성하는데 사용]
    public Specification<PostSite> search(String keyword){ 
       return new Specification<>() {
        private static final long serialVersionUID = 1L;
        @Override
        public jakarta.persistence.criteria.Predicate toPredicate(Root<PostSite> root, CriteriaQuery<?> query, CriteriaBuilder cb) { //toPredicate는 JPA Criteria API에서 WHERE절 
                query.distinct(true); //중복제거
                if (!StringUtils.hasText(keyword)) { //검색어 없으면 전체 조회
                    return cb.conjunction();
                }

                // 판매자와 LEFT JOIN[LEFT JOIN (LEFT OUTER JOIN)은 두 테이블을 조인할 때 왼쪽 테이블의 데이터는 무조건 유지하고, 오른쪽 테이블은 일치하는 값만 붙이는 방식]
                Join<PostSite, User> u1 = root.join("seller", JoinType.LEFT);

                return cb.or(
                        cb.like(root.get("breed"), "%" + keyword + "%"), //품종 검색
                        cb.like(root.get("colorFeatures"), "%" + keyword + "%"), //특징 검색
                        cb.like(u1.get("username"), "%" + keyword + "%") //판매자 이름 검색
                );
            }
        };
    }
}


/*
검색을 MYSQL 쿼리로 치환하면 
SELECT DISTINCT p.*
FROM post_site p
LEFT JOIN user u ON p.seller_id = u.id
WHERE 
    p.breed LIKE CONCAT('%', :keyword, '%')
    OR p.color_features LIKE CONCAT('%', :keyword, '%')
    OR u.username LIKE CONCAT('%', :keyword, '%')
ORDER BY p.created_at DESC
LIMIT 20 OFFSET :offset; 
*/