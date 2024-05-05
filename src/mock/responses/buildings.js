import { generateMockBuildings } from "../data/building";

const buildingsResponse = {
  uri: "/buildings",
  handleResponse: () => {
    return {
      data: generateMockBuildings(),
    };
  },
};

export default buildingsResponse;
