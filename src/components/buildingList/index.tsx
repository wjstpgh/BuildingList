import React, { useState } from "react";
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
import { PATH } from "../../constants/path";

// 상수는 대문자로 구분
export const modalContents = {
  emptyList: "비교할 빌딩이 하나도 선택되지 않았습니다.",
  fullList: "비교 리스트는 열개를 넘을 수 없습니다.",
};

const BuildingList = () => {
  const [selectedId, setSelectedId] = useState("");

  // 모달이 여러개가 있고, 순차적으로 뜨고 순차적으로 닫히는 경우에는 어떻게 처리할 것인지
  // 토스 Slash의 useOverlay 참고
  // @see https://www.slash.page/ko/libraries/react/use-overlay/src/useOverlay.i18n
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
      url: selectedId !== "" ? `building/${selectedId}` : "",
    });

  const goToCompare = () => {
    if (compareList.length === 0) {
      setModalContent(modalContents.emptyList);
      setIsModalOpen(true);
    } else {
      push(PATH.BUILDING_COMPARE);
    }
  };

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
      {/*로딩 관련해서 처리를 해줄 수 있는 공통 HOC 컴포넌트를 만드는것도 나쁘지 않을듯, 가독성 향상, 일관성 */}
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
      {/*HOC 아니면 적어도 따로 Component로 빼기*/}
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
