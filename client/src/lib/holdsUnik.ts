import axios from "axios";
import { toast } from "sonner";

export const holdsUnik = async (principal: string | undefined) => {
  if (!principal) {
    console.log("No principal found");
    toast.error("Failed to check if you holder UNIKING NFT", {
      richColors: true,
    });
    return false;
  }

  const url = `https://api.hiro.so/extended/v1/tokens/nft/holdings?principal=${principal}&asset_identifiers=SP3X27NM39MR9HM98D8PEWAHE420JK3X090S1382Q.unikind::unikind&limit=1&unanchored=false`;

  try {
    const response = await axios.get(url);

    if (response.data && response.data.total > 0) {
      return true;
    }

    return false;
  } catch (error) {
    console.error("Error checking Unik holdings:", error);
    return false;
  }
};