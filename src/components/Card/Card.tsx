import {
  CardBody,
  CardHeader,
  Typography,
  Card as TwCard,
} from "@material-tailwind/react";
import { PropsWithChildren } from "react";

interface ICardProps extends PropsWithChildren {
  title: string;
  subtitle: string;
  className?: string;
}

export const Card = ({ className, title, subtitle, children }: ICardProps) => {
  return (
    <TwCard
      placeholder={undefined}
      shadow={false}
      className={`${className} border-2`}
    >
      <CardHeader
        placeholder={undefined}
        variant="gradient"
        shadow={false}
        className="mb-4 grid h-11 place-items-center mt-0"
      >
        <Typography placeholder={undefined} variant="h6" color="gray">
          {title}
        </Typography>
        <Typography placeholder={undefined} variant="small" color="gray">
          {subtitle}
        </Typography>
      </CardHeader>
      <CardBody placeholder={undefined} className="flex flex-col gap-4">
        {children}
      </CardBody>
    </TwCard>
  );
};
