package pet.house.animal.Post;

import java.io.IOException;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@Service
public class PostSseService { //실시간 알림용 (서버 -> 클라이언트 이벤트 푸시)
    private final List<SseEmitter> emitters = new CopyOnWriteArrayList<>(); // 멀티 스레드 안전 리스트(여러 사용자 동시 접속 가능)

    public SseEmitter subscribe() { //클라이언트 연결 설정
        SseEmitter emitter = new SseEmitter(60_000L); //60초 타임아웃 설정
        emitters.add(emitter); //연결 리스트에 추가

        emitter.onCompletion(() -> emitters.remove(emitter)); //연결 종료 시 리스트에서 제거
        emitter.onTimeout(() -> emitters.remove(emitter)); //타임아웃 시 리스트에서 제거
        emitter.onError(e -> emitters.remove(emitter)); //에러 시 리스트에서 제거

        return emitter;//클라이언트 연결 반환
    } //왜 subscribe() 메서드를 사용? -> 연결 끊기면 emitter 제거 (메모리 누수 방지)

    public void broadcastPostUpdated(Long postId) { //게시글 업데이트 알림 브로드캐스트
        for (SseEmitter emitter : emitters) { //모든 클라이언트에 대해 반복
            try {
                emitter.send(SseEmitter.event() //이벤트 생성
                        .name("post-updated") //이벤트 이름
                        .data(postId)); //이벤트 데이터
            } catch (IOException e) { //IO 예외 처리
                emitters.remove(emitter); //예외 발생 시 연결 리스트에서 제거
            }
        }
    }
}

//SseEmitter = 클라이언트와 연결된 하나의 통신 채널
//emitters = 그 채널들을 모아둔 목록