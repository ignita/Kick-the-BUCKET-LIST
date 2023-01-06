const removeContent = () => {
  const container = document.querySelector('#app');
  [...container.children].forEach(layoutTag => {
    if (layoutTag.tagName !== 'HEADER') {
      layoutTag.remove();
    }
  });
};

export { removeContent };
