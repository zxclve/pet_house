package pet.house.animal.User;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import pet.house.animal.DataNotFoundException;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserEntity create(UserCreateForm form) {
        UserEntity user = new UserEntity();
        user.setLoginid(form.getLoginid());
        user.setUsername(form.getUsername());
        user.setEmail(form.getEmail());
        user.setPhonenum(form.getPhonenum());
        user.setAddress1(form.getAddress1());
        user.setAddress2(form.getAddress2());
        user.setUsertype(UserType.I);
        
        user.setPassword(passwordEncoder.encode(form.getPassword()));
        
        return this.userRepository.save(user);
    }

    public UserEntity getUser(String loginid) {
        return this.userRepository.findByLoginid(loginid)
                .orElse(null);
    }

    public UserEntity getUserOrThrow(String loginid) {
        return this.userRepository.findByLoginid(loginid)
                .orElseThrow(() -> new DataNotFoundException("사용자를 찾을 수 없습니다."));
    }

    public UserDTO getUserDto(String loginid) {
        UserEntity user = this.getUserOrThrow(loginid);
        
        UserDTO dto = new UserDTO();
        dto.setUserid(user.getUserid());
        dto.setLoginid(user.getLoginid());
        dto.setEmail(user.getEmail());
        dto.setUsername(user.getUsername());
        dto.setPhonenum(user.getPhonenum());
        dto.setAddress1(user.getAddress1());
        dto.setAddress2(user.getAddress2());
        dto.setUsertype(user.getUsertype().name());
        dto.setCreatedat(user.getCreatedat());
        
        return dto;
    }
}