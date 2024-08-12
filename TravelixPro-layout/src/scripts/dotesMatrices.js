export default function script() {
  const dotesMatrices = Array.from(document.querySelectorAll('.dotes-matrix'));

  dotesMatrices.forEach((matrix) => {
    const rows = +matrix.dataset.rows;
    const columns = +matrix.dataset.columns;
    const rowGap = matrix.dataset.rowGap;
    const colGap = matrix.dataset.colGap;
    const size = matrix.dataset.size;

    if (Number.isNaN(rows) || Number.isNaN(columns)) return;

    const dotes = Array(rows * columns).fill(1).map(() => {
      const dote = document.createElement('div');
      dote.className = 'dotes-matrix__dote';
      return dote;
    });
    
    matrix.innerHTML = '';
    matrix.append(...dotes);

    matrix.style.setProperty('--rows', rows);
    matrix.style.setProperty('--columns', columns);
    matrix.style.setProperty('--rowGap', `${rowGap}px`);
    matrix.style.setProperty('--colGap', `${colGap}px`);
    matrix.style.setProperty('--size', `${size}px`);
  });
}
