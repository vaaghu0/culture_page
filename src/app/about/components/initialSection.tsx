import TextGradinet from "./textGradient";
import { initialSectionStyle, otherStyle } from "../styles";
export const FirstSection: React.FC = () => {
  return (
    <section className={initialSectionStyle.initialSection}>
      <h2 className={initialSectionStyle.oneLiner}>
        It all started with an
        <TextGradinet> Idea</TextGradinet>
      </h2>
      <p className={initialSectionStyle.description}>
        Our journey began with a simple yet powerful idea - to redefine
        financial well-being. The core problem we set out to solve was the
        prevalent financial insecurity that millions face every day.
      </p>
    </section>
  );
};
export default FirstSection;
