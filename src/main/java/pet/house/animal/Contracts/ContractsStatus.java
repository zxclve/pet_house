package pet.house.animal.Contracts;

public enum ContractsStatus {
    DIRECT("직접 방문"),
    MEET("직거래"),
    PICKUP("배송 서비스"),
    DELIVER("분양자 직접 배송");

    private final String description;

    ContractsStatus(String description) {
        this.description = description;
    }

    public String getDescription() {
        return description;
    }
}
