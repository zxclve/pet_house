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
import pet.house.animal.Post.PostSite;
import java.util.List;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id", nullable = false, unique = true)
    private Long userId;

    @Column(name = "login_id", nullable = false, unique = true, length = 50)
    private String login_id;

   @Email
   @Column(name = "email", nullable = false, unique = true, length = 100)
   private String email;

    @Column(name = "password", nullable = false, length = 255)
    private String password;

    @Column(name = "username", nullable = false, length = 50)
    private String username;

    @Column(name = "phone_number", nullable = false, length = 20)
    private String phone_number;

    @Column(name = "address1", nullable = false, length = 255)
    private String address1;

    @Column(name = "address2", columnDefinition = "TEXT")
    private String address2;

    @Enumerated(EnumType.STRING)
    @Column(name = "user_type", nullable = false, length = 1,
            columnDefinition = "CHAR(1) DEFAULT 'I'")
    private UserType user_type = UserType.I;

    @Column(name = "created_at", updatable = false,
            columnDefinition = "DATETIME DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime created_at;

    @Column(name = "updated_at",
            columnDefinition = "DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP")
    private LocalDateTime updated_at;

    @OneToMany(mappedBy = "seller")
    private List<PostSite> posts;
}