import { Column } from "react-table";
import { numberToString } from "../../utils/number";
import CheckBox from "../common/checkBox";
import { SetterOrUpdater } from "recoil";
import { modalContents } from ".";

// @suggestion 타입(types.ts) 폴더와 상수(data.ts)를 모으는 파일 분리
interface Buildings {
  id: string;
  address: string;
  buildingName: string;
  construct: {
    year: number;
    quarter: string;
  };
  totalArea: number;
  deposit: number;
  floor: {
    under: number;
    above: number;
  };
  maintenanceFee: number;
  nla: number;
  rentFee: number;
  vacancyRate: number;
}

export interface DetailBuilding extends Omit<Buildings, "nla" | "vacancyRate"> {
  architectureArea: number;
  bcRat: number;
  image: string;
  landPurpose: string;
  mainPurpose: string;
  maintenanceFee: number;
  platArea: number;
  totalPark: number;
  transactionDate: { year: number; month: number };
  transactionPrice: number;
  vlRat: number;
}

export interface BuildingsData {
  data: Buildings[];
}

export interface DetailBuildingData {
  data: DetailBuilding;
}

interface GetBuildingColumnsProps {
  compareList: string[];
  setCompareList: SetterOrUpdater<string[]>;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setModalContent: React.Dispatch<React.SetStateAction<string>>;
}

// @suggestion hooks의 set함수를 인자로 넣는 것은
// 해당 함수에 set함수의 의존성을 주는것이라서, 유지보수 측면에서 좋지 않음
// 차라리, selectedBuildingToCompare를 onCheckboxClick(value) => {} 같은 함수를 외부에서 주입할 수 있게 하는 것이 나을듯
export const getBuildingColumns = ({
  compareList,
  setCompareList,
  setIsModalOpen,
  setModalContent,
}: GetBuildingColumnsProps): Column<Buildings>[] => {
  const selecteBuildingToCompare = (seleteId: string) => {
    setCompareList((prev) => {
      if (prev.includes(seleteId)) {
        return prev.filter((el) => el !== seleteId);
      } else {
        if (compareList.length < 10) {
          return prev.concat(seleteId);
        } else {
          setModalContent(modalContents.fullList);
          setIsModalOpen(true);
          return prev;
        }
      }
    });
  };

  return [
    {
      id: "checkbox",
      Header: "",
      accessor: "id",
      Cell: ({ cell }) => (
        <CheckBox
          id={cell.value}
          checked={compareList.includes(cell.value)}
          // onClick={(cell.value) => onCheckboxClick(cell.value)}
          onClick={() => selecteBuildingToCompare(cell.value)}
        />
      ),
    },
    { id: "buildingName", Header: "건물명", accessor: "buildingName" },
    { id: "address", Header: "주소", accessor: "address" },
    {
      id: "constructYear",
      Header: "준공일(연도)",
      accessor: "construct",
      Cell: ({ cell }) => <div>{cell.value.year}</div>,
    },
    {
      id: "constructQuarter",
      Header: "준공일(분기)",
      accessor: "construct",
      Cell: ({ cell }) => <div>{cell.value.quarter}</div>,
    },
    {
      id: "totalArea",
      Header: "연면적",
      accessor: "totalArea",
      Cell: ({ cell }) => <div>{numberToString(cell.value)}평</div>,
    },
    {
      id: "nla",
      Header: "전용률",
      accessor: "nla",
      Cell: ({ cell }) => <div>{cell.value.toFixed(2)}%</div>,
    },
    {
      id: "floor",
      Header: "층수",
      accessor: "floor",
      Cell: ({ cell }) => (
        <div>
          지하 {cell.value.under}층/지상 {cell.value.above}층
        </div>
      ),
    },
    {
      id: "deposit",
      Header: "보증금",
      accessor: "deposit",
      Cell: ({ cell }) => <div>{numberToString(cell.value)}원/평</div>,
    },
    {
      id: "rentFee",
      Header: "임대료",
      accessor: "rentFee",
      Cell: ({ cell }) => <div>{numberToString(cell.value)}원/평</div>,
    },
    {
      id: "maintenanceFee",
      Header: "관리비",
      accessor: "maintenanceFee",
      Cell: ({ cell }) => <div>{numberToString(cell.value)}원/평</div>,
    },
    {
      id: "vacancyRate",
      Header: "공실률",
      accessor: "vacancyRate",
      Cell: ({ cell }) => <div>{cell.value.toFixed(2)}%</div>,
    },
  ];
};
