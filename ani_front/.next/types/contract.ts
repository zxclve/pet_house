export type Contract = {
  contractId: number;
  buyerId: number;
  buyerUsername: string;
  adoptionAppDate: string;
  confirmedAdopteeFlag: string;
  contractStatus: string;
  contractDate: string;
  deliveryMethod: string;
  adoptionFee: number;
  commissionFee: number;
  totalAmount: number;
  contractCreatedAt: string;
  contractUpdatedAt: string;
};

export type Post = {
  postId: number;
  sellerUsername: string;
  sellerAddress1: string;
  breed: string;
  birthDate: string;
  price: number;
  colorFeatures: string;
  healthStatus: string;
  imageUrl: string;
  adoptionStatus: string;
};