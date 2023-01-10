const removeContent = () => {
  const container = document.querySelector('#app');
  [...container.children].forEach(child => {
    if (!(child.tagName === 'HEADER' || child.classList.contains('toast'))) {
      child.remove();
    }
  });
};

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

export { removeContent, showToastMessage };
