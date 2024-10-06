const semesters = [
  "first",
  "second",
  "third",
  "fourth",
  "fifth",
  "sixth",
  "seventh",
  "eighth",
];

// returns true if sem is valid
const validSem = (sem) => semesters.includes(sem);

// this function will convert our semester into respective rank to query semester details from firestore
const semToRank = (sem) => {
  const index = semesters.indexOf(sem);
  let ranks = [];
  switch (index) {
    // for first to fourth semester rank will be from 1 to 4 respectively
    case 0:
    case 1:
    case 2:
    case 3:
      ranks = [index + 1];
      break;
    // for fifth to eighth semester there will be two ranks one for subjects and other for electives
    case 4:
      ranks = [5, 6];
      break;
    case 5:
      ranks = [7, 8];
      break;
    case 6:
      ranks = [9, 10];
      break;
    case 7:
      ranks = [11, 12];
      break;
    default:
      ranks = [];
  }
  return ranks;
};

export { validSem, semToRank };
