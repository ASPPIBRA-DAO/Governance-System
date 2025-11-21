
import React, { Suspense } from "react";

// A importação lazy garante que o componente só seja carregado no cliente
const ConstructionPopup = React.lazy(() => import("./ConstructionPopup"));

const ClientOnly: React.FC = () => {
  // Suspense é necessário para lidar com o tempo de carregamento do componente lazy
  // O fallback como null significa que nada será exibido enquanto o pop-up carrega
  return (
    <Suspense fallback={null}>
      <ConstructionPopup />
    </Suspense>
  );
};

export default ClientOnly;
