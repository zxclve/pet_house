package pet.house.animal.Contracts;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ContractsService {

    private final ContractsRepository contractsRepository;
    private final ContractsMapper contractsMapper;

    public PostContractResponse getContracts(String type, Long postId, Long contractId, String status) {

        List<Object[]> rows =
                contractsRepository.callContractsProc(type, postId, contractId, status);

        if (rows == null || rows.isEmpty()) {
            return new PostContractResponse();
        }

        List<ContractFlatDTO> dtoList = rows.stream()
                .filter(r -> r != null)
                .map(this::convertToDTO)
                .collect(Collectors.toList());

        return contractsMapper.toResponse(dtoList);
    }

    private ContractFlatDTO convertToDTO(Object[] row) {

        System.out.println("ROW = " + java.util.Arrays.toString(row));

        if (row == null) return null;

        ContractFlatDTO dto = new ContractFlatDTO();
        int i = 0;

        dto.setContractId(toLongSafe(row[i++]));
        dto.setAdoptionAppDate(toLocalDateSafe(row[i++]));
        dto.setContractStatus(toString(row[i++]));
        dto.setConfirmedAdopteeFlag(toString(row[i++]));
        dto.setContractDate(toLocalDateSafe(row[i++]));
        dto.setDeliveryMethod(toString(row[i++]));
        dto.setAdoptionFee(toBigDecimal(row[i++]));
        dto.setCommissionFee(toBigDecimal(row[i++]));
        dto.setTotalAmount(toBigDecimal(row[i++]));
        dto.setContractCreatedAt(toLocalDateTimeSafe(row[i++]));
        dto.setContractUpdatedAt(toLocalDateTimeSafe(row[i++]));

        dto.setBuyerId(toLongSafe(row[i++]));
        dto.setBuyerUsername(toString(row[i++]));
        dto.setBuyerAddress1(toString(row[i++]));
        dto.setBuyerAddress2(toString(row[i++]));
        dto.setBuyerUserType(toString(row[i++]));
        dto.setBuyerEmail(toString(row[i++]));
        dto.setBuyerPhoneNumber(toString(row[i++]));
        dto.setCategoryName(toString(row[i++]));

        // dto.setPostId(toLongSafe(row[i++]));
        // dto.setBreed(toString(row[i++]));
        // dto.setGender(toString(row[i++]));
        // dto.setBirthDate(toLocalDateSafe(row[i++]));
        // dto.setColorFeatures(toString(row[i++]));
        // dto.setPrice(toBigDecimal(row[i++]));
        // dto.setHealthStatus(toString(row[i++]));
        // dto.setAdoptionStatus(toString(row[i++]));
        // dto.setImageUrl(toString(row[i++]));

        dto.setPostId(toLongSafe(row[i++]));
        dto.setBreed(toString(row[i++]));
        dto.setGender(toString(row[i++]));
        dto.setBirthDate(toLocalDateSafe(row[i++]));
        dto.setColorFeatures(toString(row[i++]));
        dto.setPrice(toBigDecimal(row[i++]));
        dto.setHealthStatus(toString(row[i++]));
        dto.setAdoptionStatus(toString(row[i++]));
        dto.setImageUrl(toString(row[i++]));
        dto.setPostsCreatedAt(toLocalDateTimeSafe(row[i++]));
        dto.setPostsUpdatedAt(toLocalDateTimeSafe(row[i++]));

        

        dto.setSellerId(toLongSafe(row[i++]));
        dto.setSellerUsername(toString(row[i++]));
        dto.setSellerAddress1(toString(row[i++]));
        dto.setSellerAddress2(toString(row[i++]));
        dto.setSellerUserType(toString(row[i++]));
        dto.setSellerEmail(toString(row[i++]));
        dto.setSellerPhoneNumber(toString(row[i]));
        

        return dto;
    }

    // =========================
    // SAFE LONG
    // =========================
    private Long toLongSafe(Object obj) {
        if (obj == null) return null;

        if (obj instanceof Number n) {
            return n.longValue();
        }

        try {
            String v = obj.toString().trim();
            if (v.isEmpty() || "null".equalsIgnoreCase(v)) return null;
            return Long.parseLong(v);
        } catch (Exception e) {
            System.out.println("❌ Long 변환 실패 값: " + obj);
            return null;
        }
    }

    // =========================
    // SAFE STRING
    // =========================
    private String toString(Object obj) {
        if (obj == null) return null;

        String v = obj.toString().trim();
        if (v.isEmpty() || "null".equalsIgnoreCase(v)) return null;

        return v;
    }

    // =========================
    // SAFE BIGDECIMAL
    // =========================
    private BigDecimal toBigDecimal(Object obj) {
        if (obj == null) return null;
        if (obj instanceof BigDecimal bd) return bd;
        if (obj instanceof Number n) return BigDecimal.valueOf(n.doubleValue());

        try {
            return new BigDecimal(obj.toString().trim());
        } catch (Exception e) {
            return null;
        }
    }

    // =========================
    // SAFE DATETIME
    // =========================
    private LocalDateTime toLocalDateTimeSafe(Object obj) {
        if (obj == null) return null;

        if (obj instanceof java.sql.Timestamp ts) {
            return ts.toLocalDateTime();
        }

        if (obj instanceof LocalDateTime ldt) {
            return ldt;
        }

        try {
            String v = obj.toString().trim();

            if (v.isEmpty() || "null".equalsIgnoreCase(v)) return null;

            return LocalDateTime.parse(v.replace(" ", "T"));
        } catch (Exception e) {
            System.out.println("❌ DateTime 변환 실패: " + obj);
            return null;
        }
    }

    // =========================
    // SAFE DATE
    // =========================
    private LocalDate toLocalDateSafe(Object obj) {
        if (obj == null) return null;

        if (obj instanceof java.sql.Date d) {
            return d.toLocalDate();
        }

        if (obj instanceof java.sql.Timestamp ts) {
            return ts.toLocalDateTime().toLocalDate();
        }

        if (obj instanceof LocalDate ld) {
            return ld;
        }

        try {
            String v = obj.toString().trim();

            if (v.isEmpty() || "null".equalsIgnoreCase(v)) return null;

            // 🔥 핵심: 시간 포함된 경우 제거
            if (v.contains(" ")) {
                v = v.split(" ")[0];
            }

            return LocalDate.parse(v);
        } catch (Exception e) {
            System.out.println("❌ Date 변환 실패: " + obj);
            return null;
        }
    }

    // =========================
    // TODO
    // =========================
    public void apply(Long postId, String loginId) {}
    public void cancel(Long postId, String loginId) {}
    public void completeByAdmin(Long postId, String adminLoginId) {}
    public void cancelByAdmin(Long postId, String adminLoginId) {}
}