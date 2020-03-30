import React, { useEffect } from "react";

function Card({title, list}) {  

  // ComponentDidMount
  useEffect(
    function() {
      console.log("Card mounted", title);
    },
    [title]
  );

  // ComponentWillUnmount
  useEffect(
    function() {
      return () => console.log('Card will unmount', title);
    },
    [title]
  );
  
  return (
    <li>{title}</li>
  );
}

export default Card;