import React, { useCallback, useEffect } from "react";
import Button from "../common/button";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { buildingList } from "../../store";
import axios from "axios";
import { DetailBuildingData } from "../buildingList/data";

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

const compareBuildingList: CompareBuildingList = {
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

const BuildingCompare = () => {
  const compareBuildingKeyList = useRecoilValue(buildingList);
  const push = useNavigate();

  const goToHome = () => {
    push("/");
  };

  const hydrateCompareList = useCallback(async () => {
    compareBuildingKeyList.forEach(async (key) => {
      const {
        data: { data: buildingData },
      } = await axios.get<DetailBuildingData>(`building/${key}`);
      Object.keys(compareBuildingList).forEach((category) =>
        compareBuildingList[
          category as keyof typeof compareBuildingList
        ].data.concat(
          buildingData[category as keyof typeof compareBuildingList]
        )
      );
      console.log(buildingData);
    });
  }, [compareBuildingKeyList]);

  useEffect(() => {
    hydrateCompareList();
  }, [hydrateCompareList]);

  return (
    <div className="flex flex-col justify-center items-center gap-y-[40px] py-[40px]">
      <div className="text-[2rem] font-bold self-start">빌딩 목록</div>
      <Button
        btnText="홈으로"
        onClickAction={goToHome}
        classBtnWrap="self-end"
        btnStyleType="curtain"
      />
      <div></div>
    </div>
  );
};

export default BuildingCompare;
