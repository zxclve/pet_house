package pet.house.animal.Contracts;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

@Component
public class ContractsMapper {

    // =========================
    // POST HEADER 생성 (🔥 수정 완료)
    // =========================
    public PostHeaderDTO toPostHeader(List<ContractFlatDTO> rows) {

        // 🔥 안정성 추가 (필수)
        if (rows == null || rows.isEmpty()) {
            return null;
        }

        ContractFlatDTO first = rows.get(0);

        PostHeaderDTO post = new PostHeaderDTO();

        post.setPostId(first.getPostId());
        post.setBreed(first.getBreed());
        post.setGender(first.getGender());
        post.setBirthDate(first.getBirthDate());
        post.setColorFeatures(first.getColorFeatures());
        post.setPrice(first.getPrice());
        post.setHealthStatus(first.getHealthStatus());
        post.setAdoptionStatus(first.getAdoptionStatus());
        post.setImageUrl(first.getImageUrl());
        post.setCategoryName(first.getCategoryName());

        post.setPostsCreatedAt(first.getPostsCreatedAt());
        post.setPostsUpdatedAt(first.getPostsUpdatedAt());

        // seller
        post.setSellerId(first.getSellerId());
        post.setSellerUsername(first.getSellerUsername());
        post.setSellerAddress1(first.getSellerAddress1());
        post.setSellerAddress2(first.getSellerAddress2());
        post.setSellerUserType(first.getSellerUserType());
        post.setSellerEmail(first.getSellerEmail());
        post.setSellerPhoneNumber(first.getSellerPhoneNumber());

        return post;
    }

    // =========================
    // CONTRACT LIST 생성 (중복 제거 포함)
    // =========================
    public List<ContractDTO> toContracts(List<ContractFlatDTO> rows) {

        Map<Long, ContractDTO> map = rows.stream()
                .collect(Collectors.toMap(
                        ContractFlatDTO::getContractId,
                        r -> {
                            ContractDTO c = new ContractDTO();

                            c.setContractId(r.getContractId());
                            c.setAdoptionAppDate(r.getAdoptionAppDate());
                            c.setContractStatus(r.getContractStatus());
                            c.setConfirmedAdopteeFlag(r.getConfirmedAdopteeFlag());
                            c.setContractDate(r.getContractDate());
                            c.setDeliveryMethod(r.getDeliveryMethod());

                            c.setAdoptionFee(r.getAdoptionFee());
                            c.setCommissionFee(r.getCommissionFee());
                            c.setTotalAmount(r.getTotalAmount());

                            c.setContractCreatedAt(r.getContractCreatedAt());
                            c.setContractUpdatedAt(r.getContractUpdatedAt());

                            // buyer
                            c.setBuyerId(r.getBuyerId());
                            c.setBuyerUsername(r.getBuyerUsername());
                            c.setBuyerAddress1(r.getBuyerAddress1());
                            c.setBuyerAddress2(r.getBuyerAddress2());
                            c.setBuyerUserType(r.getBuyerUserType());
                            c.setBuyerEmail(r.getBuyerEmail());
                            c.setBuyerPhoneNumber(r.getBuyerPhoneNumber());

                            return c;
                        },
                        (existing, replacement) -> existing // 중복 제거
                ));

        return map.values().stream().toList();
    }

    // =========================
    // 최종 Response 조립
    // =========================
    public PostContractResponse toResponse(List<ContractFlatDTO> rows) {

        if (rows == null || rows.isEmpty()) {
            return new PostContractResponse();
        }

        PostHeaderDTO post = toPostHeader(rows);
        List<ContractDTO> contracts = toContracts(rows);

        PostContractResponse res = new PostContractResponse();
        res.setPost(post);
        res.setContracts(contracts);

        return res;
    }
}