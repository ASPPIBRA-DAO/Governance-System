import { useEffect, useState } from "react";
import ConstructionPopup from "./ConstructionPopup";

const ClientOnly: React.FC = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient ? <ConstructionPopup /> : null;
};

export default ClientOnly;
