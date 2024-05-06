import React, { useEffect, useState } from "react";
import useSWRAxios from "../../hooks/useSWRAxios";
import DynamicTable from "../common/dynamicTable";
import { BuildingsData, DetailBuildingData, getBuildingColumns } from "./data";
import Loading from "../common/loading";
import BuildingDetail from "./detailBuilding";
import { useRecoilState } from "recoil";
import { buildingList } from "../../store";

const BuildingList = () => {
  const [selectedId, setSelectedId] = useState("");
  const [compareList, setCompareList] = useRecoilState(buildingList);

  const { data: getBuildingData, isLoading: getBuildingLoading } =
    useSWRAxios<BuildingsData>({
      url: "/buildings",
    });
  const { data: getSelectedBuilding, isLoading: getSelectedBuildingLoading } =
    useSWRAxios<DetailBuildingData>({
      url: selectedId !== "" ? ` building/${selectedId}` : "",
    });

  useEffect(() => {
    console.log(compareList);
  }, [compareList]);

  return (
    <div className="flex flex-col justify-center items-center gap-y-[80px]">
      <div className="text-[2rem] font-bold self-start">빌딩 목록</div>
      {getBuildingLoading && <Loading />}
      {getBuildingData?.data && (
        <DynamicTable
          columns={getBuildingColumns({ compareList, setCompareList })}
          data={getBuildingData.data}
          selectedId={selectedId}
          setSelectedId={setSelectedId}
        />
      )}
      {getSelectedBuilding?.data ? (
        <BuildingDetail detailBuildingData={getSelectedBuilding.data} />
      ) : getSelectedBuildingLoading ? (
        <Loading />
      ) : (
        <div className="w-[90vw] py-[20px] bg-[rgba(75,75,75,0.8)] text-white flex justify-center items-center text-[8rem]">
          Not Selected
        </div>
      )}
    </div>
  );
};

export default BuildingList;
