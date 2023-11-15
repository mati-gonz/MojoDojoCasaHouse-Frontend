import { Route, Routes } from "react-router-dom";
import Landing from "./views/Landing";
import AdminView from "./views/AdminView";

export default function RoutesFunction() {
  return (
    <Routes>
      <Route exact path="/" element={<Landing />}>
        <Route exact path="admin" element={<AdminView />} />
      </Route>
    </Routes>
  );
}
