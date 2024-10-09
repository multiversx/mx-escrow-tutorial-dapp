import { AccountInfo } from "./AccountInfo";

export const Dashboard = () => {
  return (
    <div className="flex justify-center w-full">
      <div className="w-full md:w-8/12 lg:w-7/12">
        <AccountInfo />
      </div>
    </div>
  );
};
