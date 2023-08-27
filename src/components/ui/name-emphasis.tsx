import { FC, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export const FullNameEmphasis: FC<Props> = ({ children }) => {
  return (
    <span className={`flex flex-row gap-2 text-xl md:text-5xl whitespace-nowrap`}>
      <h1>CSI PRO</h1>
      <NameEmphasis>{children}</NameEmphasis>
    </span>
  );
};

export const NameEmphasis: FC<Props> = ({ children }) => {
  return (
    <h1 className="bg-white px-2 font-bold uppercase tracking-wider text-primary">
      {children}
    </h1>
  );
};
