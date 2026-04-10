import { useActionState } from 'react';
import cls from './AddQuestionPage.module.css';
import { delayFn } from '../../helpers/delayFn.js';
import { toast } from 'react-toastify';
import { API_URL } from '../../constans/global.constans.js';
import { Loader } from '../../../components/Loader';
import { QuestionForm } from '../QuestionForm';


const createCardAction = async (_prevState, formData) => {
  try {
    await delayFn();

    const newQuestion = Object.fromEntries(formData);
    const newResources = newQuestion.resources.trim();
    const isClearForm = newQuestion.clearForm;

    const response = await fetch(`${API_URL}/react`, {
      method: 'POST',
      body: JSON.stringify({
        question: newQuestion.question,
        answer: newQuestion.answer,
        description: newQuestion.description,
        resources: newResources.length ? newResources.split(',') : [],
        level: Number(newQuestion.level),
        completed: false,
        editDate: undefined
      })
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const question = await response.json();
    toast.success('New question is successfully created!');

    return isClearForm ? {} : question;
  } catch (error) {
    toast.error(error.message);
    return {};
  }
};

const AddQuestionPage = () => {

  const [formState, formAction, isPending] = useActionState(createCardAction, { clearForm: true });
  return (
    <>
      {isPending && <Loader />}

      <h1 className={cls.formTitle}>Add new question</h1>

      <div className={cls.formContainer}>
        <QuestionForm formState={formState} formAction={formAction} isPending={isPending} submitBtnText="Add Question" />
      </div>
    </>
  );
};

export default AddQuestionPage;