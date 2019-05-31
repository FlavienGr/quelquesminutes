const form = document.querySelector('form');
const isAssociation = document.getElementById('isAssociation-check');

form.addEventListener('submit', e => {
  if (isAssociation.checked) {
    form.action = '/signup/associations';
  } else {
    form.action = '/signup/users';
  }
  return;
});
