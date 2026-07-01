package pet.house.animal.Contracts;

public enum DeliveryMethod {

    DIRECT("DIR"),
    DELIVERY("DLV"),
    PICKUP("PIK"),
    MEET("MET"),
    ETC("ETC");

    private final String code;

    DeliveryMethod(String code) {
        this.code = code;
    }

    public String getCode() {
        return code;
    }

    public static DeliveryMethod fromCode(String code) {
        if (code == null || code.isBlank()) {
            return null;
        }
        for (DeliveryMethod method : values()) {
            if (method.code.equalsIgnoreCase(code) || method.name().equalsIgnoreCase(code)) {
                return method;
            }
        }
        throw new IllegalArgumentException("Unknown code: " + code);
    }
}
