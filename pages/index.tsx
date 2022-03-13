import axios from "axios";
import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";

const Home: NextPage = () => {
  const [item, setItem] = useState([]);

  const handleCheck = async (inp: string) => {
    const fun = await axios({
      method: "post",
      url: "http://localhost:8080/del",
      params: {
        test: inp,
      },
    });

    console.log(fun);
    if (fun.status == 200) {
      getData();
    }
  };

  const getData = async () => {
    const res = await axios.get("http://localhost:8080/todo");
    setItem(res.data);
  };

  useEffect(() => {
    getData();

    console.log("TEST");
  }, []);

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <Head>
        <title>Create Next App</title>
      </Head>

      <div className="flex flex-col">
        {item != null ? (
          item.map((idx: any, _) => {
            return (
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id={idx.item}
                  onChange={() => handleCheck(idx.item)}
                />
                <label htmlFor={idx.item}>{idx.item}</label>
              </div>
            );
          })
        ) : (
          <h1>Keine Elemente Vorhanden</h1>
        )}
      </div>
    </div>
  );
};

export default Home;
