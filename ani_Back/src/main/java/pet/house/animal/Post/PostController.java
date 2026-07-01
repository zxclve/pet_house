package pet.house.animal.Post;

import java.security.Principal;

import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/posts")
@RequiredArgsConstructor
public class PostController {

    private final PostService postService;
    private final PostSseService postSseService;
    private final pet.house.animal.Contracts.ContractsService contractsService;

    @GetMapping
    public Page<PostSite> list(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "") String keyword
    ) {
        return postService.getList(page, keyword);
    }

    @GetMapping("/{postId}")
    public PostSite detail(@PathVariable Long postId) {
        return postService.getPost(postId);
    }

    @PostMapping(value = "/create", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<PostSite> create(
            @RequestPart("post") PostSite postSite,
            @RequestPart(value = "image", required = false) MultipartFile image
    ) {
        return ResponseEntity.status(HttpStatus.CREATED).body(postService.createPost(postSite, image));
    }

    @PostMapping(value = "/create-json", consumes = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<PostSite> createJson(@RequestBody PostSite postSite) {
        return ResponseEntity.status(HttpStatus.CREATED).body(postService.createPost(postSite, null));
    }

    @PostMapping("/{postId}/apply")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> apply(@PathVariable Long postId, Principal principal) {
        if (principal == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        String loginId = principal.getName();
        contractsService.apply(postId, loginId);
        postSseService.broadcastPostUpdated(postId);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/{postId}/cancel")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> cancel(@PathVariable Long postId, Principal principal) {
        if (principal == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        String loginId = principal.getName();
        contractsService.cancel(postId, loginId);
        postSseService.broadcastPostUpdated(postId);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/{postId}/complete")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> completeByAdmin(@PathVariable Long postId, Principal principal) {
        if (principal == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        String adminLoginId = principal.getName();
        contractsService.completeByAdmin(postId, adminLoginId);
        postSseService.broadcastPostUpdated(postId);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/{postId}/admin-cancel")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> cancelByAdmin(@PathVariable Long postId, Principal principal) {
        if (principal == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        String adminLoginId = principal.getName();
        contractsService.cancelByAdmin(postId, adminLoginId);
        postSseService.broadcastPostUpdated(postId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/stream")
    public SseEmitter stream() {
        return postSseService.subscribe();
    }
}
