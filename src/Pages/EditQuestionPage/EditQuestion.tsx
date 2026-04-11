import { useActionState, type FC } from 'react';
import { Loader } from '../../../components/Loader';
import { QuestionForm } from '../QuestionForm';
import cls from './EditQuestionPage.module.css';
import { delayFn } from '../../helpers/delayFn';
import { toast } from 'react-toastify';
import { API_URL } from '../../constans/global.constans';
import { dateFormat } from '../../helpers/dateFormat';
import { useNavigate } from 'react-router-dom';
import { useFetch } from '../../hooks/useFetch';
import { type IQuestionForm, type IQuestionCard } from '../../types/types.global';

const editCardAction = async (_prevState: Partial<IQuestionForm>, formData: FormData) => {
  try {
    await delayFn();

    const newQuestion = Object.fromEntries(formData);
    const newResources = (newQuestion.resources as string).trim();
    const questionId = newQuestion.questionId;
    const isClearForm = newQuestion.clearForm;

    const response = await fetch(`${API_URL}/react/${questionId}`, {
      method: 'PATCH',
      body: JSON.stringify({
        question: newQuestion.question,
        answer: newQuestion.answer,
        description: newQuestion.description,
        resources: newResources.length ? newResources.split(',') : [],
        level: Number(newQuestion.level),
        completed: false,
        id: newQuestion.questionId,
        editDate: dateFormat(new Date())
      })
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const question = await response.json();
    toast.success('The question is edited successfully!');

    return isClearForm ? {} : question;
  } catch (error: any) {
    toast.error(error?.message);
    return {};
  }
};

export interface IEditQuestionProps {
  initialState: IQuestionCard;
}

export const EditQuestion: FC<IEditQuestionProps> = ({ initialState }) => {
  const [formState, formAction, isPending] = useActionState<Partial<IQuestionForm>, FormData>(editCardAction, {
    ...initialState,
    clearForm: false
  });

  const navigate = useNavigate();
  const [removeQuestion, isQuestionRemoving] = useFetch(async () => {
    await fetch(`${API_URL}/react/${initialState.id}`, {
      method: 'DELETE'
    });

    toast.success('The question has been successfully removed!');
    navigate('/');
  });

  const onRemoveQuestionHandler = () => {
    const isRemove = confirm('Are you sure?');
    isRemove && removeQuestion();
  };

  return (
    <>
      {(isPending || isQuestionRemoving) && <Loader />}

      <h1 className={cls.formTitle}>Edit question</h1>

      <div className={cls.formContainer}>
        <button
          className={cls.removeBtn}
          disabled={isPending || isQuestionRemoving}
          onClick={onRemoveQuestionHandler}
        >
          X
        </button>

        <QuestionForm
          formState={formState}
          formAction={formAction}
          isPending={isPending || isQuestionRemoving}
          submitBtnText="Edit Question"
        />
      </div>
    </>
  );
};
