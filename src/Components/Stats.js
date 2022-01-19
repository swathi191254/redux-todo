import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
export default function Stats() {
  const [data, setData] = useState();
  const [total, setTotal] = useState(0);
  const [completed, setCompleted] = useState(0);
  const [incomplete, setIncomplete] = useState([]);

  useEffect(() => {
    getTodo();
    getState();
  }, []);

  const getState = () => {
    setTotal(data?.length);
    let count = 0;
    let inc = [];
    for (let i = 0; i < total; i++) {
      if (data[i]?.status) count++;
      else inc.push(data[i]);
    }
    setCompleted(count);
    setIncomplete(inc);
  };

  async function getTodo() {
    try {
      const dat = await fetch("http://localhost:3001/todos").then((d) =>
        d.json().then((res) => setData(res))
      );
    } catch (err) {
      console.log(err);
    }
  }

  const goto = (id) => {
    window.location.href = `/get/${id}`;
  };

  return (
    <div>
      Total : {total} <br />
      Completed : {completed}
      <br />
      <>
        <br />
        <br />
        incompleted tasks
        {incomplete?.map((e) => {
          return <div onClick={() => goto(e.id)}>{e.title}</div>;
        })}
      </>
    </div>
  );
}
