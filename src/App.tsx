import { BrowserRouter, Routes, Route, Outlet, Navigate, useLocation } from "react-router-dom";
import { MainLayout } from "../components/MainLayout";
import { HomePage } from "./Pages/HomePage";
import { NotFoundPage } from "./Pages/NotFoundPage";
import { QuestionPage } from "./Pages/QuestionPage";
import { AddQuestionPageLazy } from "./Pages/AddQuestionPage";
import { EditQuestionPageLazy } from "./Pages/EditQuestionPage";
import { AuthProvider } from "./AuthProvider/AuthProvider";
import { useAuth } from "./hooks/useAuth";
import { ForbiddenPage } from "./Pages/ForbiddenPage/ForbiddenPage";
import { ThemeProvider } from "./theme";

const ProtectedRoutes = () => {
  const { isAuth } = useAuth();
  const location = useLocation();

  return isAuth ? <Outlet /> : <Navigate to="/forbidden" replace state={{ from: location.pathname }} />;
};

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<MainLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/forbidden" element={<ForbiddenPage />} />
              <Route path="/question/:id" element={<QuestionPage />} />

              <Route element={<ProtectedRoutes />}>
                <Route path="/addquestion" element={<AddQuestionPageLazy />} />
                <Route path="/editquestion/:id" element={<EditQuestionPageLazy />} />
              </Route>

              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
