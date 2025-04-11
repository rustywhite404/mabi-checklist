const checklistData = [
  {
    region: '티르코네일',
    items: [
      { npc: '메이븐', gives: '케이틴 특제 통밀빵 1개', receives: '성수 1개', limit: '일 1회' },
      { npc: '엔델리온', gives: '케이틴 특제 통밀빵 10개', receives: '성수 10개', limit: '일 1회' },
      { npc: '케이틴', gives: '우유 10개', receives: '케이틴 특제 통밀빵 3개', limit: '일 1회' },
      { npc: '라사', gives: '사과 주스 1개', receives: '고급 연금술 재연소 촉매 1개', limit: '일 1회' },
      { npc: '라사', gives: '연금술 부스러기 3개', receives: '고급 연금술 재연소 촉매 1개', limit: '일 1회' },
      { npc: '라사', gives: '고급 연금술 재연소 촉매 15개', receives: '레어 연금술 재연소 촉매 1개', limit: '일 1회' },
      { npc: '레이널드', gives: '마요네즈 고기볶음 2개', receives: '치명타 비약 1개', limit: '일 1회' },
      { npc: '말콤', gives: '양털 50개', receives: '빈 악보 1개', limit: '일 1회' },
      { npc: '말콤', gives: '거미줄 5개', receives: '말콤의 폭신한 양털 베개 1개', limit: '일 1회' },
      { npc: '딜리스', gives: '쑥쑥버섯 1개', receives: '네잎클로버 1개', limit: '일 1회' },
      { npc: '퍼거스', gives: '분해된 장비 부품 1개', receives: '철 광석 10개', limit: '일 10회' },
      { npc: '퍼거스', gives: '분해된 장비 부품 1개', receives: '석탄 3개', limit: '일 10회' },
      { npc: '퍼거스', gives: '강철괴 2개', receives: '합금강괴 1개', limit: '일 4회' },
      { npc: '알리사', gives: '달걀 10개', receives: '연금술 부스러기 1개', limit: '일 1회' },
      { npc: '알리사', gives: '라벤더 꽃 1개', receives: '연금술 부스러기 1개', limit: '일 1회' },
      { npc: '알리사', gives: '달걀 3개', receives: '밀가루 1개', limit: '일 1회' },
      { npc: '알리사', gives: '라벤더 꽃 1개', receives: '밀가루 1개', limit: '일 1회' },
      { npc: '데이안', gives: '펫 먹이 1개', receives: '상급 양털 4개', limit: '일 10회' }
    ]
  },  
  {
    region: '던바튼',
    items: [
      { npc: '네리스', gives: '동광석 1개', receives: '상급 생가죽 1개', limit: '일 10회' },
      { npc: '네리스', gives: '합금강괴 2개', receives: '특수강괴 1개', limit: '일 4회' },
      { npc: '스튜어트', gives: '연금술 부스러기 1개', receives: '불꽃의 결정 1개', limit: '일 5회' },
      { npc: '스튜어트', gives: '연금술 부스러기 1개', receives: '얼음의 결정 2개', limit: '일 5회' },
      { npc: '스튜어트', gives: '연금술 부스러기 1개', receives: '전기의 결정 3개', limit: '일 5회' },
      { npc: '스튜어트', gives: '연금술 부스러기 1개', receives: '광휘의 결정 4개', limit: '일 5회' },
      { npc: '스튜어트', gives: '연금술 부스러기 1개', receives: '봉인의 결정 5개', limit: '일 5회' },
      { npc: '아란웬', gives: '감자 샐러드 2개', receives: '궁극기 비약 1개', limit: '일 1회' },
      { npc: '아이라', gives: '주인 없는 소설책 1개', receives: '종이 10개', limit: '일 1회' },
      { npc: '마누스', gives: '펫 먹이 10개', receives: '생명의 마나석 1개', limit: '일 2회' },
      { npc: '글리니스', gives: '포크 인 밀크 1개', receives: '글리니스 수제 케이크 1개', limit: '일 1회' },
      { npc: '글리니스', gives: '생크림 4개', receives: '글리니스의 애플 밀크티 1개', limit: '일 1회' },
      { npc: '발터', gives: '트레이시의 원목 오르골 1개', receives: '상급 목재 16개', limit: '일 1회' },
      { npc: '발터', gives: '참사랑어 1개', receives: '하트 토큰 1개', limit: '일 1회' },
      { npc: '발터', gives: '어둠유령고기 5개', receives: '화염 마법 유탄 3개', limit: '일 3회' },
      { npc: '발터', gives: '어둠유령고기 5개', receives: '번개 마법 유탄 3개', limit: '일 3회' },
      { npc: '발터', gives: '어둠유령고기 5개', receives: '바람 마법 유탄 3개', limit: '일 3회' },
      { npc: '발터', gives: '어둠유령고기 5개', receives: '산성 마법 유탄 3개', limit: '일 3회' },
      { npc: '시몬', gives: '상급 실크 10개', receives: '염색약 베이스 1개', limit: '일 1회' },
      { npc: '제롬', gives: '리코타 치즈 샐러드 1개', receives: '실크 4개', limit: '일 2회' },
      { npc: '제롬', gives: '크림소스 스테이크 1개', receives: '상급 실크 4개', limit: '일 1회' },
      { npc: '제이미', gives: '사과 수플레 1개', receives: '상급 옷감 4개', limit: '일 2회' },
      { npc: '제이미', gives: '사과 생크림 케이크 1개', receives: '상급 옷감+ 4개', limit: '일 1회' },
      { npc: '칼릭스', gives: '글리니스의 애플 밀크티 3개', receives: '상급 목재+ 12개', limit: '일 2회' }
    ]
  },
  {
    region: '두갈드아일',
    items: [
      { npc: '트레이시', gives: '통나무 1개', receives: '생가죽 1개', limit: '일 10회' },
      { npc: '트레이시', gives: '통나무 10개', receives: '상급 생가죽 1개', limit: '일 10회' },
      { npc: '트레이시', gives: '상급 통나무 1개', receives: '나무진액 4개', limit: '일 5회' },
      { npc: '트레이시', gives: '조개찜 2개', receives: '트레이시의 원목 오르골 1개', limit: '일 1회' },
      { npc: '앨빈', gives: '생가죽 5개', receives: '타닌가루 5개', limit: '일 10회' },
      { npc: '앨빈', gives: '상급가죽 1개', receives: '상급 통나무 1개', limit: '일 10회' },
      { npc: '앨빈', gives: '야채볶음 1개', receives: '상급 목재 4개', limit: '일 2회' }
    ]
  },
  {
    region: '콜헨',
    items: [
      { npc: '아르미스', gives: '백동광석 1개', receives: '동광석 10개', limit: '일 1회' },
      { npc: '아르미스', gives: '특수강괴 1개', receives: '분해된 장비 부품 1개', limit: '일 1회' },
      { npc: '코너', gives: '건강 드링크 1개', receives: '네잎클로버 1개', limit: '일 3회' },
      { npc: '코너', gives: '초롱아귀5개', receives: '페허의 마나석1개', limit: '일 3회' },
      { npc: '킬리언', gives: '깔끔 버섯 포자 5개', receives: '건강 드링크 1개', limit: '일 5회' },
      { npc: '킬리언', gives: '알리오 올리오 1개', receives: '네잎클로버 2개', limit: '일 1회' },
      { npc: '케아라', gives: '상급 생가죽+ 10개', receives: '협곡의 마나석1개', limit: '일 3회' },
      { npc: '케아라', gives: '상급 생가죽+ 10개', receives: '페허의 마나석 1개', limit: '일 3회' },
      { npc: '케아라', gives: '얼음 딸기주스 2개', receives: '상급 치명타 비약 1개', limit: '일 1회' }
    ]
  },
  {
    region: '얼음 협곡 임시 초소',
    items: [
      { npc: '카린', gives: '감자수프 3개', receives: '펫먹이 10개', limit: '일 1회' }
    ]
  }
];

export default checklistData;
