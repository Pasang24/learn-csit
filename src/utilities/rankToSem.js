const rankToSem = (rank) => {
  let sem = "";
  switch (rank) {
    case 1:
      sem = "first";
      break;
    case 2:
      sem = "second";
      break;
    case 3:
      sem = "third";
      break;
    case 4:
      sem = "fourth";
      break;
    case 5:
    case 6:
      sem = "fifth";
      break;
    case 7:
    case 8:
      sem = "sixth";
      break;
    case 9:
    case 10:
      sem = "seventh";
      break;
    case 11:
    case 12:
      sem = "eighth";
      break;
  }
  return sem;
};

export { rankToSem };
