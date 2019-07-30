export function extractFormValues(form) {
  return Object.values(form).reduce((acc, item) => ([...acc, item.value]), []);
}
