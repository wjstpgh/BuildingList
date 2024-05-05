const product_coffee = [
  {
    categoryId: "payhere.coffee",
    name: "아메리카노",
    price: 1500,
    option: [
      {
        name: "연하게",
      },
      {
        name: "2샷",
        price: 500,
      },
    ],
  },
  {
    categoryId: "payhere.coffee",
    name: "헤이즐넛 아메리카노",
    price: 2000,
    option: [
      {
        name: "2샷",
        price: 500,
      },
    ],
  },
  {
    categoryId: "payhere.coffee",
    name: "허니 아메리카노",
    price: 2000,
    option: [
      {
        name: "2샷",
        price: 500,
      },
    ],
  },
  {
    categoryId: "payhere.coffee",
    name: "에스프레소",
    price: 1800,
  },
];

const product_milktea = [
  {
    categoryId: "payhere.milktea",
    name: "얼그레이 밀크티",
    price: 3000,
    option: [
      {
        name: "두유로 변경",
      },
      {
        name: "2샷",
        price: 500,
      },
    ],
  },
  {
    categoryId: "payhere.milktea",
    name: "얼그레이 버블티",
    price: 3500,
    option: [
      {
        name: "2샷",
        price: 500,
      },
      {
        name: "버블 추가",
        price: 1000,
      },
      {
        name: "두유로 변경",
      },
    ],
  },
  {
    categoryId: "payhere.milktea",
    name: "딸기라떼",
    price: 4500,
  },
  {
    categoryId: "payhere.milktea",
    name: "초코라떼",
    price: 3500,
  },
  {
    categoryId: "payhere.milktea",
    name: "녹차라떼",
    price: 3500,
  },
  {
    categoryId: "payhere.milktea",
    name: "흑임자라떼",
    price: 3500,
    option: [
      {
        name: "두유로 변경",
      },
    ],
  },
];

const product_juice = [
  {
    categoryId: "payhere.juice",
    name: "수박쥬스",
    price: 4000,
  },
  {
    categoryId: "payhere.juice",
    name: "딸기쥬스",
    price: 3500,
    option: [
      {
        name: "딸기 2배",
        price: 1000,
      },
    ],
  },
  {
    categoryId: "payhere.juice",
    name: "망고쥬스",
    price: 4500,
  },
  {
    categoryId: "payhere.juice",
    name: "복숭아쥬스",
    price: 3500,
  },
];

const product_desert = [
  {
    categoryId: "payhere.desert",
    name: "딸기 마카롱",
    price: 2000,
  },
  {
    categoryId: "payhere.desert",
    name: "초코 마카롱",
    price: 2000,
  },
  {
    categoryId: "payhere.desert",
    name: "초코칩 쿠키",
    price: 1500,
  },
  {
    categoryId: "payhere.desert",
    name: "아몬드 쿠키",
    price: 1500,
  },
];

export const payhereCategories = [
  {
    id: "payhere.coffee",
    name: "Coffee",
  },
  {
    id: "payhere.milktea",
    name: "Milk Tea",
  },
  {
    id: "payhere.juice",
    name: "Juice",
  },
  {
    id: "payhere.desert",
    name: "Desert",
  },
];

export const payhereProducts = [
  ...product_coffee,
  ...product_milktea,
  ...product_juice,
  ...product_desert,
];

export const payhereCoupons = [
  {
    id: "coupon_1",
    type: "amount",
    name: "금액 할인",
    price: 3000,
  },
  {
    id: "coupon_2",
    type: "rate",
    name: "비율 할인",
    price: 10,
  },
];
