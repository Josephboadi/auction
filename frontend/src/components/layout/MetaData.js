import React from "react";
import Helmet from "react-helmet";

const MetaData = ({ title }) => {
  return (
    <Helmet style={{ marginTop: "250px" }}>
      <title>{title}</title>
    </Helmet>
  );
};

export default MetaData;
