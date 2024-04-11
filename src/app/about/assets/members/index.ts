import { StaticImport } from "next/dist/shared/lib/get-img-props";

interface Images {
  [key: string]: StaticImport;
}

export const members: Images = {
  Deekay: require("./Deekay.png").default,
  Krithika: require("./Krithika.png").default,
  Narayanan: require("./Narayanan.png").default,
  Taarikaa: require("./Taarikaa.png").default,
  Sam: require("./Sam.png").default,
};

export default members;
