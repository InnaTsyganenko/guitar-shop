export const showAlert = (color: string, message: string) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '1000';
  alertContainer.style.position = 'fixed';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '50px';
  alertContainer.style.left = '50px';
  alertContainer.style.padding = '30px 13px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.lineHeight = '40px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = color;
  alertContainer.style.borderRadius = '5px';
  alertContainer.style.color = 'white';
  alertContainer.textContent = message;
  document.body.append(alertContainer);
  setTimeout(() => {
    alertContainer.remove();
  }, 9000);
};
