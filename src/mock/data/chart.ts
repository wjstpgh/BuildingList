import { faker } from "@faker-js/faker/locale/ko";

const generateMockChartData = (id: string) => {
  const rentFees = Array.from(Array(10), () => {
    return {
      date: {
        year: faker.number.int({ min: 1990, max: 2024 }),
        month: faker.number.int({ min: 1, max: 12 }),
      },
      fee: faker.number.int({ min: 1000000, max: 100000000 }),
    };
  });

  const maintenanceFees = Array.from(Array(10), () => {
    return {
      date: {
        year: faker.number.int({ min: 1990, max: 2024 }),
        month: faker.number.int({ min: 1, max: 12 }),
      },
      fee: faker.number.int({ min: 1000000, max: 100000000 }),
    };
  });

  const vacancyRates = Array.from(Array(10), () => {
    return {
      date: {
        year: faker.number.int({ min: 1990, max: 2024 }),
        month: faker.number.int({ min: 1, max: 12 }),
      },
      rate: faker.number.int({ min: 1000000, max: 100000000 }),
    };
  });

  const chart = {
    id,
    rentFee: rentFees,
    maintenanceFee: maintenanceFees,
    vacancyRate: vacancyRates,
  };

  return chart;
};

export { generateMockChartData };
