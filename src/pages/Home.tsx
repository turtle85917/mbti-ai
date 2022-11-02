import { useEffect, useRef, useState } from "react";
import MBTIDESCRIPTION from "../utils/descriptions";

import predict from "../utils/predict";

const Home = () => {
  const [dataUri, setDataUri] = useState<string | null>(null);
  const [result, setResult] = useState<Result | null>(null);
  const uploadRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (dataUri) {
      predict(document.querySelector("img[alt='your image']")!).then(result => {
        setResult({ ...result, prediction: result.prediction.sort((a, b) => b.probability - a.probability) });

        setTimeout(() => {
          const container = document.querySelectorAll("div.result div.container div.mbti") as NodeListOf<HTMLDivElement>;
          container.forEach(mbti => {
            const element = result.prediction.find(prediction => prediction.className === mbti.id);
            if (element) {
              const foreground = mbti.querySelector("div.gauge div.foreground") as HTMLDivElement;
              const text = foreground.querySelector("span") as HTMLSpanElement;
              const percent = element.probability * 100;

              foreground.style.width = `${percent}%`;
              text.innerText = `${percent.toFixed(2)}%`;
            }
          });
        }, 1500);
      });
    }
  }, [dataUri]);

  return (
    <>
      <section>
        <h1 className="title">&lt; 내 외모는 어떤 MBTI일까? &gt;</h1>
        <h2 className="subtitle">
          질문 많은 MBTI 테스트는 이제 없다!
          <br />
          내 얼굴을 올리고 MBTI를 판별 받아보자.
        </h2>
      </section>
      <div className="file-upload">
        {!dataUri && <div className="upload-wrap">
          <input type="file" accept="image/*" ref={uploadRef} onChange={async() => {
            if (uploadRef.current && uploadRef.current.files) {
              const file = uploadRef.current.files[0];
              if (file.type.startsWith("image/")) {
                const reader = new FileReader();

                reader.onload = async (e) => {
                  setDataUri(e.target?.result as string);
                }
                reader.readAsDataURL(file);
              }
            }
          }} />
          <div className="drag-text">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width={150}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
            </svg>
            <h3>얼굴 사진을 올려놓거나 눌러주세요.</h3>
          </div>
        </div>}
        <div className="upload-content" style={{ display: dataUri ? "block" : "none" }}>
          <img src={dataUri ?? ''} alt="your image" id="ai-image" width={150} />
          {
            result
            ? <div className="result">
              <div className="message">
                <div className="title" id={result.prediction[0].className.toLowerCase()}>
                  {result.prediction[0].className}
                  {result.prediction[0].probability === 1 && <span>(확신)</span>}
                </div>
                <span className="desc">{MBTIDESCRIPTION[result.prediction[0].className]}</span>
              </div>
              <div className="container">
                {result.prediction.slice(0, 5).map((prediction, idx) => (
                  <div className="mbti" id={prediction.className} key={idx}>
                    <span className="name">{prediction.className}</span>
                    <div className="gauge">
                      <div className="background" />
                      <div className="foreground" id={prediction.className.toLowerCase()}><span>%</span></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            : <div className="loading">
              <div className="lds-ripple"><div /><div /></div>
              <p>AI가 분석 중입니다.</p>
            </div>
          }
          <div className="addthis_inline_share_toolbox_9twg" id="share-buttons"></div>
          <div className="components">
            <button onClick={() => {
              setDataUri(null);
              setResult(null);
            }}>다른 사진으로 재시도</button>
          </div>
        </div>
      </div>
      <footer>
        <span>분석을 위해 업로드한 사진을 저장하지 않습니다.</span>
        <span><a href="https://github.com/turtle85917/mbti-ai" target="_blank">오픈소스</a>를 사용하셔도 돼요.</span>
      </footer>
    </>
  )
}

export default Home;