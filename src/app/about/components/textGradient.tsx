import { otherStyle } from "../styles";

type Props = {
  children: string;
};
export const TextGradinet: React.FC<Props> = ({ children }) => {
  return <b className={otherStyle.textGradient}>{children}</b>;
};

export default TextGradinet;
