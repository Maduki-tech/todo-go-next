import axios from "axios";
import type { NextPage } from "next";
import Head from "next/head";
import { SyntheticEvent, useEffect, useState } from "react";

const Home: NextPage = () => {
  const [item, setItem] = useState([]);
  const [inp, setInp] = useState("");

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    console.log(inp);

    const fun = await axios({
      method: "post",
      url: "http://localhost:8080/add",
      params: {
        test: inp,
      },
    });

    if (fun.status == 200) {
      getData();
	  setInp('');
    }
  };

  const handleCheck = async (inp: string) => {
    const fun = await axios({
      method: "post",
      url: "http://localhost:8080/del",
      params: {
        test: inp,
      },
    });

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

        <form
          id="fmr"
          onSubmit={(event: SyntheticEvent) => handleSubmit(event)}
        >
          <input
            id="inp"
            onChange={(e) => setInp(e.target.value)}
            value={inp}
            type="text"
            placeholder="Element Hinzufügen"
            className="border p-2 rounded-sm"
          />
        </form>
      </div>
    </div>
  );
};

export default Home;
