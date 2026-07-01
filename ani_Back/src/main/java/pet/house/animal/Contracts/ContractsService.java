package pet.house.animal.Contracts;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import lombok.RequiredArgsConstructor;
import pet.house.animal.Category.Category;
import pet.house.animal.Post.PostService;
import pet.house.animal.Post.PostSite;
import pet.house.animal.Post.PostStatus;
import pet.house.animal.User.UserEntity;
import pet.house.animal.User.UserRepository;
import pet.house.animal.User.UserService;

@Service
@RequiredArgsConstructor
public class ContractsService {

    private static final Logger log = LoggerFactory.getLogger(ContractsService.class);

    private final ContractsRepository contractsRepository;
    private final ContractsMapper contractsMapper;
    private final PostService postService;
    private final UserService userService;
    private final UserRepository userRepository;

    @Transactional(readOnly = true)
    public PostContractResponse getContracts(String type, Long contractId, String status) {
        try {
            List<Object[]> rows = contractsRepository.callContractsProc(type, contractId, status);
            if (rows == null) {
                rows = List.of();
            }
            List<ContractFlatDTO> dtoList = rows.stream()
                    .map(this::convertToDTO)
                    .collect(Collectors.toList());
            return contractsMapper.toResponse(dtoList);
        } catch (Exception e) {
            log.debug("Stored procedure inquiry unavailable, using JPA fallback: {}", e.toString());
            List<ContractFlatDTO> flat = loadContractsViaJpa(contractId, status);
            return contractsMapper.toResponse(flat);
        }
    }

    private List<ContractFlatDTO> loadContractsViaJpa(Long contractId, String status) {
        Status st = parseStatus(status);
        Long targetPostId;

        if (contractId != null) {
            Contracts anchor = contractsRepository.findById(contractId).orElse(null);
            if (anchor == null) {
                return List.of();
            }
            targetPostId = anchor.getPostId();
        } else {
            List<Long> ids = contractsRepository.findPostIdsForListing(st);
            if (ids.isEmpty()) {
                return List.of();
            }
            targetPostId = ids.get(0);
        }

        List<Contracts> contracts = new ArrayList<>(
                contractsRepository.findByPostIdOrderByContractIdAsc(targetPostId));
        if (st != null) {
            contracts = contracts.stream()
                    .filter(c -> st.equals(c.getStatus()))
                    .collect(Collectors.toList());
        }
        if (contracts.isEmpty()) {
            return List.of();
        }

        PostSite post = postService.getPost(targetPostId);
        return contracts.stream()
                .map(c -> toFlatDto(c, post))
                .collect(Collectors.toList());
    }

    private static Status parseStatus(String status) {
        if (status == null || status.isBlank()) {
            return null;
        }
        try {
            return Status.valueOf(status.trim().toUpperCase());
        } catch (IllegalArgumentException ex) {
            return null;
        }
    }

    private ContractFlatDTO toFlatDto(Contracts c, PostSite post) {
        UserEntity buyer = userRepository.findById(c.getBuyerId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "입양 신청자 정보를 찾을 수 없습니다."));
        UserEntity seller = post.getSeller();
        Category cat = post.getCategory();

        ContractFlatDTO dto = new ContractFlatDTO();
        dto.setContractId(c.getContractId());
        dto.setAdoptionAppDate(c.getAdoptionAppDate());
        dto.setContractStatus(c.getStatus() != null ? c.getStatus().name() : null);
        dto.setConfirmedAdopteeFlag(c.getConfirmedAdopteeFlag());
        dto.setContractDate(c.getContractDate());
        dto.setDeliveryMethod(c.getDeliveryMethod() != null ? c.getDeliveryMethod().getCode() : null);
        dto.setAdoptionFee(c.getAdoptionFee());
        dto.setCommissionFee(c.getCommissionFee());
        dto.setTotalAmount(c.getTotalAmount());
        dto.setContractCreatedAt(c.getCreatedAt());
        dto.setContractUpdatedAt(c.getUpdatedAt());

        dto.setBuyerId(buyer.getUserid());
        dto.setBuyerUsername(buyer.getUsername());
        dto.setBuyerAddress1(buyer.getAddress1());
        dto.setBuyerAddress2(buyer.getAddress2());
        dto.setBuyerUserType(buyer.getUsertype() != null ? buyer.getUsertype().name() : null);
        dto.setBuyerEmail(buyer.getEmail());
        dto.setBuyerPhoneNumber(buyer.getPhonenum());

        dto.setCategoryName(cat != null ? cat.getCategoryName() : null);
        dto.setPostId(post.getPostId());
        dto.setBreed(post.getBreed());
        dto.setGender(post.getGender());
        dto.setBirthDate(post.getBirthDate());
        dto.setColorFeatures(post.getColorFeatures());
        dto.setPrice(post.getPrice());
        dto.setHealthStatus(post.getHealthStatus());
        dto.setAdoptionStatus(post.getStatus() != null ? post.getStatus().name() : null);
        dto.setImageUrl(post.getImageUrl());
        dto.setPostsCreatedAt(post.getCreatedAt());
        dto.setPostsUpdatedAt(post.getUpdatedAt());

        dto.setSellerId(seller.getUserid());
        dto.setSellerUsername(seller.getUsername());
        dto.setSellerAddress1(seller.getAddress1());
        dto.setSellerAddress2(seller.getAddress2());
        dto.setSellerUserType(seller.getUsertype() != null ? seller.getUsertype().name() : null);
        dto.setSellerEmail(seller.getEmail());
        dto.setSellerPhoneNumber(seller.getPhonenum());

        return dto;
    }

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

    @Transactional
    public void apply(Long postId, String loginId) {
        UserEntity buyer = userService.getUserOrThrow(loginId);
        PostSite post = postService.getPost(postId);

        if (post.getSeller().getUserid().equals(buyer.getUserid())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "본인이 등록한 분양글에는 신청할 수 없습니다.");
        }
        if (post.getStatus() != PostStatus.A) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "신청할 수 없는 게시글 상태입니다.");
        }
        if (contractsRepository.existsByPostIdAndBuyerIdAndStatus(postId, buyer.getUserid(), Status.A)) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "이미 진행 중인 입양 신청이 있습니다.");
        }

        BigDecimal fee = post.getPrice() != null ? post.getPrice() : BigDecimal.ZERO;
        LocalDateTime now = LocalDateTime.now();

        Contracts contract = Contracts.builder()
                .postId(postId)
                .buyerId(buyer.getUserid())
                .adoptionAppDate(LocalDate.now())
                .status(Status.A)
                .confirmedAdopteeFlag("N")
                .deliveryMethod(DeliveryMethod.MEET)
                .adoptionFee(fee)
                .commissionFee(BigDecimal.ZERO)
                .totalAmount(fee)
                .build();
        contract.setCreatedAt(now);
        contract.setUpdatedAt(now);

        contractsRepository.save(contract);
    }

    @Transactional
    public void cancel(Long postId, String loginId) {
        UserEntity buyer = userService.getUserOrThrow(loginId);
        Contracts c = contractsRepository
                .findFirstByPostIdAndBuyerIdAndStatusOrderByContractIdDesc(postId, buyer.getUserid(), Status.A)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "취소할 신청 내역이 없습니다."));
        if (c.getStatus() != Status.A) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "취소할 수 있는 상태가 아닙니다.");
        }
        c.setStatus(Status.C);
        c.setUpdatedAt(LocalDateTime.now());
        contractsRepository.save(c);
    }

    @Transactional
    public void completeByAdmin(Long postId, String adminLoginId) {
        PostSite post = postService.getPost(postId);
        if (post.getStatus() != PostStatus.A) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "완료 처리할 수 없는 게시글 상태입니다.");
        }

        postService.updateStatus(postId, PostStatus.Y);

        List<Contracts> all = contractsRepository.findByPostIdOrderByContractIdAsc(postId);
        List<Contracts> active = all.stream()
                .filter(x -> x.getStatus() == Status.A)
                .sorted(Comparator.comparing(Contracts::getContractId))
                .collect(Collectors.toList());

        LocalDateTime now = LocalDateTime.now();
        if (!active.isEmpty()) {
            Contracts winner = active.get(0);
            winner.setStatus(Status.P);
            winner.setConfirmedAdopteeFlag("Y");
            winner.setContractDate(LocalDate.now());
            winner.setUpdatedAt(now);
            for (int i = 1; i < active.size(); i++) {
                Contracts other = active.get(i);
                other.setStatus(Status.C);
                other.setConfirmedAdopteeFlag("N");
                other.setUpdatedAt(now);
            }
        }
        contractsRepository.saveAll(all);
    }

    @Transactional
    public void cancelByAdmin(Long postId, String adminLoginId) {
        postService.updateStatus(postId, PostStatus.C);

        List<Contracts> all = contractsRepository.findByPostIdOrderByContractIdAsc(postId);
        LocalDateTime now = LocalDateTime.now();
        for (Contracts c : all) {
            if (c.getStatus() == Status.A || c.getStatus() == Status.P) {
                c.setStatus(Status.C);
                c.setUpdatedAt(now);
            }
        }
        contractsRepository.saveAll(all);
    }
}
