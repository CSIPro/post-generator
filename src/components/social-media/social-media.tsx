import { FC, ReactNode } from "react";
import { IconContext } from "react-icons";
import {
  BsTwitter,
  BsGithub,
  BsLinkedin,
  BsInstagram,
  BsFacebook,
} from "react-icons/bs";

type SocialMediaVariant =
  | "twitter"
  | "github"
  | "linkedin"
  | "instagram"
  | "facebook";

interface Props {
  variant: SocialMediaVariant;
  children: ReactNode;
}

const icons: Record<SocialMediaVariant, ReactNode> = {
  twitter: <BsTwitter />,
  github: <BsGithub />,
  linkedin: <BsLinkedin />,
  instagram: <BsInstagram />,
  facebook: <BsFacebook />,
};

export const SocialMedia: FC<Props> = ({ variant, children }) => {
  return (
    <IconContext.Provider value={{ color: "white" }}>
      <span className="flex flex-row items-center gap-1 text-xl text-white">
        {icons[variant]}
        <p>{children}</p>
      </span>
    </IconContext.Provider>
  );
};
