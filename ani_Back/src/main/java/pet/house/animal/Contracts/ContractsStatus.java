package pet.house.animal.Contracts;

public enum ContractsStatus {
    A("신청(ACTIVE)"),
    C("취소(CANCELLED)"),
    //P("보류(PENDING)"),
    //R("진행중(RUNNING)"),
    Y("완료(COMPLETED)");

    private final String description;

    ContractsStatus(String description) {
        this.description = description;
    }

    public String getDescription() {
        return description;
    }
}
