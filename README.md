# my read me

- deployed preview link
  https://rsquare-beryl.vercel.app/

## 기능 구현
각 페이지 별로 요구사항 명세에 따른 접근 방식과 메인 기능을 하는 코드부분, 발생했던 이슈등을 설명합니다.

프로젝트 폴더 구조로는 
- /src/pages -> 개별 페이지
- /src/components -> 각 페이지에 사용되는 컴포넌트를 페이지 폴더 구조와 매치되도록 생성
으로 작성되었으며, 이는 nextJs의 app routing 방식으로의 migrate를 염두에 둔 구조입니다.

### 빌딩 목록

- get api data

  ```
  // src/components/buildingList/index.tsx line:27
  
  const { data: getSelectedBuilding, isLoading: getSelectedBuildingLoading } =
    useSWRAxios<DetailBuildingData>({
      url: selectedId !== "" ? `building/${selectedId}` : "",
    });
  ```
  홈페이지에 해당하는 빌딩 목록 열람부분은 서버 데이터 변동사항을 감지할 수 있도록 swr을 이용하여 구현했습니다.

- 빌딩 데이터 표현 테이블

  ```
  // src/components/buildingList/index.tsx line:57
  
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
  ```
  빌딩 데이터 리스트를 표현하는 테이블은 단순한 ui뿐 아니라 빌딩 세부 데이터 열람, 비교 빌딩 선택, 동적 데이터에 따른 테이블 ui 표현을 위해
  따로 `react-table`라이브러리를 사용한 컴포넌트를 생성하여 '테이블 컬럼', '테이블 데이터'를 전달하여 테이블을 생성하도록 작성했습니다.
  ```
  // src/components/common/dynamicTable.tsx line:4

  interface DynamicTableProps<T extends object> {
    data: T[];
    columns: Column<T>[];
    selectedId: string;
    setSelectedId: Dispatch<SetStateAction<string>>;
  }

  export default function DynamicTable<T extends object>({
    data,
    columns,
    selectedId,
    setSelectedId,
  }: DynamicTableProps<T>) {
  ...
  ```
  데이터와 컬럼의 타입은 서로 연관되있으며 각 셀은 자신의 행과 열의 설정과 데이터에 접근할 수 있어 기능 구현을 하기 용이합니다.
  ex)
  ```
  // src/components/common/dynamicTable.tsx line:48
  // 테이블 행 호버 효과

  <tr
    // @ts-ignore
    key={row.id}
    {...row.getRowProps({
      className: `h-[50px] ${
        selectedId === row.cells[0].value
          ? "text-[rgb(136,112,237)] bg-[rgba(136,112,237,0.4)]"
          : "odd:text-gray-50 even:text-gray-800 odd:bg-[rgba(75,75,75,0.8)] even:bg-[rgba(175,175,175,0.5)] hover:bg-[rgba(136,112,237,0.9)]"
      } duration-[.3s] cursor-pointer`,
    })}
  >

  // src/components/common/dynamicTable.tsx line:59
  // 테이블 행 선택 효과

  {row.cells.map((cell) => (
    <td
      // @ts-ignore
      key={cell.row.id}
      {...cell.getCellProps({
        className: "p-[5px] text-center",
      })}
      onClick={() => {
        cell.column.id !== "checkbox" &&
          setSelectedId(cell.row.allCells[0].value);
      }}
    >
      {cell.render("Cell") as ReactNode}
    </td>
  ))}

  ```
  또한 각 셀에 데이터를 표현하는 방식을 폭넓게 선택할 수 있습니다.
  ex)
  ```
  // src/components/buildingList/data.tsx line:80
  // 테이블의 첫 번째 열 체크박스 구현

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
  ```
- 빌딩 선택 및 상세 데이터 열람

  ```
  // src/components/buildingList/index.tsx line:19
  const [selectedId, setSelectedId] = useState("");

  // src/components/buildingList/index.tsx line:31
  const { data: getSelectedBuilding, isLoading: getSelectedBuildingLoading } =
  useSWRAxios<DetailBuildingData>({
    url: selectedId !== "" ? `building/${selectedId}` : "",
  });
  ```
  테이블에서 행을 선택하면 id가 선택되어 이를 사용해 빌딩 상세 데이터 api를 호출합니다.

### 빌딩 차트
- 차트 라이브러리
  심플한 디자인, 많은 사용량, 리액트와 tsx기반으로 호환성이 좋다고 판단하였고, 복잡한 차트를 그리는 것이 아니기에 `React-chartjs-2`를 선택하였습니다.

- 차트를 그리기 위한 데이터 전처리
  ```
  // src/components/chart/index.tsx line:36

  const setChartData = (
    rawData: Fee[] | Rate[],
    chartCategory: keyof typeof chartColor
  ) => {
    const sortedData = [...rawData].sort((a, b) =>
      a.date.year !== b.date.year
        ? a.date.year - b.date.year
        : a.date.month - b.date.month
    );
    const labels = sortedData.map((el) => `${el.date.year}.${el.date.month}`);
    const data = sortedData.map((el) => ("fee" in el ? el.fee : el.rate));

    return {
      labels,
      datasets: [
        {
          data,
          borderColor: chartColor[chartCategory].borderColor,
          backgroundColor: chartColor[chartCategory].backgroundColor,
        },
      ],
    };
  };
  ```
  차트 dialog는 모달 형식으로 열리며 빌딩 상세 데이터에서 id를 props로 받아 get api를 호출하였고 받아온 데이터를 차트 라이브러리에 어울리게 전처리를 해줬습니다.
  1. 데이터 연도순 정렬
  2. 라벨과 데이터를 적출
  3. 어울리는 색상 선택
  순으로 차트에 데이터를 전달했습니다.

### 빌딩 비교

빌딩 비교 데이터 리스트는 페이지간 데이터 보존을 위해 `recoil`을 사용해 전역상태로 처리했습니다.

- 세부 빌딩 데이터 전처리
  (세부 빌딩 데이터를 살펴본 결과 해당 ui를 그리기 위해 필요한 데이터가 빌딩 열람 데이터와 세부 빌딩 데이터 모두를 사용해야하는 것을 알고 세부 빌딩 데이터 api를 일부 수정하였습니다.)
  ```
  // src/components/buildingCompare/index.tsx line:24

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
  ```
  전역 상태에 저장된 선택된 빌딩 아이디 배열을 이용해
  각 아이디에 해당하는 빌딩 세부 정보를 카테고리에 맞는 데이터배열로 재배치하여 ui를 그리고 각 데이터의 최소 최대값을 다르게 표현했습니다.








