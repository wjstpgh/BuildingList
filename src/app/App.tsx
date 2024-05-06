import { Suspense, lazy } from "react";
import Loading from "../components/common/loading";
import { Route, Routes } from "react-router-dom";

const BuildingList = lazy(() => import("../pages/building-list"));
const BuildingCompare = lazy(() => import("../pages/building-compare"));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <main className="w-screen min-h-screen flex flex-col justify-center items-center overflow-hidden">
        <Routes>
          <Route index element={<BuildingList />} />
          <Route path="compare" element={<BuildingCompare />} />
        </Routes>
      </main>
    </Suspense>
  );
}

export default App;
