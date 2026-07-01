export interface PetItem {
  id: number;
  name: string;
  breed: string;
  age: string;
  type: string;
  emoji: string;
  imgClass: string;
  tags: string[];
  isNew: boolean;
  liked: boolean;
  img: string;
  healthStatus?: string;
  colorFeatures?: string;
  price?: number;
  gender?: string;
  birthDate?: string;
}

export const DEFAULT_PETS: PetItem[] = [
  { id: 1, name: "몽실이", breed: "보더콜리", age: "3개월", type: "강아지", emoji: "🐶", imgClass: "dog", tags: ["순둥이", "중형견"], isNew: true, liked: false, img: "/images/bordercollie.png" },
  { id: 2, name: "나비", breed: "샴고양이", age: "5개월", type: "고양이", emoji: "🐱", imgClass: "cat", tags: ["독립적", "실내형"], isNew: false, liked: true, img: "/images/RussianBlue.jpg" },
  { id: 3, name: "솜사탕", breed: "셔틀랜드 쉽독", age: "2개월", type: "강아지", emoji: "🐰", imgClass: "rabbit", tags: ["중형견", "온순함", "초보OK"], isNew: true, liked: false, img: "/images/ShetlandSheepdog.jpg" },
  { id: 4, name: "해피", breed: "골든리트리버", age: "4개월", type: "강아지", emoji: "🐕", imgClass: "dog", tags: ["대형견", "활발함"], isNew: false, liked: false, img: "/images/goldenretriever.png" },
  { id: 5, name: "치즈", breed: "웰시코기", age: "1개월", type: "강아지", emoji: "🐹", imgClass: "hamster", tags: ["귀여움", "소형"], isNew: false, liked: false, img: "/images/WelshCorgi.png" },
  { id: 6, name: "파랑이", breed: "코리안 숏헤어", age: "6개월", type: "고양이", emoji: "🦜", imgClass: "bird", tags: ["말하기", "활발함"], isNew: true, liked: false, img: "/images/koreancat.jpeg" },
];

const STORAGE_KEY = "pet-house-registered-pets";

export function getAllPets(): PetItem[] {
  if (typeof window === "undefined") {
    return DEFAULT_PETS;
  }

  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return DEFAULT_PETS;
  }

  try {
    const customPets = JSON.parse(raw) as PetItem[];
    return [...customPets, ...DEFAULT_PETS];
  } catch {
    return DEFAULT_PETS;
  }
}

export function addCustomPet(pet: PetItem) {
  if (typeof window === "undefined") {
    return;
  }

  const raw = localStorage.getItem(STORAGE_KEY);
  const current = raw ? ((JSON.parse(raw) as PetItem[]) || []) : [];
  current.unshift(pet);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
}
