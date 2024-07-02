import cn from "../../utils/cn";

interface LoadingProps {
  show: boolean;
  label?: string;
  back?: boolean;
}

export const Loading = ({ show, label = "", back = true }: LoadingProps) => {
  return (
    <div
      className={cn(
        "flex absolute top-0 left-0 w-iPhone h-iPhone z-30 rounded-3xl transition-opacity justify-center items-center",
        show
          ? "pointer-events-auto"
          : "pointer-events-none opacity-0 delay-500",
        back ? " backdrop-blur-sm bg-black/70" : "",
      )}
    >
      <div className="flex flex-row">
        <div className="w-3 h-3 rounded-full bg-hanaGreen animate-[bounce_1s_infinite]" />
        <div className="w-3 h-3 rounded-full bg-hanaGreen animate-[bounce_1s_infinite_100ms]" />
        <div className="w-3 h-3 rounded-full bg-hanaGreen animate-[bounce_1s_infinite_200ms]" />
      </div>
      <span className={cn(back ? "text-white" : "text-black")}>{label}</span>
    </div>
  );
};
