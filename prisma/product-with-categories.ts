import { PrismaClient, Prisma } from '@prisma/client'
const prisma = new PrismaClient()

const getRandom = (target: number, sub: number) => {
  return Math.floor(Math.random() * (target - sub) + sub)
}

const sneakers = [
  {
    name: ' NBPDCF703W / ML725B (WHITE)',
    contents: `{"blocks":[{"key":"atblg","text":"뉴발란스(NEW BALANCE)는 발에 장애가 있거나 경찰, 소방관, 우체부 등 하루 종일 서서 일하는 사람들을 위한 아치 서포트(Arch Support : 지지대가 있는 신발 깔창)를 만들며 1906년에 미국 메사추세츠주 보스턴에서 론칭했습니다. 닭의 세 개의 발톱이 만드는 균형(balance)에서 영감을 얻은 아치 서포트와 신발은 지금도 변치 않고 100년이 지난 지금도 여전히 불균형한 발에 새로운 균형을 창조하는 다양한 디자인의 스니커즈와 스포츠&패션 아이템을 만들고 있습니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"et2ll","text":"I do not want to by it!!!","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 1,
    image_url: 'https://image.msscdn.net/images/goods_img/20220617/2622252/2622252_1_500.jpg',
    price: getRandom(100000, 20000),
  },
  {
    name: '[무료반품] BW 아미 - 화이트 / BZ0579',
    contents: `{"blocks":[{"key":"atblg","text":"스포츠 라이프스타일은 라커룸 밖에서도 계속됩니다. 1920년부터 독일의 헤르초게나우라흐에서 스포츠 슈즈를 만들던 아디다스(ADIDAS)는 이러한 철학을 토대로 경기장에서부터 거리에 이르기까지 모두가 즐길 수 있는 '스포츠 라이프스타일'의 개념을 처음으로 도입한 브랜드입니다. 스포츠 영역의 다양한 요소를 일상의 영역으로 가져오는 아디다스는 이를 통해 전 세계의 트렌드를 주도하고 있으며, 지금도 여전히 자신의 다양한 모습을 보여주고 싶어하는 소비자와 직접 소통하며 함께 혁신적인 트렌드를 만들고 있습니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"et2ll","text":"I do not want to by it!!!","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 1,
    image_url: 'https://image.msscdn.net/images/goods_img/20170615/577636/577636_5_500.jpg',
    price: getRandom(100000, 20000),
  },
  {
    name: ' 헤리티지 코트 II 스니커즈 - 화이트:네이비',
    contents: `{"blocks":[{"key":"atblg","text":"폴로 랄프 로렌(POLO RALPH LAUREN)은 미국을 대표하는 디자이너 랄프 로렌이 1967년에 시작한 브랜드입니다. 폴로 랄프 로렌의 제품은 실용적이면서 품격을 갖춰 꾸준한 인기와 사랑을 받고 있습니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 1,
    image_url: 'https://image.msscdn.net/images/goods_img/20160726/389453/389453_1_500.jpg',
    price: getRandom(100000, 20000),
  },
  {
    name: ' MISS FLOWER 미스 플라워 삭스 스니커즈 AD4D01123',
    contents: `{"blocks":[{"key":"atblg","text":"아쉬(ASH)는 2000년 이탈리아에서 시작된 컨템포러리 패션 브랜드로, 특유의 창의적이고 독보적인 아이덴티티와 위트 있는 디자인을 선보입니다. 패션 스니커즈를 비롯한 힐, 부츠, 로퍼 등 트렌디하고 실용적인 다양한 슈즈 컬렉션을 선보입니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 1,
    image_url: 'https://image.msscdn.net/images/goods_img/20220812/2714079/2714079_1_500.jpg',
    price: getRandom(100000, 20000),
  },
  {
    name: '아카이브 스내플 로퍼 스웨이드 라이트 탄 / 27425213',
    contents: `{"blocks":[{"key":"atblg","text":"닥터마틴(DR.MARTENS)은 군인의 발을 편하게 만들기 위해 시작했지만 지금은 뮤지션, 패션피플, 모델 등의 사랑을 받는 상징적인 부츠 아이템으로 성장하며 한국뿐 아니라 전 세계에서 사랑을 받는 영국 브랜드로 자리매김을 했습니다. 편안한 착화감과 함께 다양한 스타일을 자랑하며, 신을 수록 자신의 개성과 스타일을 연출할 수 있게 돕는 독특한 매력도 함께 지니고 있습니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"et2ll","text":"I do not want to by it!!!","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 1,
    image_url: 'https://image.msscdn.net/images/goods_img/20220425/2511582/2511582_2_500.jpg',
    price: getRandom(100000, 20000),
  },
]

const tshirt = [
  {
    name: '한정 판매 980g pigment mtm-charcoal-',
    contents: `{"blocks":[{"key":"atblg","text":"상품 이미지는 모니터 해상도, 색상 설정에 따라 이미지가 왜곡되거나 실제 색상과 차이가 있을 수 있습니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"et2ll","text":"I do not want to by it!!!","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 2,
    image_url: 'https://image.msscdn.net/images/goods_img/20200903/1582356/1582356_1_500.jpg',
    price: getRandom(100000, 20000),
  },
  {
    name: '90S 트랙 스웨트셔츠_그레이',
    contents: `{"blocks":[{"key":"atblg","text":"1990년대 레트로 룩을 재현한 최현욱 23 스프링 컬렉션을 한정 발매로 만나자.
","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"et2ll","text":"I do not want to by it!!!","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 2,
    image_url:
      'https://image.msscdn.net/images/prd_img/20220118/2313388/detail_2313388_16765930518037_500.jpg',
    price: getRandom(100000, 20000),
  },

  {
    name: '크레용 그래피티 페이스 [레서팬다][CR]',
    contents: `{"blocks":[{"key":"atblg","text":"코케트스튜디오(COQUET STUDIO)는 '매력적인, 멋 부리는'이라는 뜻을 가지고 있으며 '소년은 철들지 않는다'라는 브랜드 슬로건을 가지고 있습니다. 모던 룩을 기반으로 믹스 매치를 더한 새로운 룩을 제안합니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 2,
    image_url: 'https://image.msscdn.net/images/goods_img/20210603/1981033/1981033_1_500.jpg',
    price: getRandom(100000, 20000),
  },
]

const pants = [
  {
    name: 'Bite Wound Midday - MOD1w',
    contents: `{"blocks":[{"key":"atblg","text":"모드나인(MODNINE)은 2006년 론칭한 데님 전문 브랜드로, 시작부터 현재까지 데님만을 다루어 왔고 깊이 있는 데님 제품을 만들고 있습니다. 데님은 시간이 지날수록 색감이 깊어지고 디테일이 드러나기 때문에, 원단과 리벳, 버튼 등 데님을 구성하는 모든 것들에서 퀄리티에 대해 타협하지 않는 것이 모드나인의 유일한 원칙입니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"et2ll","text":"I do not want to by it!!!","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 3,
    image_url: 'https://image.msscdn.net/images/goods_img/20220517/2565836/2565836_1_500.jpg',
    price: getRandom(100000, 20000),
  },
  {
    name: '카펜터 카고 팬츠 더스티퍼플',
    contents: `{"blocks":[{"key":"atblg","text":"꼼파뇨(CPGN STUDIO)는 남녀노소 그리고 세대의 구분 없이 빠르게 변화하는 유행과 상관없이 한결같이 입을 수 있는 의류를 전달하기 위해 론칭한 브랜드입니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"et2ll","text":"I do not want to by it!!!","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 3,
    image_url: 'https://image.msscdn.net/images/goods_img/20210518/1955971/1955971_1_500.jpg',
    price: getRandom(100000, 20000),
  },
  {
    name: '웨스트 167 데님 더스트 그레이',
    contents: `{"blocks":[{"key":"atblg","text":"엘무드(LMOOD)는 미니멀과 컴포트를 중점으로 이 시대 트렌드를 반영한 컨템포러리 감성 브랜드입니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"et2ll","text":"I do not want to by it!!!","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 3,
    image_url: 'https://image.msscdn.net/images/goods_img/20220719/2670664/2670664_1_500.jpg',
    price: getRandom(100000, 20000),
  },
  {
    name: 'Stone Worker CT / New Crop',
    contents: `{"blocks":[{"key":"atblg","text":"피스워커 (PIECE WORKER)는 매시즌 혁신적인 데님을 선보이며 트랜드를 선도하는 컨템포러리 데님 브랜드입니다. 섬세한 미니멀리즘을 기반으로 유럽 데님의 트랜디한 스타일과 정통 데님의 견고함을 적절히 믹스해 피스워커만의 핏과 느낌으로 표현합니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"et2ll","text":"I do not want to by it!!!","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 3,
    image_url: 'https://image.msscdn.net/images/goods_img/20180727/821341/821341_9_500.jpg',
    price: getRandom(100000, 20000),
  },
  {
    name: 'LIP 라운지 팬츠 라이트세이지',
    contents: `{"blocks":[{"key":"atblg","text":"파이브라인(FIVELINE)은 FUN, FINE, FANCY, FREE, FOCUS의 다섯 가지 리듬이 담겨 있습니다. 꾸밈없이 자연스러운 일상에서 진정한 아름다움을 찾는 이들에게 자유롭고 유쾌한 라이프스타일을 제안합니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"et2ll","text":"I do not want to by it!!!","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 3,
    image_url: 'https://image.msscdn.net/images/goods_img/20220808/2703369/2703369_1_500.jpg',
    price: getRandom(100000, 20000),
  },
]

const caps = [
  {
    name: 'CIRCLE LOGO CAP',
    contents: `{"blocks":[{"key":"atblg","text":"펀치드렁크파티즈(PUNCH DRUNK PARTIES)는 현대인의 피로를 '특정할 수 없는 모든 것으로부터의 펀치드렁크'로 규정합니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"et2ll","text":"I do not want to by it!!!","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 4,
    image_url: 'https://image.msscdn.net/images/goods_img/20220630/2640335/2640335_1_500.jpg',
    price: getRandom(100000, 20000),
  },
  {
    name: '에센셜 스몰로고 볼캡 레드 (UN323CCP81) ',
    contents: `{"blocks":[{"key":"atblg","text":"엄브로(UMBRO)는 영국 맨체스터에 본사를 두고 스포츠 웨어와 다양한 장비를 만드는 브랜드다. 오늘 날의 엄브로는 단순히 축구 브랜드로서의 역할만이 아니라 축구를 통해 얻은 헤리티지와 기능성 소재에 영국의 스트릿 스타일을 더해 신선한 무드의 패션 아이템도 함께 선보이며 세계적인 패션 브랜드로 거듭 나는데 성공했다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"et2ll","text":"I do not want to by it!!!","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 4,
    image_url: 'https://image.msscdn.net/images/goods_img/20220704/2645733/2645733_1_500.jpg',
    price: getRandom(100000, 20000),
  },
  {
    name: '홀리데이 시그니처 볼 캡 [그린]',
    contents: `{"blocks":[{"key":"atblg","text":"밀로(MILLO)는 무채색을 기본으로 여유 있는 실루엣과 돋보이는 컬러, 디테일의 의류를 제작합니다. 매일 입어도 과하지 않고 부담 없는 의복을 밀로만의 관점으로 소개합니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"et2ll","text":"I do not want to by it!!!","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 4,
    image_url: 'https://image.msscdn.net/images/goods_img/20211223/2280117/2280117_1_500.jpg',
    price: getRandom(100000, 20000),
  },
  {
    name: '루키 언스트럭쳐 볼캡 NY (D.Beige)',
    contents: `{"blocks":[{"key":"atblg","text":"MLB(엠엘비)는 148년 전통의 American Sports Lifestyle을 상징하는Major League Baseball의 클래식 헤리티지를 현대적으로 재해석하여 Technical Street Casual을 지향하고 있으며, Active한 라이프 스타일을 즐기는 Young Generation의 패션 아이콘으로 다양한 스타일에 믹스 앤 매치가 가능한 스타일링 아이템들이 오랫동안 사랑 받고있는 브랜드입니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"et2ll","text":"I do not want to by it!!!","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 4,
    image_url: 'https://image.msscdn.net/images/goods_img/20210826/2089721/2089721_2_500.jpg',
    price: getRandom(100000, 20000),
  },
  {
    name: 'SMALL CLASSIC LOGO CAP pink',
    contents: `{"blocks":[{"key":"atblg","text":"마리떼(MARITHE FRANCOIS GIRBAUD)는 1972년, 마리떼 바슐르히(Marithé Bachellerie)와 프랑소와 저버(Francois Girbaud)가 설립한 프랑스 패션 브랜드로서, 하이엔드 디자인을 캐주얼 웨어에 접목하여 전 세계적으로 많은 사랑을 받아 왔습니다. 프랑스를 대표하는 글로벌 브랜드로서 트렌드를 이끄는 유러피안 감성 캐주얼을 선보입니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"et2ll","text":"I do not want to by it!!!","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 4,
    image_url: 'https://image.msscdn.net/images/goods_img/20220119/2315824/2315824_1_500.jpg',
    price: getRandom(100000, 20000),
  },
]

const hoodie = [
  {
    name: 'Oversized (19) Slogan Wool Knit Hoodie [LILAC]',
    contents: `{"blocks":[{"key":"atblg","text":"아조바이아조(AJOBYAJO)는 동시대를 살아가는 아웃사이더의 감성으로 아시아의 서브컬처를 스트릿 웨어로 표현하는 브랜드입니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"et2ll","text":"I do not want to by it!!!","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 5,
    image_url: 'https://image.msscdn.net/images/goods_img/20220720/2673252/2673252_1_500.jpg',
    price: getRandom(100000, 20000),
  },
  {
    name: '스마일 오버사이즈 헤비 후드티 MWZHD001-BK',
    contents: `{"blocks":[{"key":"atblg","text":"MASSNOUN(매스노운)는 일상에서의 가치로 매길 수 없는 트렌드를 제안 하려 합니다. Massnoun 은 " 셀 수 없는 명사 " 를 뜻하는 사전적 표현의 의미를 두었습니다. 그래서 우리는 정형화 되고 제한된 틀에서 벗어나 셀수 없는 가치를 지닌 명확한 스타일을 지향하는 브랜드로 거듭나고자 합니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"et2ll","text":"I do not want to by it!!!","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 5,
    image_url: 'https://image.msscdn.net/images/goods_img/20201027/1664849/1664849_1_500.jpg',
    price: getRandom(100000, 20000),
  },
  {
    name: '피치스킨 벌룬오버 후드 - 그린',
    contents: `{"blocks":[{"key":"atblg","text":"엠오오(MOO)는 컨템포러리 트렌드를 기반으로 범용성을 중시합니다. 여느 때와 다를 것 없이 지나가는 평범한 일상에 함께하는 이지 웨어를 제안합니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"et2ll","text":"I do not want to by it!!!","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 5,
    image_url: 'https://image.msscdn.net/images/goods_img/20210906/2109940/2109940_1_500.jpg',
    price: getRandom(100000, 20000),
  },
  {
    name: '[호시 PICK] CGP 오리진 호랑이 로고 후디_멜란지그레이',
    contents: `{"blocks":[{"key":"atblg","text":"코드그라피(CODEGRAPHY)는 다양한 문화에 녹아있는 핵심적인 코드(code)들을 재해석해 시각화(graphy)하는 브랜드입니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"et2ll","text":"I do not want to by it!!!","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 5,
    image_url:
      'https://image.msscdn.net/images/goods_img/20220725/2681011/2681011_16775550168053_500.jpg',
    price: getRandom(100000, 20000),
  },
  {
    name: '빅 트위치 루즈핏 후드 티셔츠 라이트 블루',
    contents: `{"blocks":[{"key":"atblg","text":"리(LEE)는 캔자스 시티에서 시작된 130년 역사를 지닌 브랜드입니다. 전통적으로 견고함과 실용성을 강조했던 워크 웨어와 데님으로부터 모티브를 얻어 현대적이고 세련된 스타일을 전개하는 라이프스타일 브랜드입니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"et2ll","text":"I do not want to by it!!!","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 5,
    image_url: 'https://image.msscdn.net/images/goods_img/20220801/2691265/2691265_1_500.jpg',
    price: getRandom(100000, 20000),
  },
]
// 1부터 10까지 주입

async function main() {
  const CATEGORIES = ['SNEAKERS', 'T-SHIRT', 'PANTS', 'CAP', 'HOODIE']
  CATEGORIES.forEach(async (c, i) => {
    const product = await prisma.categories.upsert({
      where: {
        id: i + 1,
      },
      update: {
        name: c,
      },
      create: {
        name: c,
      },
    })
    console.log(`Upsert Category id : ${product.id}`)
  })

  // 기존에 있던 테이블을 다 지운다.
  await prisma.products.deleteMany({})

  for (let productItem of [...sneakers, ...tshirt, ...pants, ...caps, ...hoodie]) {
    const product = await prisma.products.create({
      data: productItem,
    })
    console.log(`Created id : ${product.id}`)
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (error) => {
    console.error(error)
    await prisma.$disconnect()
    process.exit(1)
  })

// product를 무한히 찍어낼 것이다.
