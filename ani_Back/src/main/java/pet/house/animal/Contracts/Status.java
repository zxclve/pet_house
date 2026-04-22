package pet.house.animal.Contracts;

public enum Status {
    A, C, P
}

// public enum Status {
//     ACTIVE("A"),
//     CANCELLED("C"),
//     PENDING("P");

//     private final String code;

//     Status(String code) {
//         this.code = code;
//     }

//     public String getCode() {
//         return code;
//     }

//     public static Status fromCode(String code) {
//         for (Status s : values()) {
//             if (s.code.equals(code)) return s;
//         }
//         throw new IllegalArgumentException("Invalid code: " + code);
//     }
// }