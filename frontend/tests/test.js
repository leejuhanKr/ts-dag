function solution(m, n, startX, startY, balls) {
  for (const ball of balls) {
    console.log(minDist([startX, startY], ball, m, n));
  }
}

const minDist = (pos1, pos2, m, n) => {
  const [x1, y1] = pos1;
  const [x2, y2] = pos2;

  if (x1 === x2) {
    if (y1 < y2) {
      return ['t', 'l', 'r'].map((d) => getVp(pos1, m, n)).map((vp) => dist(...vp, ...pos2));
    } else {
      return ['b', 'l', 'r'].map((d) => getVp(pos1, m, n)).map((vp) => dist(...vp, ...pos2));
    }
  }
  if (y1 === y2) {
    if (x1 < x2) {
      return ['l', 't', 'b'].map((d) => getVp(pos1, m, n)).map((vp) => dist(...vp, ...pos2));
    } else {
      return ['r', 't', 'b'].map((d) => getVp(pos1, m, n)).map((vp) => dist(...vp, ...pos2));
    }
  }
  return ['l', 'r', 't', 'b'].map((d) => getVp(pos1, m, n)).map((vp) => dist(...vp, ...pos2));
};

const getVP = (pos, m, n, d) => {
  const [x, y] = pos;
  switch (d) {
    case 't':
      return [x, -y];
    case 'l':
      return [-x, y];
    case 'r':
      return [2m - x, y];
    case 'b':
      return [x, 2n - y];
  }
};

const dist = (x1, y1, x2, y2) => {
  return ((x2 - x1) ** 2 + (y2 - y1) ** 2) ** 0.5;
};
