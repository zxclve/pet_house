package pet.house.animal.User;

import java.time.LocalDateTime;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id", nullable = false, unique = true)
    private Long userid;

    @Column(name = "login_id", nullable = false, unique = true, length = 50)
    private String loginid;

    @Email
    @Column(name = "email", nullable = false, unique = true, length = 100)
    private String email;

    @Column(name = "password", nullable = false, length = 255)
    private String password;

    @Column(name = "user_name", nullable = false, length = 50)
    private String username;

    @Column(name = "phone_num", nullable = false, length = 20)
    private String phonenum;

    @Column(name = "address1", nullable = false, length = 255)
    private String address1;

    @Column(name = "address2", nullable = true, columnDefinition = "TEXT")
    private String address2;

    @Enumerated(EnumType.STRING)
    @Column(name = "user_type", nullable = false, length = 1, columnDefinition = "CHAR(1) DEFAULT 'I'") 
    private UserType usertype = UserType.I; 

    @CreationTimestamp
    @Column(name = "created_at", updatable = false, 
            columnDefinition = "DATETIME DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime createdat;
    
    @UpdateTimestamp
    @Column(name = "updated_at", 
            columnDefinition = "DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP")
    private LocalDateTime updatedat;
}