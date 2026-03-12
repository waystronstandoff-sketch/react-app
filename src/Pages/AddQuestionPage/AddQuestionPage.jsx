import { useActionState } from 'react';
import { Button } from '../../../components/Button';
import cls from './AddQuestionPage.module.css';
import { delayFn } from '../../helpers/delayFn.js';
import { toast } from 'react-toastify';
import { API_URL } from '../../constans/index.js';
import { Loader } from '../../../components/Loader';


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
        completed: false
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
        <form action={formAction} className={cls.form}>
          <div className={cls.formControl}>
            <label htmlFor="questionField">Question:</label>
            <textarea
              name="question"
              id="questionField"
              defaultValue={formState.question}
              cols="30"
              rows="2"
              required
              placeholder="please enter a question"
            ></textarea>
          </div>

          <div className={cls.formControl}>
            <label htmlFor="answerField">Short Answer:</label>
            <textarea
              name="answer"
              id="answerField"
              defaultValue={formState.answer}
              cols="30"
              rows="2"
              required
              placeholder="please enter a short answer"
            ></textarea>
          </div>

          <div className={cls.formControl}>
            <label htmlFor="descriptionField">Description:</label>
            <textarea
              name="description"
              id="descriptionField"
              defaultValue={formState.description}
              cols="30"
              rows="5"
              required
              placeholder="please enter a full description"
            ></textarea>
          </div>

          <div className={cls.formControl}>
            <label htmlFor="resourcesField">Resources:</label>
            <textarea
              name="resources"
              id="resourcesField"
              defaultValue={formState.resources}
              cols="30"
              rows="3"
              placeholder="please enter a resources separated by commas"
            ></textarea>
          </div>

          <div className={cls.formControl}>
            <label htmlFor="levelField">Level:</label>
            <select name="level" id="levelField" defaultValue={formState.level}>
              <option disabled>Question level</option>
              <hr />
              <option value={'1'}>1 - easiest</option>
              <option value={'2'}>2 - medium</option>
              <option value={'3'}>3 - hardest</option>
            </select>
          </div>

          <label htmlFor="clearFormField" className={cls.clearFormField}>
            <input
              type="checkbox"
              id="clearFormField"
              name="clearForm"
              defaultChecked={formState.clearForm}
              className={cls.checkbox}
            />
            <span>clear form after submitting?</span>
          </label>

          <Button isDisabled={isPending}>Add question</Button>
        </form>
      </div>
    </>
  );
};

export default AddQuestionPage;