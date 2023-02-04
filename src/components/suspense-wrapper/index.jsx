import React, { Suspense } from "react";
import DefaultCircularProgress from "components/circular-progress";
import ErrorBoundary from "components/error-boundary";

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
      <ErrorBoundary>
        <WrapperComponent {...routerProps} />
      </ErrorBoundary>
    </Suspense>
  );

export default SuspenseWrapper;
