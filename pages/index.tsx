import axios from "axios";
import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";

const Home: NextPage = () => {
  const [item, setItem] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const res = await axios.get("http://localhost:8080/todo");
      setItem(res.data);
    };
    getData();
  }, []);
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <Head>
        <title>Create Next App</title>
      </Head>

      <div className="flex flex-col">
        {item.map((idx: any, e) => {
          return (
            <div className="flex items-center space-x-2">
              <input type="checkbox" id={idx.item}/>
              <label htmlFor={idx.item}>{idx.item}</label>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
