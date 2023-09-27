"use client";

import { useContext } from "react";

import { TemplateContext } from "@/context/template-context";

import { ColorItem } from "../ui/color-item";

export const ConfigForm = () => {
  const {
    primaryColor: { color },
  } = useContext(TemplateContext);

  return (
    <div className="flex gap-4 p-4">
      <ColorItem variant="primary" selected={color === "primary"} />
      <ColorItem variant="muted" selected={color === "muted"} />
      <ColorItem variant="white" selected={color === "white"} />
      {/* <ColorItem variant="gray" selected={posterBg === "gray"} /> */}
    </div>
  );
};
