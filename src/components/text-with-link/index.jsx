import React from "react";

const TextWithLink = ({ text }) => {
  const regex = /(https?:\/\/[^\s]+)|(\w+\.link\/\w+)/g;
  const parts = text?.split(regex);

  return (
    <>
      {parts?.map((part, i) => {
        if (part?.match(regex)) {
          const href = !part.includes("https") ? `https://${part}` : part;
          return (
            <a key={i} href={href} target="_blank" rel="noopener noreferrer">
              {part}
            </a>
          );
        }
        return part;
      })}
    </>
  );
};

export default TextWithLink;
