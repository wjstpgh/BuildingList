import { faker } from "@faker-js/faker/locale/ko";

const generateMockBuildings = () => {
  const buildings = Array.from(Array(100), (_, index) => {
    return {
      id: `KR00${index}`,
      address: `${faker.location.city()} ${faker.location.streetAddress()} ${faker.location.secondaryAddress()}`,
      buildingName: faker.company.name(),
      construct: {
        year: faker.number.int({ min: 1990, max: 2024 }),
        quarter: `Q${faker.number.int({ min: 1, max: 4 })}`,
      },
      totalArea: faker.number.int({ min: 1000, max: 50000000 }), // 연면적
      nla: faker.number.float({ min: 20, max: 100 }), // 전용률
      floor: {
        under: faker.number.int({ min: 0, max: 5 }),
        above: faker.number.int({ min: 1, max: 30 }),
      },
      deposit: faker.number.int({ min: 1000000, max: 100000000 }), // 보증금
      rentFee: faker.number.int({ min: 1000000, max: 50000000 }), // 임대료
      maintenanceFee: faker.number.int({ min: 1000000, max: 50000000 }), // 관리비
      vacancyRate: faker.number.float({ min: 0, max: 100 }), // 공실률
    };
  });

  return buildings;
};

const generateMockBuildingDetail = (id) => {
  const building = {
    id,
    address: `${faker.location.city()} ${faker.location.streetAddress()} ${faker.location.secondaryAddress()}`,
    image: faker.image.urlLoremFlickr({
      category: "city",
      width: 400,
      height: 400,
    }),
    landPurpose: faker.helpers.arrayElement([
      "일반상업지역",
      "중심상업지역",
      "근린상업지역",
      "유통상업지역",
    ]),
    totalArea: faker.number.int({ min: 1000, max: 50000000 }), // 연면적
    bcRat: faker.number.float({ min: 20, max: 100 }), // 전용률
    floor: {
      under: faker.number.int({ min: 0, max: 5 }),
      above: faker.number.int({ min: 1, max: 30 }),
    },
    totalPark: faker.number.int({ min: 0, max: 500 }),
    construct: {
      year: faker.number.int({ min: 1990, max: 2024 }),
      quarter: `Q${faker.number.int({ min: 1, max: 4 })}`,
    },
    platArea: faker.number.int({ min: 1000, max: 50000000 }), // 대지면적
    architectureArea: faker.number.int({ min: 1000, max: 50000000 }), // 건축면적
    vlRat: faker.number.float({ min: 20, max: 100 }), // 용적율
    mainPurpose: faker.helpers.arrayElement([
      "업무시설",
      "생활시설",
      "공공업무시설",
    ]),
    deposit: faker.number.int({ min: 1000000, max: 100000000 }), // 보증금
    rentFee: faker.number.int({ min: 1000000, max: 50000000 }), // 임대료
    maintenanceFee: faker.number.int({ min: 1000000, max: 50000000 }), // 관리비
    transactionDate: {
      year: faker.number.int({ min: 1990, max: 2024 }),
      month: faker.number.int({ min: 1, max: 12 }),
    },
    transactionPrice: faker.number.int({ min: 1000000, max: 500000000000 }), // 거래가
  };

  return building;
};

export { generateMockBuildings, generateMockBuildingDetail };
