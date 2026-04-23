package pet.house.animal.Contracts;

public enum DeliveryMethod {

    DIRECT("DIR"),   // 직접 방문
    DELIVERY("DLV"), // 분양자 직접 배송
    PICKUP("PIK"),   // 펫택시
    MEET("MET"),     // 중간 장소
    ETC("ETC");      // 기타

    private final String code;

    DeliveryMethod(String code) {
        this.code = code;
    }

    public String getCode() {
        return code;
    }

    // DB → Enum 변환용 (중요)
    public static DeliveryMethod fromCode(String code) {
        for (DeliveryMethod m : values()) {
            if (m.code.equals(code)) {
                return m;
            }
        }
        throw new IllegalArgumentException("Unknown code: " + code);
    }
}