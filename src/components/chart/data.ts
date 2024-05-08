import { CoreChartOptions, PluginChartOptions } from "chart.js"
import { _DeepPartialObject } from "chart.js/dist/types/utils"

export interface ChartData {
  data: {
    id: string
    maintenanceFee: Fee[]
    rentFee: Fee[]
    vacancyRate: Rate[]
  }
}

export type Fee = {
  date: {
    year: number
    month: number
  }
  fee: number
}

export type Rate = {
  date: {
    year: number
    month: number
  }
  rate: number
}

export const setOptions = (
  title: string
): _DeepPartialObject<
  CoreChartOptions<"line"> & PluginChartOptions<"line">
> => {
  return {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: title,
        font: { size: 30 },
      },
    },
  };
};

export const chartColor = {
  maintenanceFee: {
    borderColor: "rgb(255, 99, 132)",
    backgroundColor: "rgba(255, 99, 132, 0.5)",
  },
  rentFee: {
    borderColor: "rgb(237, 99, 255)",
    backgroundColor: "rgba(237, 99, 255, 0.5)",
  },
  vacancyRate: {
    borderColor: "rgb(112, 99, 255)",
    backgroundColor: "rgba(112, 99, 255, 0.5)",
  },
};