// type BgType = "linear-gradient(45deg, #FF6B6B, #4ECDC4)" | "bg-[#000]";

interface Background {
  type: string;
  value: string;
  opacity: number;
}

interface Links {
  bg: string;
  text: string;
  hoverBg: string;
  hoverText: string;
  rounded: string;
  border: string;
  fontSize: string;
  px: string;
  py: string;
  mx: string;
  my: string;
  shadow: string;
}

interface Text {
  titleColor: string;
  titleFontSize: string;
  descriptionColor: string;
  descriptionFontSize: string;
}

export interface Theme {
  background: Background;
  links: Links;
  text: Text;
}
