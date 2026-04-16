package pet.house.animal.Post;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface PostRepository extends JpaRepository<PostSite, Long> {
    Page<PostSite> findAll(Specification<PostSite> spec, Pageable pageable);

    //이거는 검색 기능을 위한 쿼리문입니다. PostSite 엔티티와 관련된 다른 엔티티들을 
    // 조인하여 검색어가 포함된 게시글을 찾습니다.
    //실습때 했던 쿼리 그대로라서 내꺼에 맞게 수정 필요
    @Query("select"
			+ " distinct p"
			+ " from PostSite p"
			+ " left outer join SiteUser u1 on p.author=u1"
			+ " left outer join Answer a on a.question=p"
			+ " left outer join SiteUser u2 on a.author=u2"
			+ " where"
			+ "    p.subject like %:keyword% "
			+ "    or p.content like %:keyword% "
			+ "    or u1.username like %:keyword% "
			+ "    or a.content like %:keyword% "
			+ "    or u2.username like %:keyword% ")
    Page<PostSite> findAllByKeyword(@Param("keyword") String keyword, Pageable pageable);
}
