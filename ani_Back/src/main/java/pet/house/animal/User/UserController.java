package pet.house.animal.User;

import java.util.HashMap;
import java.util.Map;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping("/user")
public class UserController {

    private final UserService userService;
    private final JwtTokenProvider jwtTokenProvider;
    private final PasswordEncoder passwordEncoder;

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@Valid @RequestBody UserCreateForm userCreateForm, BindingResult bindingResult) {
        Map<String, String> response = new HashMap<>();

        if (bindingResult.hasErrors()) {
            return ResponseEntity.badRequest().body(bindingResult.getAllErrors());
        }

        if (!userCreateForm.getPassword().equals(userCreateForm.getPasswordConfirm())) {
            response.put("message", "비밀번호 확인이 일치하지 않습니다.");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }

        try {
            userService.create(userCreateForm);
            response.put("message", "회원가입이 완료되었습니다.");
            return ResponseEntity.ok(response);
        } catch (DataIntegrityViolationException e) {
            String detail = e.getMostSpecificCause() != null ? e.getMostSpecificCause().getMessage() : "";
            boolean duplicateViolation = detail.contains("Unique index")
                    || detail.contains("duplicate")
                    || detail.contains("UK");

            if (duplicateViolation) {
                response.put("message", "이미 등록된 아이디 또는 이메일입니다.");
                return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
            }

            response.put("message", "입력값에 오류가 있습니다. 다시 확인해 주세요.");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        } catch (Exception e) {
            response.put("message", "회원가입 중 오류가 발생했습니다.");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> user) {
        Map<String, Object> response = new HashMap<>();

        UserEntity member = userService.getUser(user.get("loginid"));
        if (member == null || !passwordEncoder.matches(user.get("password"), member.getPassword())) {
            response.put("message", "아이디 또는 비밀번호가 올바르지 않습니다.");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }

        String token = jwtTokenProvider.createToken(member.getLoginid());
        boolean isAdmin = member.getUsertype() == UserType.A || "admin".equalsIgnoreCase(member.getLoginid());

        response.put("token", token);
        response.put("username", member.getUsername());
        response.put("userid", member.getUserid());
        response.put("usertype", member.getUsertype().name());
        response.put("isAdmin", isAdmin);
        response.put("message", "로그인 성공");

        return ResponseEntity.ok(response);
    }
}
