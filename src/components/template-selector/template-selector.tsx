import { FC } from "react";

import { TemplateItem } from "../template-item/template-item";

export const TemplateSelector: FC = () => {
  return (
    <div className="grid w-full grid-cols-2 grid-rows-2 gap-4 p-2 sm:grid-cols-3 md:grid-cols-6">
      <TemplateItem
        variant="poster"
        src="/assets/img/templates/poster.png"
        name="Poster"
      />
      <TemplateItem
        variant="banner"
        src="/assets/img/templates/INSIGHTS.png"
        name="Banner"
      />
      <TemplateItem
        variant="banner"
        src="/assets/img/templates/INSIGHTS.png"
        name="Banner"
      />
      <TemplateItem
        variant="banner"
        src="/assets/img/templates/INSIGHTS.png"
        name="Banner"
      />
    </div>
  );
};
