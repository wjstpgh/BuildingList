import React, { useCallback, useEffect, useState } from "react";
import Button from "../common/button";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { buildingList } from "../../store";
import axios from "axios";
import { DetailBuildingData } from "../buildingList/data";
import Loading from "../common/loading";
import { numberToString } from "../../utils/number";
import { DEFAULT_COMPARE_BUILDING_LIST } from "./data";
import { PATH } from "../../constants/path";

const BuildingCompare = () => {
  const [compareBuildingList, setCompareBuildingList] = useState(
    DEFAULT_COMPARE_BUILDING_LIST,
  );
  const [isLoading, setIsLoading] = useState(false);
  // 새로고침했을때도, 유지가 될 수 있게 session storage 활용
  // library -> recoil-persist
  const compareBuildingKeyList = useRecoilValue(buildingList);
  const push = useNavigate();

  const goToHome = () => {
    push(PATH.HOME);
  };

  // @suggestion Promise.all로 구현하는 것을 어떨지
  // setIsLoading을 매번 해야할까? 한번의 set으로 처리 가능하지 않을까
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
            buildingData[category as keyof typeof prev] as never,
          ),
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
              {/*과도한 삼항 연산자 -> 복잡성을 추가*/}
              {/*로직의 분리를 통한 가독성 향상*/}
              {/*해당 부분을 display 해주는 Component 함수 구현(switch-case)*/}
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
                  >{`${numberToString(data as number)}원`}</div>
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
                  >{`${numberToString(data as number)}원/평`}</div>
                ),
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
