import { Column } from "react-table";
import { parseNum } from "../../utils";
import CheckBox from "../common/checkBox";
import { SetterOrUpdater } from "recoil";

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

export interface DetailBuilding
  extends Omit<
    Buildings,
    "buildingName" | "maintenanceFee" | "nla" | "vacancyRate"
  > {
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
}

export const getBuildingColumns = ({
  compareList,
  setCompareList,
}: GetBuildingColumnsProps): Column<Buildings>[] => {
  const selecteBuildingToCompare = (seleteId: string) => {
    setCompareList((prev) =>
      prev.includes(seleteId)
        ? prev.filter((el) => el !== seleteId)
        : compareList.length < 10
        ? prev.concat(seleteId)
        : prev
    );
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
      Cell: ({ cell }) => <div>{parseNum(cell.value)}평</div>,
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
      Cell: ({ cell }) => <div>{parseNum(cell.value)}원/평</div>,
    },
    {
      id: "rentFee",
      Header: "임대료",
      accessor: "rentFee",
      Cell: ({ cell }) => <div>{parseNum(cell.value)}원/평</div>,
    },
    {
      id: "maintenanceFee",
      Header: "관리비",
      accessor: "maintenanceFee",
      Cell: ({ cell }) => <div>{parseNum(cell.value)}원/평</div>,
    },
    {
      id: "vacancyRate",
      Header: "공실률",
      accessor: "vacancyRate",
      Cell: ({ cell }) => <div>{cell.value.toFixed(2)}%</div>,
    },
  ];
};
