import React, { Fragment } from "react";

const HeaderLogo = ({ image, title }) => {
  return (
    <Fragment key="logo">
      <img className="h-16" src={image} alt="fundky logo" />
      <div className="h-16 text-white flex items-center text-xl font-sans font-black">
        {title}
      </div>
    </Fragment>
  );
};

export default HeaderLogo;
