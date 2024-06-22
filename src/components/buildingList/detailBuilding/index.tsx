import React, { useState } from "react";
import { DetailBuilding } from "../data";
import { numberToString } from "../../../utils/number";
import Button from "../../common/button";
import Chart from "../../chart";

interface DetailBuildingProps {
  detailBuildingData: DetailBuilding;
}

const detailDescClass =
  "flex justify-between [&>span:nth-child(2)]:font-bold leading-[2rem] pt-[1rem] border-b-[2px] border-gray-700";

const BuildingDetail = ({ detailBuildingData }: DetailBuildingProps) => {
  const [isChartOpen, setIsChartOpen] = useState(false);

  return (
    <div className="grid grid-cols-3 w-[90vw] gap-x-[20px]">
      <div>
        <img
          src={detailBuildingData.image}
          width={300}
          height={300}
          className="w-full h-full"
          alt={`${detailBuildingData.id}-img`}
        />
      </div>
      <div>
        <div className={detailDescClass}>
          <span>용도지역</span>
          <span>{detailBuildingData.landPurpose}</span>
        </div>
        <div className={detailDescClass}>
          <span>연면적</span>
          <span>{numberToString(detailBuildingData.totalArea)}평</span>
        </div>
        <div className={detailDescClass}>
          <span>건폐율</span>
          <span>{detailBuildingData.bcRat.toFixed(2)}%</span>
        </div>
        <div className={detailDescClass}>
          <span>층수</span>
          <span>
            지하 {detailBuildingData.floor.under}층/지상{" "}
            {detailBuildingData.floor.above}층
          </span>
        </div>
        <div className={detailDescClass}>
          <span>총 주차대수</span>
          <span>{detailBuildingData.totalPark}대</span>
        </div>
        <div className={detailDescClass}>
          <span>준공연도</span>
          <span>
            {detailBuildingData.construct.year}년 (
            {detailBuildingData.construct.quarter})
          </span>
        </div>
      </div>
      <div>
        <div className={detailDescClass}>
          <span>대지면적</span>
          <span>{numberToString(detailBuildingData.platArea)}평</span>
        </div>
        <div className={detailDescClass}>
          <span>건축면적</span>
          <span>{numberToString(detailBuildingData.architectureArea)}평</span>
        </div>
        <div className={detailDescClass}>
          <span>용적율</span>
          <span>{detailBuildingData.vlRat.toFixed(2)}%</span>
        </div>
        <div className={detailDescClass}>
          <span>주용도</span>
          <span>{detailBuildingData.mainPurpose}</span>
        </div>
        <div className="p-[1.5rem]"></div>
        <div className="flex justify-end">
          <Button
            btnText="차트"
            onClickAction={() => setIsChartOpen(true)}
            btnStyleType="shadow"
          />
        </div>
      </div>
      {isChartOpen && (
        <Chart
          id={detailBuildingData.id}
          name={detailBuildingData.buildingName}
          onClickClose={() => setIsChartOpen(false)}
        />
      )}
    </div>
  );
};

export default BuildingDetail;
