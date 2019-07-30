import _ from 'lodash';
import { extractFormValues } from '../utils';

const inputTpl = `
<div class="input-dialog__item">
    <label class="input-dialog__label" for="<%= inputId %>"><%= label %></label>
    <input class="input-dialog__input" id="<%= inputId %>" type="<%= type %>" <%= required ? 'required' : '' %> />
</div>
`;

const inputDialogTpl = `
<form class="input-dialog" id="<%= formId %>">
    <% _.forEach(inputsHtml, (input) => { %>
        <%= input %>
    <% }); %>
    <button class="input-dialog__submit" type="submit">Enter</button>
</form>`;

export default async function inputDialog(properties) {
  const inputFn = _.template(inputTpl);
  const inputDialogFn = _.template(inputDialogTpl);
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
