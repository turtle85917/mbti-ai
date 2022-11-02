interface Result {
  prediction: {
    className: string;
    probability: number;
  }[];
  maxPredictions: number;
}

interface MBTIDescription {
  [mbti: string]: string;
}