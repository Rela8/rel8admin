import React from "react";
import { MoonLoader } from "react-spinners";
import { rel8Purple } from "../../globals";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: `${rel8Purple}`,
  'zIndex':'1033000px'
};

const Loading = ({ loading }) => {
  return (
    <div>
      <MoonLoader
        color={rel8Purple}
        loading={loading}
        cssOverride={override}
        size={50}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default Loading;
