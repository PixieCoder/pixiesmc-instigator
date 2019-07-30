import { extractFormValues } from '../utils';
import inputFn from './input.tpl.html';
import inputDialogFn from './inputDialog.tpl.html';

export default async function inputDialog(properties) {
  const formId = `form-${Math.floor(Math.random() * 100)}`;
  const inputsHtml = properties.inputs.map(
      (input, i) => inputFn({...input, inputId: `${formId}-input-${i}`}));
  const inputData = {
    ...properties,
    inputsHtml,
    formId,
  };
  const inputDialogHtml = inputDialogFn(inputData);
  const mainElm = document.getElementById('main');
  mainElm.innerHTML = inputDialogHtml;

  const formElm = document.getElementById(formId);

  return new Promise((resolve, reject) => {
    formElm.addEventListener('submit', (e) => {
      e.preventDefault();
      mainElm.innerHTML = '';
      resolve(extractFormValues(e.target));
    });
  });
}
