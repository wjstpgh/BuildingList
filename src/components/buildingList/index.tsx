import React, { useEffect, useState } from "react";
import useSWRAxios from "../../hooks/useSWRAxios";
import DynamicTable from "../common/dynamicTable";
import { BuildingsData, DetailBuildingData, getBuildingColumns } from "./data";
import Loading from "../common/loading";
import BuildingDetail from "./detailBuilding";
import { useRecoilState } from "recoil";
import { buildingList } from "../../store";
import Button from "../common/button";
import { useNavigate } from "react-router-dom";
import Modal from "../common/modal";

export const modalContents = {
  emptyList: "비교할 빌딩이 하나도 선택되지 않았습니다.",
  fullList: "비교 리스트는 열개를 넘을 수 없습니다.",
};

const BuildingList = () => {
  const [selectedId, setSelectedId] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");

  const [compareList, setCompareList] = useRecoilState(buildingList);

  const push = useNavigate();

  const { data: getBuildingData, isLoading: getBuildingLoading } =
    useSWRAxios<BuildingsData>({
      url: "/buildings",
    });
  const { data: getSelectedBuilding, isLoading: getSelectedBuildingLoading } =
    useSWRAxios<DetailBuildingData>({
      url: selectedId !== "" ? ` building/${selectedId}` : "",
    });

  const goToCompare = () => {
    if (compareList.length === 0) {
      setModalContent(modalContents.emptyList);
      setIsModalOpen(true);
    } else {
      push("/building-compare");
    }
  };

  useEffect(() => {
    console.log(compareList);
  }, [compareList]);

  return (
    <div className="flex flex-col justify-center items-center gap-y-[40px] py-[40px]">
      <div className="text-[2rem] font-bold self-start">빌딩 목록</div>
      <Button
        btnText="비교하기"
        onClickAction={goToCompare}
        classBtnWrap="self-end"
        btnStyleType="curtain"
        toogleOpacity={compareList.length === 0}
      />
      {getBuildingLoading && <Loading />}
      {getBuildingData?.data && (
        <DynamicTable
          columns={getBuildingColumns({
            compareList,
            setCompareList,
            setIsModalOpen,
            setModalContent,
          })}
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
      {isModalOpen && (
        <Modal
          inlineContent={modalContent}
          onClickClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default BuildingList;
