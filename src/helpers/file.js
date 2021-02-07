export const readFile = file => {
  const fr = new FileReader();
  return new Promise((resolve, reject) => {
    fr.onload = e => {
      resolve(e.target.result);
    };
    fr.onabort = e => {
      reject(e);
    };
    fr.onerror = e => {
      reject(e);
    };
    fr.readAsText(file);
  });
};

export const downloadFile = payload => {
  const { data, fileName, fileType } = payload;
  const blob = new Blob([data], {
    type: `application/${fileType}`,
  });

  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.download = `${fileName}.${fileType}`;
  link.click();
};
