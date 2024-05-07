import React, { useCallback, useEffect, useState } from "react";
import Button from "../common/button";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { buildingList } from "../../store";
import axios from "axios";
import { DetailBuildingData } from "../buildingList/data";
import Loading from "../common/loading";
import { parseNum } from "../../utils";
import { defaultCompareBuildingList } from "./data";

const BuildingCompare = () => {
  const [compareBuildingList, setCompareBuildingList] = useState(
    defaultCompareBuildingList
  );
  const [isLoading, setIsLoading] = useState(false);
  const compareBuildingKeyList = useRecoilValue(buildingList);
  const push = useNavigate();

  const goToHome = () => {
    push("/");
  };

  const hydrateCompareList = useCallback(async () => {
    compareBuildingKeyList.forEach(async (key) => {
      setIsLoading(true);
      const {
        data: { data: buildingData },
      } = await axios.get<DetailBuildingData>(`building/${key}`);

      setCompareBuildingList((prev) => {
        const newList = prev;
        Object.keys(newList).forEach((category) =>
          newList[category as keyof typeof prev].data.push(
            buildingData[category as keyof typeof prev] as never
          )
        );

        return newList;
      });
      setIsLoading(false);
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
      <div className="w-[90vw] flex flex-col gap-y-[10px] overflow-x-scroll">
        {!isLoading ? (
          Object.entries(compareBuildingList).map(([category, value]) => (
            <div
              key={category}
              className="flex gap-x-[20px] [&>div]:w-[200px] [&>div]:shrink-0 [&>div]:flex [&>div]:items-center"
            >
              <div>{value.view}</div>
              {value.data.map((data, idx) =>
                category === "buildingName" ? (
                  <div key={`${category}${idx}`}>{data as string}</div>
                ) : category === "image" ? (
                  <div key={`${category}${idx}`}>
                    <img
                      src={data as string}
                      alt="compare img"
                      width={200}
                      height={200}
                      className="w-full h-full"
                    />
                  </div>
                ) : category === "construct" ? (
                  <div key={`${category}${idx}`}>{`${
                    (data as { year: number; quarter: string }).year
                  }(${
                    (data as { year: number; quarter: string }).quarter
                  })`}</div>
                ) : category === "transactionDate" ? (
                  <div key={`${category}${idx}`}>{`${
                    (data as { year: number; month: number }).year
                  }.${(data as { year: number; month: number }).month}`}</div>
                ) : category === "transactionPrice" ? (
                  <div
                    key={`${category}${idx}`}
                    className={`${
                      Math.min(...(value.data as number[])) === data &&
                      "text-[#F49898]"
                    } ${
                      Math.max(...(value.data as number[])) === data &&
                      "text-[#8870ED]"
                    }`}
                  >{`${parseNum(data as number)}원`}</div>
                ) : (
                  <div
                    key={`${category}${idx}`}
                    className={`${
                      Math.min(...(value.data as number[])) === data &&
                      "text-[#F49898]"
                    } ${
                      Math.max(...(value.data as number[])) === data &&
                      "text-[#8870ED]"
                    }`}
                  >{`${parseNum(data as number)}원/평`}</div>
                )
              )}
            </div>
          ))
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
};

export default BuildingCompare;
