import React, { Suspense } from "react";
import DefaultCircularProgress from "components/circular-progress";

import "./styles.scss";

const SuspenseWrapper = (WrapperComponent) => (routerProps) =>
  (
    <Suspense
      fallback={
        <div className="fallback__container">
          <DefaultCircularProgress />
        </div>
      }
    >
      <WrapperComponent {...routerProps} />
    </Suspense>
  );

export default SuspenseWrapper;
