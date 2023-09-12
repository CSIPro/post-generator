import { FC, ReactNode, createContext, useState } from "react";

interface TemplateContextProps {
  template?: "poster" | "banner";
  setTemplate: (template: "poster" | "banner") => void;
}

export const TemplateContext = createContext<TemplateContextProps>({
  setTemplate: (template) => {},
});

export const TemplateProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [template, setTemplate] = useState<"poster" | "banner">();

  const value = {
    template,
    setTemplate,
  };

  return (
    <TemplateContext.Provider value={value}>
      {children}
    </TemplateContext.Provider>
  );
};
