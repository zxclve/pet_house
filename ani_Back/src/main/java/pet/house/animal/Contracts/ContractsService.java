package pet.house.animal.Contracts;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import pet.house.animal.Post.PostStatus;
import pet.house.animal.Post.PostService;
import pet.house.animal.Post.PostSite;
import pet.house.animal.User.User;
import pet.house.animal.User.UserRepository;
import pet.house.animal.User.UserType;

@Service // 서비스 컴포넌트 
@RequiredArgsConstructor // 이거 final 필드에 자동으로 인젝션할려고 사용(의존성 주입)
public class ContractsService {
    private final ContractsRepository contractsRepository; //계약 DB 접근
    private final UserRepository userRepository; //유저 DB 접근
    private final PostService postService; //게시글 상태 변경용 서비스

    //전체 계약 목록 조회(쓰기X, 읽기용)
    @Transactional(readOnly = true) //쓰기X
    public List<Contracts> getList() {
        return contractsRepository.findAll(); // 전체 조회
    }
    //분양 신청 
    @Transactional //트랜잭션 (중간 실패시 롤백)
    public void apply(Long postId, String loginId) {
        //로그인 ID로 사용자 조회
        User buyer = userRepository.findByLoginId(loginId)
                .orElseThrow(() -> new RuntimeException("유저를 찾을 수 없습니다."));
        //게시글 조회
        PostSite post = postService.getPost(postId);
        //이미 신청했는지 체크(중복 신청 방지)
        contractsRepository.findByPost_PostIdAndBuyer_UserId(postId, buyer.getUserId())
                .ifPresent(c -> { throw new RuntimeException("이미 신청한 게시글입니다."); });
        //계약 엔티티 생성 
        Contracts contracts = Contracts.builder()
                .post(post) //어떤 게시글
                .buyer(buyer) //신청한 사용자
                .adoption_app_date(LocalDate.now()) //신청날짜
                .status(ContractsStatus.A) //신청상태
                .contract_date(LocalDate.now()) //계약 날짜
                .deliveryMethod(Contracts_Delivery.DIRECT) //전달방식(기본값은 직접전달)
                .createdAt(LocalDateTime.now()) //생성시간
                .updatedAt(LocalDateTime.now()) //수정시간
                .build();

        contractsRepository.save(contracts); //DB저장

        // 게시글 상태도 같이 반영(신청)
        postService.updateStatus(postId, PostStatus.A);
    }

    //신청 취소
    @Transactional
    public void cancel(Long postId, String loginId) {
        //사용자 조회
        User buyer = userRepository.findByLoginId(loginId)
                .orElseThrow(() -> new RuntimeException("유저를 찾을 수 없습니다."));
        //해당 게시글 + 사용자 계약 조회
        Contracts contracts = contractsRepository.findByPost_PostIdAndBuyer_UserId(postId, buyer.getUserId())
                .orElseThrow(() -> new RuntimeException("신청 내역이 없습니다."));

        contracts.setStatus(ContractsStatus.C); //상태값을 C(취소) 로 변경
        contracts.setUpdatedAt(LocalDateTime.now()); //수정시간 업데이트
        contractsRepository.save(contracts); //DB저장

        // 게시글 상태도 같이 반영(취소)
        postService.updateStatus(postId, PostStatus.C); //게시글 상태도 취소로 변경
    }

    //관리자: 분양 완료 처리
    @Transactional
    public void completeByAdmin(Long postId, String adminLoginId) {
        //관리자 사용자 조회
        User admin = userRepository.findByLoginId(adminLoginId)
                .orElseThrow(() -> new RuntimeException("유저를 찾을 수 없습니다."));
        //관리자 권한 체크
        if (admin.getUserType() != UserType.A) {
            throw new RuntimeException("관리자만 완료 처리를 할 수 있습니다.");
        }
        //해당 게시글에서 가장 최근 ACTIVE 계약 조회
        Contracts contracts = contractsRepository
                .findTopByPost_PostIdAndStatusOrderByCreatedAtDesc(postId, ContractsStatus.A)
                .orElseThrow(() -> new RuntimeException("완료 처리할 신청(ACTIVE) 계약서가 없습니다."));

        contracts.setStatus(ContractsStatus.Y); // 상태를 완료(Y)로 변경
        contracts.setUpdatedAt(LocalDateTime.now());
        contractsRepository.save(contracts);

        // 게시글 상태도 같이 반영(완료)
        postService.updateStatus(postId, PostStatus.Y);
    }
    // 관리자: 신청 취소 처리
    @Transactional
    public void cancelByAdmin(Long postId, String adminLoginId) {

        // 관리자 조회
        User admin = userRepository.findByLoginId(adminLoginId)
                .orElseThrow(() -> new RuntimeException("유저를 찾을 수 없습니다."));
        // 관리자 권한 체크
        if (admin.getUserType() != UserType.A) {
            throw new RuntimeException("관리자만 취소 처리를 할 수 있습니다.");
        }
        // 가장 최근 ACTIVE 계약 조회
        Contracts contracts = contractsRepository
                .findTopByPost_PostIdAndStatusOrderByCreatedAtDesc(postId, ContractsStatus.A)
                .orElseThrow(() -> new RuntimeException("취소 처리할 신청(ACTIVE) 계약서가 없습니다."));

        contracts.setStatus(ContractsStatus.C); // 상태를 취소(C)로 변경
        contracts.setUpdatedAt(LocalDateTime.now());
        contractsRepository.save(contracts);

        postService.updateStatus(postId, PostStatus.C); // 게시글 상태도 취소로 변경
    }
}
