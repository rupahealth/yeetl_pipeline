import Head from "next/head";
import { useEffect } from "react";

const Page = () => {
  const togglePopup = async () => {
    const [tab] = await browser.tabs.query({
      active: true,
      currentWindow: true,
    });

    await browser.tabs.sendMessage(tab.id, { subject: "toggle-popup" });
    window.close();
  };

  useEffect(() => {
    togglePopup();
  }, []);

  return (
    <Head>
      <script
        type={"application/javascript"}
        src={"/common/utils/polyfill.util.js"}
      ></script>
      <style>{`
      body {
        margin: 0px;
      }
    `}</style>
    </Head>
  );
};

export default Page;
