import cls from './QuestionForm.module.css';
import { Button } from '../../../components/Button';

export const QuestionForm = ({ formAction, isPending, formState, submitBtnText }) => {

  return (
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

      <Button isDisabled={isPending}>{submitBtnText}</Button>
    </form>
  );
};
