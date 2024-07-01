import { useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import { MenuBar } from "../../components/common/MenuBar";
import { NavigationBar } from "../../components/common/NavigationBar";
import { TopBar } from "../../components/common/TopBar";

export const Story = () => {
  const { deptIdx } = useParams();

  return (
    <section>
      <TopBar title="스토리" />
      <MenuBar
        menu1="스토리"
        menu2="거래내역"
        // path1={`${deptIdx}/stories`}
        // path2={`${deptIdx}/transactions`}
        path1="1/stories"
        path2="1/transactions"
      />
      <Outlet />
      <NavigationBar />
    </section>
  );
};
