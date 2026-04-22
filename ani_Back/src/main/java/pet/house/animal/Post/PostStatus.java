package pet.house.animal.Post;

public enum PostStatus { //게시글 상태 관리
    A("ACTIVE(신청)"),
    C("CANCELLED(취소)"),
    //P("PENDING(대기)"),
    Y("COMPLETED(완료)");

    private final String description;

    PostStatus(String description) {
        this.description = description;
    }

    public String getDescription() {
        return description;
    }
}
