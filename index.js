const CONFIG = {
  rows: 10,
  cols: 10,
  min: -100,
  max: 100,
};

function randomInt(min, max) {
  return Math.floor(Math.random() * (max + 1 - min)) + min;
}

function generateMatrix({ rows, cols, min, max }) {
  const matrix = [];
  for (let i = 0; i < rows; i++) {
    const row = Array.from({ length: cols }, () => randomInt(min, max));
    matrix.push(row);
  }
  return matrix;
}

function findRowWithGlobalMin(matrix) {
  let minVal = matrix[0][0];
  let minRowIndexArr = [0];

  matrix.forEach((row, rowIndex) => {
    row.forEach((val) => {
      if (val < minVal) {
        minVal = val;
        minRowIndexArr = [rowIndex];
        // если несколько рядов с минимальным числом
      } else if (val === minVal && !minRowIndexArr.includes(rowIndex)) {
        minRowIndexArr.push(rowIndex);
      }
    });
  });
  return minRowIndexArr;
}

function findMinPositive(row) {
  const positives = row.filter((n) => n > 0);
  if (positives.length === 0) return null;
  return Math.min(...positives);
}

function countMinReplacements(row) {
  let replacements = 0;
  let i = 0;

  while (i < row.length - 2) {
    const a = row[i];
    const b = row[i + 1];
    const c = row[i + 2];

    const isTriplePositive = a > 0 && b > 0 && c > 0;
    const isTripleNegative = a < 0 && b < 0 && c < 0;

    if (isTriplePositive || isTripleNegative) {
      replacements++;
      i += 3;
    } else {
      i++;
    }
  }

  return replacements;
}

function printMatrix(matrix) {
  const minRowIndexArr = findRowWithGlobalMin(matrix);

  console.log('Матрица:');
  console.log('---------------------------------------------------------');

  matrix.forEach((row, index) => {
    const minPositive = findMinPositive(row);
    const replacements = countMinReplacements(row);
    const label = minRowIndexArr.includes(index) ? '*' : ' ';
    const rowStr = row.map((n) => n.toString().padStart(4)).join(' ');

    console.log(
      `${label} [${index}] ${rowStr} | Мин. положит.: ${
        minPositive ?? 'Нет положительных чисел'
      } | Замен: ${replacements}`
    );
  });

  console.log('---------------------------------------------------------');
}

const matrix = generateMatrix(CONFIG);
printMatrix(matrix);
