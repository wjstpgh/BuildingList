import React from "react";
import Button from "../common/button";
import useSWRAxios from "../../hooks/useSWRAxios";
import { ChartData, Fee, Rate, chartColor, setOptions } from "./data";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface ModalProps {
  id: string;
  name: string;
  onClickClose: () => void;
}

const Chart = ({ id, name, onClickClose }: ModalProps) => {
  const { data: chartData } = useSWRAxios<ChartData>({ url: `/chart/${id}` });

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

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-[rgba(0,0,45,0.2)] backdrop-blur-[3px] z-10">
      <div className="flex flex-col justify-between items-center p-[30px] gap-y-[30px] bg-[rgba(255,255,255,0.7)] rounded-[10px]">
        <div className="text-[2rem] text-gray-500 font-bold">{name}-chart</div>
        <div className="w-[60vw] h-[70vh] overflow-y-auto">
          {chartData?.data && (
            <>
              <Line
                options={setOptions("임대료")}
                data={setChartData(chartData.data.rentFee, "rentFee")}
              />
              <Line
                options={setOptions("관리비")}
                data={setChartData(
                  chartData.data.maintenanceFee,
                  "maintenanceFee"
                )}
              />
              <Line
                options={setOptions("공실률")}
                data={setChartData(chartData.data.vacancyRate, "vacancyRate")}
              />
            </>
          )}
        </div>
        <Button
          btnText="확인"
          onClickAction={onClickClose}
          btnStyleType="curtain"
        />
      </div>
    </div>
  );
};

export default Chart;
