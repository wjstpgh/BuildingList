import { useEffect } from "react";

const MockSamples = () => {
  useEffect(() => {
    fetch("/buildings")
      .then((res) => res.json())
      .then(console.log);
    fetch("/building/KR0001")
      .then((res) => res.json())
      .then(console.log);
    fetch("/chart/KR0001")
      .then((res) => res.json())
      .then(console.log);
  }, []);

  return <div> (MockSample) console.log 를 확인하세요. </div>;
};

export default MockSamples;
