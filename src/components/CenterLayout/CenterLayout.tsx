import { PropsWithChildren } from "react";

export const CenterLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="h-screen flex flex-col justify-center">
      <div className="flex flex-row justify-center">{children}</div>
    </div>
  );
};
