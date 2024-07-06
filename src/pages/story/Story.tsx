import { useState } from "react";
import { Outlet } from "react-router-dom";
import { MenuBar } from "../../components/common/MenuBar";
import { NavigationBar } from "../../components/common/NavigationBar";
import { TopBar } from "../../components/common/TopBar";
import { getCookie } from "../../utils/cookie";

export default function Story() {
  const deptIdx = getCookie("deptIdx");

  return (
    <>
      <TopBar title="스토리" path="/studentCard" />
      <div className="min-h-bottom-screen mt-12 mb-[107px]">
        <MenuBar
          menu1="스토리"
          menu2="거래내역"
          path1={`${deptIdx}/stories`}
          path2={`${deptIdx}/transactions`}
        />
        <Outlet />
      </div>

      <NavigationBar />
    </>
  );
}
