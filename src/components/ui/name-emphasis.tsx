import { FC, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export const FullNameEmphasis: FC<Props> = ({ children }) => {
  return (
    <span className="flex flex-row gap-2 text-5xl">
      <h1>CSI PRO</h1>
      <NameEmphasis>{children}</NameEmphasis>
    </span>
  );
};

export const NameEmphasis: FC<Props> = ({ children }) => {
  return (
    <h1 className="text-primary bg-white px-2 font-bold uppercase tracking-wider">
      {children}
    </h1>
  );
};
