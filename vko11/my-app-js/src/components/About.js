import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const About = () => {
  const { t } = useTranslation();

  useEffect(() => {
    let mounted = true;
    async function doStuff() {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );
      const data = await response.json();
      if (mounted) {
        setSomeStuff(data);
      }
    }
    doStuff();
    return () => (mounted = false);
  }, []);

  const [someStuff, setSomeStuff] = useState([]);

  return (
    <div>
      <h2>{t("about")}</h2>
      <ul>
        {someStuff.map((item) => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default About;
