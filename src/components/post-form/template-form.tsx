import { useContext } from "react";

import { PosterContext } from "@/context/poster";

import { ColorItem } from "../ui/color-item";

export const TemplateForm = () => {
  const {
    posterBg: { posterBg },
  } = useContext(PosterContext);

  return (
    <div className="flex gap-4 p-4">
      <ColorItem variant="primary" selected={posterBg === "primary"} />
      <ColorItem variant="muted" selected={posterBg === "muted"} />
      {/* <ColorItem variant="white" selected={posterBg === "white"} /> */}
      {/* <ColorItem variant="gray" selected={posterBg === "gray"} /> */}
    </div>
  );
};
