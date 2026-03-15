import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MainLayout } from '../components/MainLayout';
import { HomePage } from './Pages/HomePage';
import { NotFoundPage } from './Pages/NotFoundPage';
import { QuestionPage } from './Pages/QuestionPage';
import { AddQuestionPageLazy } from './Pages/AddQuestionPage';
import { EditQuestionPage } from './Pages/EditQuestionPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/forbidden" element={<div>forbidden</div>} />
          <Route path="/addquestion" element={<AddQuestionPageLazy />} />
          <Route path="/question/:id" element={<QuestionPage />} />
          <Route path="/editquestion/:id" element={<EditQuestionPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
