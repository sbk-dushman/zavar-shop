const getString = (type, userData) => {
  if (type === 1) {
    alert(`Имя: ${userData}`);
  } else if (type === 2) {
    alert(` Фамилия: ${userData}`);
  }
};
export default getString;
