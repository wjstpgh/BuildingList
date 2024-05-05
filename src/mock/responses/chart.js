import { generateMockChartData } from "../data/chart";

const chartResponse = {
  uri: "/chart/:id",
  handleResponse: (req) => {
    const id = req.params.id;

    if (!id) throw new Error("Invalid id");

    return {
      data: generateMockChartData(id),
    };
  },
};

export default chartResponse;
