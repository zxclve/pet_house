package pet.house.animal.Post;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface PostRepository extends JpaRepository<PostSite, Long>, JpaSpecificationExecutor<PostSite> {

    @Query("""
        select p from PostSite p
        join p.seller s
        join p.category c
        where p.breed like %:keyword%
           or p.colorFeatures like %:keyword%
           or s.username like %:keyword%
    """)
    Page<PostSite> findAllByKeyword(@Param("keyword") String keyword, Pageable pageable);
}