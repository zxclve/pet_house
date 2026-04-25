package pet.house.animal.Contracts;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ContractsRepository extends JpaRepository<Contracts, Long> {
    Optional<Contracts> findByPost_PostIdAndBuyer_Userid(Long postId, Long buyerId);

    Optional<Contracts> findTopByPost_PostIdAndStatusOrderByCreatedAtDesc(Long postId, ContractsStatus status);
}

