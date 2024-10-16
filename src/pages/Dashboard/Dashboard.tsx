import { AccountInfo } from "./AccountInfo";
import { CreatedOffers } from "./CreatedOffers";
import { CreateOffer } from "./CreateOffer";
import { ReceivedOffers } from "./ReceivedOffers";

export const Dashboard = () => {
  return (
    <div className="flex justify-center w-full">
      <div className="w-full md:w-8/12 lg:w-7/12">
        <AccountInfo />
        <div className="mt-10"></div>
        <CreateOffer />
        <div className="mt-10"></div>
        <CreatedOffers />
        <div className="mt-10"></div>
        <ReceivedOffers />
      </div>
    </div>
  );
};
