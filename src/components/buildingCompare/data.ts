type CompareBuildingList = {
  buildingName: {
    view: string;
    data: string[];
  };
  image: {
    view: string;
    data: string[];
  };
  construct: {
    view: string;
    data: {
      year: number;
      quarter: string;
    }[];
  };
  deposit: {
    view: "보증금";
    data: number[];
  };
  rentFee: {
    view: "임대료";
    data: number[];
  };
  maintenanceFee: {
    view: "관리비";
    data: number[];
  };
  transactionDate: {
    view: "최근거래일";
    data: {
      year: number;
      month: number;
    }[];
  };
  transactionPrice: {
    view: "거래가";
    data: number[];
  };
};

/*
 * @comment 상수는 항상 대문자로 하면, 구분이 쉬움
 * */
export const DEFAULT_COMPARE_BUILDING_LIST: CompareBuildingList = {
  buildingName: {
    view: "비교빌딩",
    data: [],
  },
  image: {
    view: "건물 사진",
    data: [],
  },
  construct: {
    view: "준공연도",
    data: [],
  },
  deposit: {
    view: "보증금",
    data: [],
  },
  rentFee: {
    view: "임대료",
    data: [],
  },
  maintenanceFee: {
    view: "관리비",
    data: [],
  },
  transactionDate: {
    view: "최근거래일",
    data: [],
  },
  transactionPrice: {
    view: "거래가",
    data: [],
  },
};
