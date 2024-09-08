interface LinkSharingProps {
  userData: UserData;
  layout: "layout1" | "layout2" | "layout3" | "layout4";
}

interface Link {
  id: string;
  title: string;
  url: string;
  icon: "link" | "twitter" | "instagram" | "linkedin" | "github";
}

export interface UserData {
  name: string;
  bio: string;
  profilePicture: string;
  links: Link[];
}

export interface LayoutProps {
  userData: UserData;
}
