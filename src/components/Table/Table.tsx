import { Typography } from "@material-tailwind/react";

interface ITableProps {
  header: Array<string>;
  rows: Array<JSX.Element[]>;
}

export const Table = ({ header, rows }: ITableProps) => {
  return (
    <table className="w-full min-w-max table-auto text-left ">
      <thead>
        <tr>
          {header.map((head) => {
            return (
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                <Typography
                  placeholder={undefined}
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  {head}
                </Typography>
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => {
          return (
            <tr className="even:bg-blue-gray-50/30">
              {row.map((element) => {
                return <td className="p-2 max-w-32 break-all">{element}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
