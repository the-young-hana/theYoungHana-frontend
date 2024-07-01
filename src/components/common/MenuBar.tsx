import { FC, useEffect, useState } from "react";
import cn from "../../utils/cn";
import { useNavigate } from "react-router-dom";

interface IProps {
  menu1: string;
  menu2: string;
  path1?: string;
  path2?: string;
}

export const MenuBar: FC<IProps> = ({ menu1, menu2, path1, path2 }) => {
  const navigate = useNavigate();

  const [isSelected, setIsSelected] = useState(true);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { name } = e.currentTarget;

    if (name === "menu1") {
      setIsSelected(true);
      navigate(path1!);
    }
    if (name === "menu2") {
      setIsSelected(false);
      navigate(path2!);
    }
  };

  useEffect(() => {
    if (window.location.href.includes("stories")) {
      setIsSelected(true);
    } else {
      setIsSelected(false);
    }
  });

  return (
    <div className="flex w-full justify-around pt-2 bg-hanaBgGray border-b border-hanaGray2">
      <button
        name="menu1"
        type="button"
        className={cn(
          isSelected
            ? "font-bold border-b-[3px] text-hanaGreen border-hanaGreen"
            : "",
          "cursor-pointer",
        )}
        onClick={handleClick}
      >
        {menu1}
      </button>
      <button
        name="menu2"
        type="button"
        className={cn(
          !isSelected
            ? "font-bold border-b-[3px] text-hanaGreen border-hanaGreen"
            : "",
          "cursor-pointer",
        )}
        onClick={handleClick}
      >
        {menu2}
      </button>
    </div>
  );
};
