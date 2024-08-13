export interface Link {
  id: string;
  name: string;
  url: string;
  icon: string;
}

export interface LinkData {
  [key: string]: {
    Name: string;
    Link: string;
    icon: string;
  };
}
