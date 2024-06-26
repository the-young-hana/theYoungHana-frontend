import { useState } from "react";
import { MenuBar } from "../../components/common/MenuBar";
import { NavigationBar } from "../../components/common/NavigationBar";
import { TopBar } from "../../components/common/TopBar";
import Stories from "../../components/story/Stories";
import Transactions from "../../components/story/Transactions";

export const Story = () => {
  const [isStoryClicked, setIsStoryClicked] = useState(true);
  return (
    <section>
      <TopBar title="스토리" />
      <MenuBar
        menu1="스토리"
        menu2="거래내역"
        one={isStoryClicked}
        setOne={setIsStoryClicked}
      />
      {isStoryClicked ? <Stories /> : <Transactions />}
      <NavigationBar />
    </section>
  );
};
