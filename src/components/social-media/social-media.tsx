import { FC, ReactNode } from "react";
import { IconContext } from "react-icons";
import {
  BsTwitter,
  BsGithub,
  BsLinkedin,
  BsInstagram,
  BsFacebook,
} from "react-icons/bs";

import { cn } from "@/lib/utils";

type SocialMediaVariant =
  | "twitter"
  | "github"
  | "linkedin"
  | "instagram"
  | "facebook";

type Size = "xs" | "base" | "lg" | "xl" | "2xl";

interface Props {
  variant: SocialMediaVariant;
  size?: Size;
  children: ReactNode;
}

const icons: Record<SocialMediaVariant, ReactNode> = {
  twitter: <BsTwitter />,
  github: <BsGithub />,
  linkedin: <BsLinkedin />,
  instagram: <BsInstagram />,
  facebook: <BsFacebook />,
};

const sizes: Record<Size, string> = {
  xs: "text-lg",
  base: "text-xl",
  lg: "text-2xl",
  xl: "text-3xl",
  "2xl": "text-4xl",
};

export const SocialMedia: FC<Props> = ({
  variant,
  size = "base",
  children,
}) => {
  return (
    <IconContext.Provider value={{ color: "white" }}>
      <span
        className={cn(
          "flex flex-row items-center gap-1 whitespace-nowrap text-white",
          sizes[size],
        )}
      >
        {icons[variant]}
        <p>{children}</p>
      </span>
    </IconContext.Provider>
  );
};
