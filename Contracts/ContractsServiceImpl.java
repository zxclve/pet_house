package pet.house.animal.Contracts;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ContractsServiceImpl implements ContractsService {

    private final ContractsRepository repository;
    private final ContractsMapper mapper;

    @Override
    public PostContractResponse getContracts(
            String type,
            Long contractId,
            String status
    ) {

        // =========================
        // 🔥 방어코드
        // =========================
        if (type == null || type.isBlank()) {
            type = "A";
        }

        if (status == null || status.isBlank()) {
            throw new IllegalArgumentException("status는 필수입니다.");
        }

        // =========================
        // DB CALL
        // =========================
        List<Object[]> result =
                repository.callContractsProc(type, contractId, status);

        if (result == null || result.isEmpty()) {
            return new PostContractResponse();
        }

        List<ContractFlatDTO> rows = convertToFlatDTO(result);

        // =========================
        // C: 계약만
        // =========================
        if ("C".equals(type)) {
            PostContractResponse res = new PostContractResponse();
            res.setContracts(mapper.toContracts(rows));
            return res;
        }

        // =========================
        // A: 전체
        // =========================
        return mapper.toResponse(rows);
    }

    // =========================
    // DTO 변환
    // =========================
    private List<ContractFlatDTO> convertToFlatDTO(List<Object[]> result) {

        List<ContractFlatDTO> list = new ArrayList<>();

        for (Object[] r : result) {

            ContractFlatDTO dto = new ContractFlatDTO();
            int i = 0;

            dto.setContractId(((Number) r[i++]).longValue());

            dto.setAdoptionAppDate(toLocalDate((Date) r[i++]));
            dto.setContractStatus((String) r[i++]);
            dto.setConfirmedAdopteeFlag((String) r[i++]);
            dto.setContractDate(toLocalDate((Date) r[i++]));

            dto.setDeliveryMethod((String) r[i++]);
            dto.setAdoptionFee((java.math.BigDecimal) r[i++]);
            dto.setCommissionFee((java.math.BigDecimal) r[i++]);
            dto.setTotalAmount((java.math.BigDecimal) r[i++]);

            dto.setContractCreatedAt(toLocalDateTime((Timestamp) r[i++]));
            dto.setContractUpdatedAt(toLocalDateTime((Timestamp) r[i++]));

            dto.setBuyerId(((Number) r[i++]).longValue());
            dto.setBuyerUsername((String) r[i++]);
            dto.setBuyerAddress1((String) r[i++]);
            dto.setBuyerAddress2((String) r[i++]);
            dto.setBuyerUserType((String) r[i++]);
            dto.setBuyerEmail((String) r[i++]);
            dto.setBuyerPhoneNumber((String) r[i++]);

            // A일 때만 post 존재
            if (r.length > i) {

                dto.setPostId(((Number) r[i++]).longValue());
                dto.setBreed((String) r[i++]);
                dto.setGender((String) r[i++]);

                dto.setBirthDate(toLocalDate((Date) r[i++]));
                dto.setColorFeatures((String) r[i++]);

                dto.setPrice((java.math.BigDecimal) r[i++]);
                dto.setHealthStatus((String) r[i++]);
                dto.setAdoptionStatus((String) r[i++]);
                dto.setImageUrl((String) r[i++]);

                dto.setPostsCreatedAt(toLocalDateTime((Timestamp) r[i++]));
                dto.setPostsUpdatedAt(toLocalDateTime((Timestamp) r[i++]));

                dto.setSellerId(((Number) r[i++]).longValue());
                dto.setSellerUsername((String) r[i++]);
                dto.setSellerAddress1((String) r[i++]);
                dto.setSellerAddress2((String) r[i++]);
                dto.setSellerUserType((String) r[i++]);
                dto.setSellerEmail((String) r[i++]);
                dto.setSellerPhoneNumber((String) r[i++]);
            }

            list.add(dto);
        }

        return list;
    }

    private LocalDate toLocalDate(Date date) {
        return date != null ? date.toLocalDate() : null;
    }

    private LocalDateTime toLocalDateTime(Timestamp ts) {
        return ts != null ? ts.toLocalDateTime() : null;
    }
}