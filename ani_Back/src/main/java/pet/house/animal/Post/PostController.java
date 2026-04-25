package pet.house.animal.Post;

import java.security.Principal;

import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import lombok.RequiredArgsConstructor;

@RestController //REST API 컨트롤러(JSON응답)
@RequestMapping("/api/posts") 
@RequiredArgsConstructor //이거 final 필드에 자동으로 인젝션할려고 사용(의존성 주입)
public class PostController {
    private final PostService postService; //게시글 비즈니스 로직
    private final PostSseService postSseService; //SSE 실시간 서비스
    private final pet.house.animal.Contracts.ContractsService contractsService; //계약(신청/취소/완료) 처리 서비스

    //게시글 목록 조회(페이징 + 검색)
    //H2 db http://localhost:8686/h2-console/login.jsp?jsessionid=785e37dd2dfd8622271cccb69b48d206
    //h2 db jdbc:h2:mem:testdb에 sa
    // GET /api/posts?page=0&keyword=검색어 -> SWAGGER 달아놓았음 http://localhost:8686/swagger-ui/index.html 확인
    @GetMapping
    public Page<PostSite> list(
            @RequestParam(defaultValue = "0") int page, //페이지 번호
            @RequestParam(defaultValue = "") String keyword) { //검색어(기본값은 공백으로)
        return postService.getList(page, keyword); //postService 호출해서 페이징 데이터 반환 
    }

    //게시글 상세조회
    // GET /api/posts/{postId}
    @GetMapping("/{postId}")
    public PostSite detail(@PathVariable Long postId) {
        return postService.getPost(postId); //ID로 게시글 조회
    }

    //게시글 생성
    // POST /api/posts
    @PostMapping(consumes = "multipart/form-data")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<PostSite> create(
            @RequestPart("post") PostSite postSite,
            @RequestPart(value = "image", required = false) MultipartFile image
    ) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(postService.createPost(postSite, image));
    }

    //분양신청
    // POST /api/posts/{postId}/apply
    @PostMapping("/{postId}/apply")
    @PreAuthorize("isAuthenticated()") //로그인 사용자만 접근가능
    public ResponseEntity<?> apply(@PathVariable Long postId, Principal principal) {
        //인증객체 없으면 401상태코드 반환
        if (principal == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        String loginId = principal.getName(); //현재 로그인한 사용자ID
        contractsService.apply(postId, loginId); //계약 서비스에 신청 로직 위임했음
        postSseService.broadcastPostUpdated(postId); //SSE 실시간 알림 -> 해당 게시글 변경 이벤트 전송 
        return ResponseEntity.ok().build(); // 성공시 200상태코드 반환
    }

    //분양 신청 취소
    // POST /api/posts/{postId}/cancel
    @PostMapping("/{postId}/cancel")
    @PreAuthorize("isAuthenticated()") //로그인 사용자만 접근가능
    public ResponseEntity<?> cancel(@PathVariable Long postId, Principal principal) {
        //인증 객체 없으면 401상태코드 반환 
        if (principal == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        String loginId = principal.getName(); //현재 로그인한 사용자ID
        contractsService.cancel(postId, loginId); //계약서비스에 로직 위임
        postSseService.broadcastPostUpdated(postId); //SSE 실시간 알림 -> 해당 게시글 변경 이벤트 전송
        return ResponseEntity.ok().build(); //성공시 200상태코드 반환
    }

    // 관리자: 분양 완료 처리
    // POST /api/posts/{postId}/complete
    @PostMapping("/{postId}/complete")
    @PreAuthorize("isAuthenticated()") // 지금은 권한을 나누지 않아서 ADMIN/USER가 나눠져있지않지만 시간이 남는다면 적용 예정
    public ResponseEntity<?> completeByAdmin(@PathVariable Long postId, Principal principal) {
        if (principal == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        String adminLoginId = principal.getName();
        contractsService.completeByAdmin(postId, adminLoginId); //관리자 권한으로 완료처리
        postSseService.broadcastPostUpdated(postId); //SSE 실시간 알림 -> 해당 게시글 변경 이벤트 전송
        return ResponseEntity.ok().build();
    }

    // 관리자 : 분양 취소 처리
    // POST /api/posts/{postId}/admin-cancel
    @PostMapping("/{postId}/admin-cancel")
    @PreAuthorize("isAuthenticated()") // 지금은 권한을 나누지 않아서 ADMIN/USER가 나눠져있지않지만 시간이 남는다면 적용 예정
    public ResponseEntity<?> cancelByAdmin(@PathVariable Long postId, Principal principal) {
        if (principal == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        String adminLoginId = principal.getName();
        contractsService.cancelByAdmin(postId, adminLoginId); // 관리자 취소 처리
        postSseService.broadcastPostUpdated(postId);
        return ResponseEntity.ok().build();
    }

    // SSE 구독 엔드포인트
    // GET /api/posts/stream
    @GetMapping("/stream")
    public SseEmitter stream() {
        // 클라이언트가 호출하면 emitter 생성 후 연결 유지
        // SSE -> 서버가 요청없이도 웹페이지에 새로운 데이터 전송(웹소켓으로도 구현가능)
        // 이후 서버에서 이벤트 발생 시 push 전송됨
        return postSseService.subscribe();
    }

}