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
  categoryName?: string;
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

export interface ContractPostSummary {
  postId: number;
  breed: string;
  categoryName: string;
  imageUrl: string;
  adoptionStatus: string;
  sellerUsername: string;
  price: number;
  latestContractId: number | null;
  contractCount: number;
  activeCount: number;
  pendingCount: number;
  cancelledCount: number;
}

export interface ContractPostsResponse {
  posts: ContractPostSummary[];
}
