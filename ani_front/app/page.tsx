'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { PetItem } from './lib/petStore';
import { fetchPostsPage, mapPostToPetItem } from './lib/postApi';

export default function Home() {
  const router = useRouter();
  const [pets, setPets] = useState<PetItem[]>([]);
  const [current, setCurrent] = useState('전체');
  const [searchInput, setSearchInput] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [navActive, setNavActive] = useState('홈');
  const [selectedPet, setSelectedPet] = useState<PetItem | null>(null);
  const [listLoading, setListLoading] = useState(true);
  const [listError, setListError] = useState<string | null>(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const token = localStorage.getItem('token');
    setLoggedIn(!!token);
    setUsername(localStorage.getItem('username') || '');
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setListLoading(true);
      setListError(null);
      try {
        const pageData = await fetchPostsPage(0, searchKeyword);
        if (cancelled) return;
        setPets(pageData.content.map(mapPostToPetItem));
      } catch (e) {
        if (!cancelled) {
          setPets([]);
          setListError(e instanceof Error ? e.message : '목록을 불러오지 못했습니다.');
        }
      } finally {
        if (!cancelled) setListLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [searchKeyword]);

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

  const handleSearch = () => {
    setSearchKeyword(searchInput.trim().toLowerCase());
  };

  const toggleHeart = (id: number) => {
    setPets(pets.map(pet => pet.id === id ? { ...pet, liked: !pet.liked } : pet));
  };

  const openPetDetail = (pet: PetItem) => {
    setSelectedPet(pet);
  };

  const closeModal = () => {
    setSelectedPet(null);
  };

  const categoryFilteredPets = current === '전체' ? pets : 
    current === '샴고양이' ? pets.filter(pet => pet.breed === '샴고양이') :
    current === '코리안 숏헤어' ? pets.filter(pet => pet.breed === '코리안 숏헤어') :
    pets.filter(pet => pet.type === current);

  const filteredPets = searchKeyword
    ? categoryFilteredPets.filter((pet) =>
        [pet.name, pet.breed, pet.type, ...(pet.tags ?? [])]
          .join(' ')
          .toLowerCase()
          .includes(searchKeyword)
      )
    : categoryFilteredPets;

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
          {loggedIn ? (
            <>
              <span className="nav-link" style={{ fontSize: 13, fontWeight: 700, color: '#444' }}>
                {username}님
              </span>
              <button
                className="login-btn"
                onClick={() => router.push('/contracts')}
                style={{ background: '#6c5ce7' }}
              >
                계약·관리
              </button>
              <button
                className="login-btn"
                onClick={() => {
                  localStorage.clear();
                  setLoggedIn(false);
                  setUsername('');
                  router.refresh();
                }}
              >
                로그아웃
              </button>
            </>
          ) : (
            <>
              <button className="login-btn" onClick={() => router.push('/login')}>
                로그인
              </button>
              <button className="login-btn" onClick={() => router.push('/signup')}>
                회원가입
              </button>
            </>
          )}
        </div>
      </nav>

      <div className="hero">
        <div className="hero-badge">반려동물 분양 플랫폼</div>
        <h1>펫 하우스에서<br />소중한 가족을 만나요 🏠</h1>
        <p>행복한 인연이 시작되는 곳</p>
        <div className="search-bar">
          <span>🔍</span>
          <input
            type="text"
            placeholder="이름, 품종, 종류, 태그 검색..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleSearch();
              }
            }}
          />
          <button className="search-btn" onClick={handleSearch}>검색</button>
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
            <p>새로운 아이들을<br />만나보세요!</p>
          </div>
          <div className="featured-emoji">🐩</div>
        </div>
      </div>

      <div className="section">
        <div className="section-title">🏠 어떤 친구를 찾으세요?</div>
        <div  style={{ display: "flex", justifyContent: "flex-end", margin: "8px 0 14px" }}>
          <button
            onClick={() => router.push("/registration")}
            style={{
              border: "none",
              borderRadius: "999px",
              padding: "10px 18px",
              background: "#ff7aa2",
              color: "#fff",
              fontSize: "14px",
              fontWeight: 800,
              cursor: "pointer",
              boxShadow: "0 8px 20px rgba(255,122,162,0.18)",
            }}
          >
            분양하기 ✨
          </button>
        </div>
        
        <div className="filter-tabs">
          <button className={`tab ${current === '전체' ? 'active' : ''}`} onClick={() => handleFilterPets('전체')}>전체 🐾</button>
          <button className={`tab ${current === '강아지' ? 'active' : ''}`} onClick={() => handleFilterPets('강아지')}>강아지 🐶</button>
          <button className={`tab ${current === '고양이' ? 'active' : ''}`} onClick={() => handleFilterPets('고양이')}>고양이 🐱</button>
          <button className={`tab ${current === '토끼' ? 'active' : ''}`} onClick={() => handleFilterPets('토끼')}>토끼 🐰</button>
          <button className={`tab ${current === '햄스터' ? 'active' : ''}`} onClick={() => handleFilterPets('햄스터')}>햄스터 🐹</button>
          <button className={`tab ${current === '새' ? 'active' : ''}`} onClick={() => handleFilterPets('새')}>새 🐦</button>
        </div>
        {listError && (
          <p style={{ marginTop: '8px', color: '#c0392b', fontSize: 14 }}>{listError}</p>
        )}
        {listLoading && <p style={{ marginTop: '12px', color: '#666' }}>불러오는 중…</p>}
        <div className="pet-grid">
          {!listLoading && filteredPets.map(pet => (
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
                <button className="adopt-btn" onClick={(e) => { e.stopPropagation(); router.push(`/adoption?id=${pet.id}`); }}>입양 신청하기 🐾</button>
              </div>
            </div>
          ))}
        </div>
        {!listLoading && filteredPets.length === 0 && (
          <p style={{ marginTop: '12px', color: '#666' }}>표시할 분양 글이 없습니다.</p>
        )}
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
            {/* <button className="adopt-btn" onClick={() => router.push(`/adopt/${selectedPet.id}`)}>입양 신청하기 🐾</button> */}
            <button className="adopt-btn" onClick={() => router.push(`/adoption?id=${selectedPet.id}`)}>입양 신청하기 🐾</button>
          </div>
        </div>
      )}
    </div>
  );
}
