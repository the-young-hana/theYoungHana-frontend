import { useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import { MenuBar } from "../../components/common/MenuBar";
import { NavigationBar } from "../../components/common/NavigationBar";
import { TopBar } from "../../components/common/TopBar";

export const Story = () => {
  const { deptIdx } = useParams();

  return (
    <>
      <TopBar title="스토리" />
      <div className="min-h-bottom-screen mt-12 mb-[107px]">
        <MenuBar
          menu1="스토리"
          menu2="거래내역"
          // path1={`${deptIdx}/stories`}
          // path2={`${deptIdx}/transactions`}
          path1="1/stories"
          path2="1/transactions"
        />
        <Outlet />
      </div>

      <NavigationBar />
    </>
  );
};
