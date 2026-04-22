package pet.house.animal.Post;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
//import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface PostRepository extends JpaRepository<PostSite, Long> {
    //Page<PostSite> findAll(Specification<PostSite> spec, Pageable pageable); //모든 게시글 찾기기

    // 정적쿼리를 이용 해서 유저이름, 품종, 색상으로 검색
    @Query("select distinct p "
            + "from PostSite p "
            + "left join p.seller s "
            + "where p.breed like %:keyword% " // 품종
            + " or p.colorFeatures like %:keyword% " // 색상
            + " or s.username like %:keyword%") // 유저이름

    // 검색 결과중에서 일부 키워드만 가져옴
    Page<PostSite> findAllByKeyword(@Param("keyword") String keyword, Pageable pageable);



}
