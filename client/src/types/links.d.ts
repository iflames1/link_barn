export interface LinkSchema {
  uuid: string;
  platform: string;
  index: number;
  link_title: string | null;
  url: string;
  user_id: string;
}

interface LinkData {
  uuid: string;
  profile_picture: string;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  stx_address_mainnet: string;
  bio: string;
  links: LinkSchema[];
}

interface UserData {
  uuid: string;
  profile_picture: string;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  stx_address_mainnet: string;
  bio: string;
  appearance: string;
  theme: string;
  links: LinkSchema[];
}
