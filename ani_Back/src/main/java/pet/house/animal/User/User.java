package pet.house.animal.User;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) //auto_increase
    @Column(name = "user_id", nullable = false,  unique = true)
    private Long userId; //PK , 유저 관리할때 필요한 ID
    
    @Column(name = "login_id", nullable = false, unique = true, length = 50)
    private String login_id; //로그인 아이디

    @Email
    @Column(name = "email", nullable = false, unique = true, length = 100)
    private Email email; //이메일

    @Column(name = "password", nullable = false, length = 255)
    private String password; //비밀번호

    @Column(name = "username", nullable = false, length = 50)
    private String username; //유저 이름

    @Column(name = "phone_number", nullable = false, length = 20)
    private String phone_number; //전화번호

    @Column(name = "address1", nullable = false, length = 255)
    private String address1; //기본주소(도)

    @Column(name = "address2", nullable = true, columnDefinition = "TEXT")
    private String address2; //상세주소(시군구)

    @Column(name = "user_type", nullable = false, length = 1, columnDefinition = "CHAR(1) DEFAULT 'I'") 
    @Enumerated(EnumType.STRING)
    private UserType user_type = UserType.I; 
    // A("Admin"), I("individual(개인)"), B("business(사업자)");

    @Column(name = "created_at", updatable = false,
            columnDefinition = "DATETIME DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime created_at; //회원가입 날짜
    
    @Column(name = "updated_at",
            columnDefinition = "DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP")
    private LocalDateTime updated_at; //회원정보 수정 날짜
}
