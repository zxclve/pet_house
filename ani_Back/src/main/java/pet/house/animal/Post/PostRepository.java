package pet.house.animal.Post;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostRepository extends JpaRepository<PostSite, Long> {
    Page<PostSite> findAll(Specification<PostSite> spec, Pageable pageable); //모든 게시글 찾기기
}
