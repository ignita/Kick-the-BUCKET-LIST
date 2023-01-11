const showToastMessage = message => {
  const toast = document.querySelector('.toast');

  if (toast.classList.contains('show')) {
    return;
  }

  toast.innerHTML = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.toggle('show');
  }, 3000);
};

export { showToastMessage };
