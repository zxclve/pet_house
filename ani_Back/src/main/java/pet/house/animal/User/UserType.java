package pet.house.animal.User;

public enum UserType {
    A("Admin"),
    I("individual(개인)"),
    B("business(사업자)");

    private final String description;

    UserType(String description) {
        this.description = description;
    }

    public String getDescription() {
        return description;
    }
}
