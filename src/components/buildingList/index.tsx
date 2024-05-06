import React, { useEffect } from "react";
import useSWRAxios from "../../hooks/useSWRAxios";
import DynamicTable from "../common/dynamicTable";
import { BuildingsData, getBuildingColumns } from "./data";

const BuildingList = () => {
  const { data: getBuildingData } = useSWRAxios<BuildingsData>({
    url: "/buildings",
  });

  useEffect(() => {
    console.log(getBuildingData);
  }, [getBuildingData]);

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="text-[2rem] font-bold self-start">빌딩 목록</div>
      {getBuildingData?.data && (
        <DynamicTable
          columns={getBuildingColumns()}
          data={getBuildingData.data}
        />
      )}
    </div>
  );
};

export default BuildingList;
