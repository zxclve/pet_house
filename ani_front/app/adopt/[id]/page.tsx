'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';

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

const pets: Pet[] = [
  { id:1, name:'몽실이', breed:'보더콜리', age:'3개월', type:'강아지', emoji:'🐶', imgClass:'dog', tags:['순둥이','중형견'], isNew:true, liked:false, img:'/images/bordercollie.png' },
  { id:2, name:'나비', breed:'샴고양이', age:'5개월', type:'고양이', emoji:'🐱', imgClass:'cat', tags:['독립적','실내형'], isNew:false, liked:true, img:'/images/RussianBlue.jpg' },
  { id:3, name:'솜사탕', breed:'셔틀랜드 쉽독', age:'2개월', type:'강아지', emoji:'🐰', imgClass:'rabbit', tags:['중형견','온순함','초보OK'], isNew:true, liked:false, img:'/images/ShetlandSheepdog.jpg' },
  { id:4, name:'해피', breed:'골든리트리버', age:'4개월', type:'강아지', emoji:'🐕', imgClass:'dog', tags:['대형견','활발함'], isNew:false, liked:false, img:'/images/goldenretriever.png' },
  { id:5, name:'치즈', breed:'웰시코기', age:'1개월', type:'강아지', emoji:'🐹', imgClass:'hamster', tags:['귀여움','소형'], isNew:false, liked:false, img:'/images/WelshCorgi.png' },
  { id:6, name:'파랑이', breed:'코리안 숏헤어', age:'6개월', type:'고양이', emoji:'🦜', imgClass:'bird', tags:['말하기','활발함'], isNew:true, liked:false, img:'/images/koreancat.jpeg' },
];

export default function AdoptPage() {
  const params = useParams();
  const router = useRouter();
  const id = parseInt(params.id as string);
  const pet = pets.find(p => p.id === id);
  const [navActive, setNavActive] = useState('분양신청');

  const handleSetNav = (nav: string) => {
    setNavActive(nav);
    if (nav === '홈') router.push('/');
    // 다른 내비 항목도 추가 가능
  };

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`${pet?.name} 분양 신청이 완료되었습니다!\n이름: ${formData.name}\n이메일: ${formData.email}`);
    router.push('/');
  };

  if (!pet) {
    return <div>펫을 찾을 수 없습니다.</div>;
  }

  return (
    <div className="pet-app">
      <nav className="top-nav">
        <div className="nav-logo" style={{ cursor: 'pointer' }} onClick={() => router.push('/')}>🏠 펫 하우스</div>
        <div className="nav-links">
          <button className={`nav-link ${navActive === '홈' ? 'active' : ''}`} onClick={() => handleSetNav('홈')}>홈</button>
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

      <div style={{ padding: '20px', fontFamily: 'Nunito, sans-serif' }}>
        <button onClick={() => router.back()} style={{ marginBottom: '20px' }}>← 뒤로가기</button>
        <h1>{pet.name} 분양 신청</h1>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
          <img src={pet.img} alt={pet.name} style={{ width: '80px', height: '80px', objectFit: 'contain', borderRadius: '10px', marginRight: '20px' }} />
          <div>
            <h2>{pet.name}</h2>
            <p>{pet.type} · {pet.breed}</p>
            <p>태그: {pet.tags.join(', ')}</p>
          </div>
        </div>
        <form onSubmit={handleSubmit} style={{ maxWidth: '400px' }}>
          <div style={{ marginBottom: '10px' }}>
            <label>이름:</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required style={{ width: '100%', padding: '8px' }} />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label>이메일:</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required style={{ width: '100%', padding: '8px' }} />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label>메시지:</label>
            <textarea name="message" value={formData.message} onChange={handleChange} rows={4} style={{ width: '100%', padding: '8px' }} />
          </div>
          <button type="submit" style={{ background: '#FF80AB', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer' }}>분양 신청하기</button>
        </form>
      </div>

      <div className="bottom-nav">
        <div className="bnav-item active"><span className="bnav-icon">🏠</span>홈</div>
        <div className="bnav-item"><span className="bnav-icon">🔍</span>탐색</div>
        <div className="bnav-item"><span className="bnav-icon">💛</span>찜목록</div>
        <div className="bnav-item"><span className="bnav-icon">💬</span>문의</div>
        <div className="bnav-item"><span className="bnav-icon">👤</span>마이</div>
      </div>
    </div>
  );
}