import { LinkSchema } from "./links";

export interface UserProfileSchema {
  uuid: string;
  username: string;
  bio: string;
  appearance: string;
  first_name: string;
  last_name: string;
  theme: string;
  profile_picture: string;
  email: string;
  auth_type: string;
  supabase_user_id: string;
  decentralized_id: string;
  stx_address_testnet: string;
  stx_address_mainnet: string;
  btc_address_mainnet: string;
  btc_address_testnet: string;
  wallet_provider: string;
  public_key: string;
  gaia_hub_url: string;
  links: LinkSchema[];
}

export interface UserProfileSchemaPublic {
  username: string;
  bio: string;
  appearance: string;
  first_name: string;
  last_name: string;
  theme: string;
  profile_picture: string;
  email: string;
  links: LinkSchema[];
}
