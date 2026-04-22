package pet.house.animal.Contracts;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ContractsService {

    private final ContractsRepository contractsRepository;
    private final ContractsMapper contractsMapper;

    public PostContractResponse getContracts(String type, Long contractId, String status) {

        // 1️⃣ 프로시저 호출
        List<Object[]> rows =
                contractsRepository.callContractsProc(type, contractId, status);

        // 2️⃣ Object[] → DTO 변환
        List<ContractFlatDTO> dtoList = rows.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());

        // 3️⃣ Mapper 호출
        return contractsMapper.toResponse(dtoList);
    }

    // 🔥 핵심 변환 로직
    private ContractFlatDTO convertToDTO(Object[] row) {

        ContractFlatDTO dto = new ContractFlatDTO();

        int i = 0;

        dto.setContractId(((Number) row[i++]).longValue());
        dto.setAdoptionAppDate((LocalDate) row[i++]);
        dto.setContractStatus((String) row[i++]);
        dto.setConfirmedAdopteeFlag((String) row[i++]);
        dto.setContractDate((LocalDate) row[i++]);
        dto.setDeliveryMethod((String) row[i++]);
        dto.setAdoptionFee((BigDecimal) row[i++]);
        dto.setCommissionFee((BigDecimal) row[i++]);
        dto.setTotalAmount((BigDecimal) row[i++]);
        dto.setContractCreatedAt((LocalDateTime) row[i++]);
        dto.setContractUpdatedAt((LocalDateTime) row[i++]);

        dto.setBuyerId(((Number) row[i++]).longValue());
        dto.setBuyerUsername((String) row[i++]);
        dto.setBuyerAddress1((String) row[i++]);
        dto.setBuyerAddress2((String) row[i++]);
        dto.setBuyerUserType((String) row[i++]);
        dto.setBuyerEmail((String) row[i++]);
        dto.setBuyerPhoneNumber((String) row[i++]);
        dto.setCategoryName((String) row[i++]);

        dto.setPostId(((Number) row[i++]).longValue());
        dto.setBreed((String) row[i++]);
        dto.setGender((String) row[i++]);
        dto.setBirthDate((LocalDate) row[i++]);
        dto.setColorFeatures((String) row[i++]);
        dto.setPrice((BigDecimal) row[i++]);
        dto.setHealthStatus((String) row[i++]);
        dto.setAdoptionStatus((String) row[i++]);
        dto.setImageUrl((String) row[i++]);
        dto.setPostsCreatedAt((LocalDateTime) row[i++]);
        dto.setPostsUpdatedAt((LocalDateTime) row[i++]);

        dto.setSellerId(((Number) row[i++]).longValue());
        dto.setSellerUsername((String) row[i++]);
        dto.setSellerAddress1((String) row[i++]);
        dto.setSellerAddress2((String) row[i++]);
        dto.setSellerUserType((String) row[i++]);
        dto.setSellerEmail((String) row[i++]);
        dto.setSellerPhoneNumber((String) row[i++]);

        return dto;
    }
}