import { endSectionStyle } from "../styles";
import { people } from "../assets";
import Image from "next/image";

export const EndSection: React.FC = () => {
  return (
    <section className={endSectionStyle.endSection}>
      <div className={endSectionStyle.info}>
        <p className={endSectionStyle.oneLiner}>The Story Ahead</p>
        <p className={endSectionStyle.description}>
          Vittae envisions becoming the go-to platform for individuals seeking
          financial wellness and stability. Our goal is to empower millions of
          Indians world over, to take control of their financial lives and help
          them achieve their dreams and aspirations.
        </p>
      </div>
      <Image
        className={endSectionStyle.peopleImage}
        src={people}
        alt="people"
      />
    </section>
  );
};
export default EndSection;
