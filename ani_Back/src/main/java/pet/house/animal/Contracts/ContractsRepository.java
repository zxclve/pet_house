package pet.house.animal.Contracts;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ContractsRepository extends JpaRepository<Contracts, Long> {

    @Query(value = "CALL adoption_contracts_inquery_proc(:type, :contractId, :status, @o_error_code, @o_error_msg)", nativeQuery = true)
    List<Object[]> callContractsProc(
            @Param("type") String type,
            @Param("contractId") Long contractId,
            @Param("status") String status
    );

    boolean existsByPostIdAndBuyerIdAndStatus(Long postId, Long buyerId, Status status);

    Optional<Contracts> findFirstByPostIdAndBuyerIdAndStatusOrderByContractIdDesc(Long postId, Long buyerId, Status status);

    List<Contracts> findByPostIdOrderByContractIdAsc(Long postId);

    /**
     * 계약이 있는 게시글 ID 목록 (최근 계약이 있는 글 우선). status가 null이면 전체 상태.
     */
    @Query("select c.postId from Contracts c where (:st is null or c.status = :st) group by c.postId order by max(c.contractId) desc")
    List<Long> findPostIdsForListing(@Param("st") Status st);
}
