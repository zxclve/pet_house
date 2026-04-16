# pet_house
반려동물 분양샵

## Tech Stack

### Backend
- Spring Boot 3.5.13
- Java 17
- Gradle (Groovy)

### Frontend
- Next.js
- React
- TypeScript
- Tailwind CSS

### Configuration
- YAML

### Packaging
- Jar

### Dependencies
- Spring Web
- Lombok

### Project Structure
- pet_house/
- ├─ backend/    # Spring Boot (API 서버)
- ├─ frontend/   # Next.js (React + TypeScript)
- └─ README.md

### 실행 방법
# Backend 실행
- cd backend
- ./gradlew bootRun

- (Windows)

- gradlew.bat bootRun

# Frontend 실행
- cd frontend
- npm install
- npm run dev
- localhost:http://localhost:3000

### GitBash 셋팅 방법
# Git 클론 생성
- 작업할 폴더에서 우클릭후 GitBash 클릭!
- git clone https://github.com/zxclve/pet_house.git 
# Git dev 브랜치로 이동
- git checkout dev
# Git dev 브랜치에서 본인이 작업할 브랜치 생성
- git checkout -b feature/기능명


###### Git 커밋_푸쉬 할때 주의사항 ######
- 가급적이면 브렌치 를 이용해서 작업 
- BackEnd 작업시 폴더 선택을 ani_back 으로 선택
- FrontEnd 작업시 폴더 선택을 ani_front 으로 선택
- 작업 마무리 후 커밋_푸쉬 할때는 pet_house 폴더 선택후 진행!!!

### Git-협업방법(VSCODE)
https://develoft.tistory.com/7
