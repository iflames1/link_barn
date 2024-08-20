export const theme1 = {
  name: "Black and White",
  background: {
    type: "gradient",
    // value: "linear-gradient(45deg, #FF6B6B, #4ECDC4)",
    value: "bg-[#000]",
    opacity: 1,
  },
  links: {
    bg: "bg-white",
    text: "text-black",
    hoverBg: "hover:bg-black",
    hoverText: "hover:text-white",
    rounded: "rounded-sm",
    border: "",
    fontSize: "",
    px: "",
    py: "",
    mx: "",
    my: "",
    shadow: "",
  },
  text: {
    titleColor: "text-white",
    titleFontSize: "text-xl",
    descriptionColor: "text-[#666666]",
    descriptionFontSize: "",
  },
};

export const theme2 = {
  name: "Indigo Theme",
  background: {
    type: "color",
    value: "bg-indigo-100",
    opacity: 1,
  },
  links: {
    bg: "bg-indigo-500",
    text: "text-white",
    hoverBg: "hover:bg-indigo-600",
    hoverText: "hover:text-indigo-100",
    rounded: "rounded-lg",
    border: "border border-indigo-600",
    fontSize: "text-sm",
    px: "px-4",
    py: "py-2",
    mx: "mx-2",
    my: "my-2",
    shadow: "shadow-md",
  },
  text: {
    titleColor: "text-indigo-800",
    titleFontSize: "text-2xl",
    descriptionColor: "text-indigo-600",
    descriptionFontSize: "text-base",
  },
};
export const theme3 = {
  name: "Purple-Pink Gradient",
  background: {
    type: "gradient",
    value: "bg-gradient-to-r from-purple-500 to-pink-500",
    opacity: 1,
  },
  links: {
    bg: "bg-white",
    text: "text-purple-700",
    hoverBg: "hover:bg-purple-100",
    hoverText: "hover:text-pink-700",
    rounded: "rounded-full",
    border: "border-2 border-purple-300",
    fontSize: "text-md",
    px: "px-6",
    py: "py-3",
    mx: "mx-1",
    my: "my-3",
    shadow: "shadow-lg",
  },
  text: {
    titleColor: "text-white",
    titleFontSize: "text-3xl",
    descriptionColor: "text-purple-200",
    descriptionFontSize: "text-lg",
  },
};
export const theme4 = {
  name: "Emerald Theme",
  background: {
    type: "color",
    value: "bg-emerald-50",
    opacity: 1,
  },
  links: {
    bg: "bg-emerald-600",
    text: "text-white",
    hoverBg: "hover:bg-emerald-700",
    hoverText: "hover:text-emerald-100",
    rounded: "rounded-md",
    border: "border-b-4 border-emerald-800",
    fontSize: "text-sm",
    px: "px-5",
    py: "py-2",
    mx: "mx-0",
    my: "my-2",
    shadow: "shadow-sm",
  },
  text: {
    titleColor: "text-emerald-800",
    titleFontSize: "text-2xl",
    descriptionColor: "text-emerald-600",
    descriptionFontSize: "text-sm",
  },
};

export const themes = [theme1, theme2, theme3, theme4];
