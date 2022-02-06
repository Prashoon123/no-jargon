import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [text, setText] = useState("");
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();

    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: text }),
    });
    const data = await response.json();
    setResult(data.result);
    setText("");
  }

  return (
    <div>
      <Head>
        <title>No Jargon</title>
        <link rel="icon" href="/text.png" />
      </Head>

      <main className={styles.main}>
        <img src="/text.png" className={styles.icon} />
        <h3>Make complicated text easy to understand!</h3>
        <form onSubmit={onSubmit}>
          <textarea
            name="text"
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter complicated text(75 words max)"
            required={true}
          ></textarea>

          <input
            type="submit"
            value="Simplify text"
            disabled={!text || text[0] === " "}
          />
        </form>

        <div className={styles.result}>{result}</div>
      </main>
    </div>
  );
}
