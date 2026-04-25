'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface Pet {
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
}

export default function Home() {
  const router = useRouter();
  const [pets, setPets] = useState([
    { id:1, name:'몽실이', breed:'보더콜리', age:'3개월', type:'강아지', emoji:'🐶', imgClass:'dog', tags:['순둥이','중형견'], isNew:true, liked:false, img:'/images/bordercollie.png' },
    { id:2, name:'나비', breed:'샴고양이', age:'5개월', type:'고양이', emoji:'🐱', imgClass:'cat', tags:['독립적','실내형'], isNew:false, liked:true, img:'/images/RussianBlue.jpg' },
    { id:3, name:'솜사탕', breed:'셔틀랜드 쉽독', age:'2개월', type:'강아지', emoji:'🐰', imgClass:'rabbit', tags:['중형견','온순함','초보OK'], isNew:true, liked:false, img:'/images/ShetlandSheepdog.jpg' },
    { id:4, name:'해피', breed:'골든리트리버', age:'4개월', type:'강아지', emoji:'🐕', imgClass:'dog', tags:['대형견','활발함'], isNew:false, liked:false, img:'/images/goldenretriever.png' },
    { id:5, name:'치즈', breed:'웰시코기', age:'1개월', type:'강아지', emoji:'🐹', imgClass:'hamster', tags:['귀여움','소형'], isNew:false, liked:false, img:'/images/WelshCorgi.png' },
    { id:6, name:'파랑이', breed:'코리안 숏헤어', age:'6개월', type:'고양이', emoji:'🦜', imgClass:'bird', tags:['말하기','활발함'], isNew:true, liked:false, img:'/images/koreancat.jpeg' },
  ]);
  const [current, setCurrent] = useState('전체');
  const [navActive, setNavActive] = useState('홈');
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);

  const handleSetNav = (nav: string) => {
    setNavActive(nav);
    if (nav === '강아지품종') {
      setCurrent('강아지');
    } else if (nav === '고양이품종') {
      setCurrent('고양이');
    } else {
      setCurrent('전체');
    }
  };

  const handleFilterPets = (type: string) => {
    setCurrent(type);
  };

  const toggleHeart = (id: number) => {
    setPets(pets.map(pet => pet.id === id ? { ...pet, liked: !pet.liked } : pet));
  };

  const openPetDetail = (pet: Pet) => {
    setSelectedPet(pet);
  };

  const closeModal = () => {
    setSelectedPet(null);
  };

  const filteredPets = current === '전체' ? pets : 
    current === '샴고양이' ? pets.filter(pet => pet.breed === '샴고양이') :
    current === '코리안 숏헤어' ? pets.filter(pet => pet.breed === '코리안 숏헤어') :
    pets.filter(pet => pet.type === current);

  return (
    <div className="pet-app">
      <nav className="top-nav">
        <div className="nav-logo" onClick={() => { handleSetNav('홈'); router.push('/'); }} style={{ cursor: 'pointer' }}>🏠 펫 하우스</div>
        <div className="nav-links">
          <button className={`nav-link ${navActive === '홈' ? 'active' : ''}`} onClick={() => handleSetNav('홈')}>홈</button>
          <button className={`nav-link ${navActive === '강아지품종' ? 'active' : ''}`} onClick={() => handleSetNav('강아지품종')}>강아지품종</button>
          <button className={`nav-link ${navActive === '고양이품종' ? 'active' : ''}`} onClick={() => handleSetNav('고양이품종')}>고양이품종</button>
          <button className={`nav-link ${navActive === '분양신청' ? 'active' : ''}`} onClick={() => handleSetNav('분양신청')}>분양신청</button>
          <button className={`nav-link ${navActive === '커뮤니티' ? 'active' : ''}`} onClick={() => handleSetNav('커뮤니티')}>커뮤니티</button>
          <button className={`nav-link ${navActive === '병원찾기' ? 'active' : ''}`} onClick={() => handleSetNav('병원찾기')}>병원찾기</button>
        </div>
        <div className="nav-right">
          <button className="nav-icon-btn">🔔<span className="badge">3</span></button>
          <button className="nav-icon-btn">💛<span className="badge">5</span></button>
          <button className="login-btn">로그인</button>
        </div>
      </nav>

      <div className="hero">
        <div className="hero-badge">반려동물 분양 플랫폼</div>
        <h1>펫 하우스에서<br />소중한 가족을 만나요 🏠</h1>
        <p>행복한 인연이 시작되는 곳</p>
        <div className="search-bar">
          <span>🔍</span>
          <input type="text" placeholder="품종, 지역 검색..." />
          <button className="search-btn">검색</button>
        </div>
      </div>

      <div className="stats-row">
        <div className="stat-card"><div className="stat-icon">🐾</div><span className="stat-num">1,284</span><span className="stat-label">분양 완료</span></div>
        <div className="stat-card"><div className="stat-icon">💛</div><span className="stat-num">342</span><span className="stat-label">대기중</span></div>
        <div className="stat-card"><div className="stat-icon">⭐</div><span className="stat-num">4.9</span><span className="stat-label">평균 평점</span></div>
      </div>

      <div className="section">
        <div className="featured-banner">
          <div className="featured-text">
            <h3>이주의 추천 친구</h3>
            <p>특별히 선발된 아이들을<br />만나보세요!</p>
          </div>
          <div className="featured-emoji">🐩</div>
        </div>
      </div>

      <div className="section">
        <div className="section-title">🏠 어떤 친구를 찾으세요?</div>
        <div className="filter-tabs">
          <button className={`tab ${current === '전체' ? 'active' : ''}`} onClick={() => handleFilterPets('전체')}>전체 🐾</button>
          <button className={`tab ${current === '강아지' ? 'active' : ''}`} onClick={() => handleFilterPets('강아지')}>강아지 🐶</button>
          <button className={`tab ${current === '고양이' ? 'active' : ''}`} onClick={() => handleFilterPets('고양이')}>고양이 🐱</button>
          <button className={`tab ${current === '샴고양이' ? 'active' : ''}`} onClick={() => handleFilterPets('샴고양이')}>샴고양이 🐱</button>
          <button className={`tab ${current === '코리안 숏헤어' ? 'active' : ''}`} onClick={() => handleFilterPets('코리안 숏헤어')}>코리안 숏헤어 🐱</button>
          <button className={`tab ${current === '토끼' ? 'active' : ''}`} onClick={() => handleFilterPets('토끼')}>토끼 🐰</button>
          <button className={`tab ${current === '햄스터' ? 'active' : ''}`} onClick={() => handleFilterPets('햄스터')}>햄스터 🐹</button>
          <button className={`tab ${current === '새' ? 'active' : ''}`} onClick={() => handleFilterPets('새')}>새 🐦</button>
        </div>
        <div className="pet-grid">
          {filteredPets.map(pet => (
            <div key={pet.id} className="pet-card" onClick={() => openPetDetail(pet)}>
              <div className={`pet-img ${pet.imgClass}`}>
                {pet.isNew && <span className="new-badge">NEW</span>}
                <button className="heart-btn" onClick={(e) => { e.stopPropagation(); toggleHeart(pet.id); }}>{pet.liked ? '❤️' : '🤍'}</button>
                <img src={pet.img} alt={pet.name} style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '15px' }} />
              </div>
              <div className="pet-info">
                <div className="pet-name">{pet.name}</div>
                <div className="pet-meta">{pet.type} · {pet.breed}</div>
                <div className="pet-tags">
                  {pet.tags.map((tag, index) => (
                    <span key={index} className={`tag ${index === 1 ? 'green' : ''}`}>{tag}</span>
                  ))}
                </div>
                <button className="adopt-btn" onClick={(e) => { e.stopPropagation(); router.push(`/adopt/${pet.id}`); }}>분양 신청하기 🐾</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ height: '70px' }}></div>

      <div className="bottom-nav">
        <div className="bnav-item active"><span className="bnav-icon">🏠</span>홈</div>
        <div className="bnav-item"><span className="bnav-icon">🔍</span>탐색</div>
        <div className="bnav-item"><span className="bnav-icon">💛</span>찜목록</div>
        <div className="bnav-item"><span className="bnav-icon">💬</span>문의</div>
        <div className="bnav-item"><span className="bnav-icon">👤</span>마이</div>
      </div>

      {selectedPet && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={closeModal}>✕</button>
            <h2>{selectedPet.name} 상세 정보</h2>
            <div className="modal-img">{selectedPet.emoji}</div>
            <p><strong>품종:</strong> {selectedPet.breed}</p>
            <p><strong>나이:</strong> {selectedPet.age}</p>
            <p><strong>타입:</strong> {selectedPet.type}</p>
            <p><strong>태그:</strong> {selectedPet.tags.join(', ')}</p>
            <button className="adopt-btn" onClick={() => router.push(`/adopt/${selectedPet.id}`)}>분양 신청하기 🐾</button>
          </div>
        </div>
      )}
    </div>
  );
}