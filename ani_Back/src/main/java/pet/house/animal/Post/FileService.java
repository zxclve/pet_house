package pet.house.animal.Post;

import java.io.File;
import java.io.IOException;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class FileService {
    
    @Value("${file.path}")
    private String uploadPath;

    public String upload(MultipartFile file){
        try{
            //폴더 생성
            File dir = new File(uploadPath);
            if (!dir.exists()) dir.mkdirs();

            // 파일명 생성 (UUID)
            String originalName = file.getOriginalFilename();
            String ext = originalName.substring(originalName.lastIndexOf("."));
            String savedName = UUID.randomUUID() + ext;

            // 저장
            File target = new File(uploadPath + "/" + savedName);
            file.transferTo(target);

            // URL 반환
            return "/images/" + savedName;

        } catch (IOException e) {
            throw new RuntimeException("파일 업로드 실패");
        }
    }
}
 //UUID란? / 사용이유
// : 128비트 고유식별자로서, 36자리 문자열 형태이다.
// : 파일명을 저장하기 위해서, 랜덤으로 UUID를 생성하여
// "UUID" + "_" + "파일명" 의 형태로 업로드 파일을 저장한다.
// UUID를 단독으로 사용해도 거의 문제가 발생하지 않지만, 희박하게 공통의 UUID가 생성되어 문제가 발생할 수도 있기에 파일명과 함께 조합하여 업로드 파일명을 관리한다.