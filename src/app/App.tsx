import { Suspense, lazy } from "react";
import Loading from "../components/common/loading";
import { Route, Routes } from "react-router-dom";

const BuildingListPage = lazy(() => import("../pages/building-list"));
const BuildingComparePage = lazy(() => import("../pages/building-compare"));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <main className="w-screen min-h-screen flex flex-col justify-center items-center overflow-hidden">
        <Routes>
          <Route index element={<BuildingListPage />} />
          <Route path="building-compare" element={<BuildingComparePage />} />
        </Routes>
      </main>
    </Suspense>
  );
}

export default App;
