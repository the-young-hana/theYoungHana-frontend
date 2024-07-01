import { Outlet } from "react-router-dom";
import { MenuBar } from "../../components/common/MenuBar";
import { NavigationBar } from "../../components/common/NavigationBar";
import { TopBar } from "../../components/common/TopBar";

export const Event = () => {
  return (
    <>
      <TopBar title="이벤트" />
      <div className="min-h-bottom-screen  mt-12 mb-[107px]">
        <MenuBar menu1="진행중" menu2="거래내역" path1="ing" path2="end" />
        <Outlet />
      </div>
      <NavigationBar />
    </>
  );
};
