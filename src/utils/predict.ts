import * as tf from '@tensorflow/tfjs'; // 사용안해도 임포트 필수임 (없으면 tmImage가 undefined로 바뀜)
import * as tmImage from '@teachablemachine/image';

const endpoint = "https://teachablemachine.withgoogle.com/models/zq0R8tV_r";

export default async (image: HTMLImageElement) => {
  const modelURL = `${endpoint}/model.json`;
  const metadataURL = `${endpoint}/metadata.json`;

  const model = await tmImage.load(modelURL, metadataURL);
  const maxPredictions = model.getTotalClasses();

  const prediction =  await model.predict(image, false);

  return { prediction, maxPredictions };
}