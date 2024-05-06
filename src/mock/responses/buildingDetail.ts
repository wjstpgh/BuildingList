import { Request } from "miragejs";
import { generateMockBuildingDetail } from "../data/building";

const buildingDetailResponse = {
  uri: "/building/:id",
  handleResponse: (req: Request) => {
    const id = req.params.id;

    if (!id) throw new Error("Invalid id");

    return {
      data: generateMockBuildingDetail(id),
    };
  },
};

export default buildingDetailResponse;
