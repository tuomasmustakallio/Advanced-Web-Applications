import React from "react";

function MyHOC(Component, props) {
  return (
    <div class="wrapper">
      <Component {...props} />
    </div>
  );
}

export default MyHOC;
