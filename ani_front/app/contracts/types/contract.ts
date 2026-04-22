export interface ContractDTO {
  contractId: number;
  adoptionAppDate: string;
  contractStatus: string;
  confirmedAdopteeFlag: string;
  contractDate: string;
  deliveryMethod: string;

  adoptionFee: number;
  commissionFee: number;
  totalAmount: number;

  buyerId: number;
  buyerUsername: string;

  contractCreatedAt: string;
  contractUpdatedAt: string;
}

export interface PostHeader {
  postId: number;
  breed: string;
  gender: string;
  birthDate: string;
  colorFeatures: string;
  price: number;
  healthStatus: string;
  adoptionStatus: string;
  imageUrl: string;

  sellerUsername: string;
  sellerAddress1: string;
}

export interface PostContractResponse {
  post: PostHeader;
  contracts: ContractDTO[];
}