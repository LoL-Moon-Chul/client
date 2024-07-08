export const getLineImage = (line: string) => {
  switch (line) {
    case "top":
      return "/top.png";
    case "jungle":
      return "/jg.png";
    case "mid":
      return "/mid.png";
    case "bottom":
      return "/bottom.png";
    case "support":
      return "/sp.png";
    default:
      return "";
  }
};
