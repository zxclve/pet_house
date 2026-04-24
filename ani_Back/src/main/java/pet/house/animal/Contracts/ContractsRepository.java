package pet.house.animal.Contracts;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ContractsRepository extends JpaRepository<Contracts, Long>{
    
    // @Query(value = "CALL adoption_contracts_inquery_proc(:type, :contractId, :status, @o_error_code, @o_error_msg)", nativeQuery = true)
    @Query(value = "CALL adoption_contracts_inquery_proc(:type, :postId, :contractId, :status)", nativeQuery = true)
    List<Object[]> callContractsProc(
            @Param("type") String type,
            @Param("postId") Long postId,
            @Param("contractId") Long contractId,
            @Param("status") String status
            
    );    

}
