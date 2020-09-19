import markdown from './markdown';

export default function (el, binding) {
  const { value = '' } = binding;
  
  if (value) {
    el.innerHTML = markdown.render(value);
  }
}