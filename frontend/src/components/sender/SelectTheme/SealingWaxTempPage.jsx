import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const BASE_URL = 'http://43.201.84.89:8080';

const SealingWaxTempPage = () => {
  const [name, setName] = useState('');
  const [count, setCount] = useState('');
  const [image, setImage] = useState(null);
  const [list, setList] = useState([]);
  const [selectedTheme, setSelectedTheme] = useState(null);

  // ✅ 실링왁스 목록 조회
  const fetchSealingWaxes = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/sealingwax`);
      if (!response.ok) {
        throw new Error('Failed to fetch sealing wax list');
      }
      const data = await response.json();
      setList(data.sealingWaxes);
    } catch (error) {
      console.error('Failed to load sealing wax list:', error);
    }
  };

  // ✅ 실링왁스 등록 처리
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !count || !image) {
      alert('모든 값을 입력해주세요.');
      return;
    }

    const formData = new FormData();
    formData.append(
      'sealingwax',
      new Blob(
        [
          JSON.stringify({
            sealingWaxName: name,
            imageCount: Number(count),
          }),
        ],
        { type: 'application/json' },
      ),
    );
    formData.append('image', image);

    try {
      const response = await fetch(`${BASE_URL}/api/sealingwax/backoffice`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to register sealing wax');
      }

      alert('실링왁스 등록 완료!');
      setName('');
      setCount('');
      setImage(null);

      // ✅ 등록 후 목록 다시 불러오기
      fetchSealingWaxes();
    } catch (error) {
      console.error('Error:', error);
      alert('등록 실패');
    }
  };

  // ✅ 컴포넌트 마운트 시 목록 조회
  useEffect(() => {
    fetchSealingWaxes();
  }, []);

  // ✅ 테마 선택 핸들러
  const handleSelectTheme = (theme) => {
    setSelectedTheme(theme);
  };

  return (
    <Container>
      <Title>실링왁스 등록 및 조회</Title>

      {/* ✅ 등록 폼 */}
      <Form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="실링왁스 이름"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="이미지 개수"
          value={count}
          onChange={(e) => setCount(e.target.value)}
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          required
        />
        <button type="submit">등록하기</button>
      </Form>

      {/* ✅ 목록 표시 */}
      <List>
        {list.length === 0 ? (
          <li>등록된 실링왁스가 없습니다.</li>
        ) : (
          list.map((item) => (
            <ListItem
              key={item.id}
              isSelected={item.id === selectedTheme?.id}
              onClick={() => handleSelectTheme(item)}
            >
              <img src={item.imageUrl} alt={item.sealingWaxName} />
              <span>
                {item.sealingWaxName} - {item.imageCount}개
              </span>
            </ListItem>
          ))
        )}
      </List>
    </Container>
  );
};

export default SealingWaxTempPage;

const Container = styled.div`
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
`;

const Title = styled.h2`
  font-size: 24px;
  color: #b13f3e;
  margin-bottom: 16px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;

  input {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  button {
    padding: 12px;
    background-color: #b13f3e;
    color: #fff;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.2s ease;

    &:hover {
      background-color: #a12d2c;
    }
  }
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 20px;
`;

const ListItem = styled.li`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: ${(props) => (props.isSelected ? '#fffbf0' : '#fafafa')};
  cursor: pointer;

  img {
    width: 40px;
    height: 40px;
    border-radius: 5px;
    object-fit: cover;
  }

  span {
    font-size: 16px;
    font-weight: 500;
  }
`;
