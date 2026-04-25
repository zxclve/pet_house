package pet.house.animal.User;

import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;

@Getter
@Setter
public class UserDTO {
    private Long userid;

    private String loginid;
    private String email;
    private String username;

    private String phonenum;
    private String address1;
    private String address2;

    private String usertype;

    private LocalDateTime createdat;
}