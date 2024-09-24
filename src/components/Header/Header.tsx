import styles from "./Header.module.scss";
import usaFlag from "assets/usaFlag.png";
import euFlag from "assets/euFlag.png";
import { useFetchHeaderData } from "hooks/useFetchHeaderData";

export const Header = () => {
  const { data } = useFetchHeaderData(["USD", "EUR"]);

  const roundToTwo = (num: number | string) => {
    if (typeof num === "number") {
      return num.toFixed(2);
    }
  };

  const usdUah = roundToTwo(data.USD?.conversion_rates["UAH"] || "N/A");
  const eurUah = roundToTwo(data.EUR?.conversion_rates["UAH"] || "N/A");
  return (
    <div className={styles.header}>
      <h1 className={styles.title}>Currency Converter</h1>
      <div className={styles.currentCoursesContainer}>
        <div className={styles.currentCourseContainer}>
          <img src={usaFlag} alt="usa flag" className={styles.flag} />
          <p className={styles.currentCourse}>{`USD/UAH: ${usdUah}`}</p>
        </div>
        <div className={styles.currentCourseContainer}>
          <img src={euFlag} alt="eu flag" className={styles.flag} />
          <p className={styles.currentCourse}>{`EUR/UAH: ${eurUah}`}</p>
        </div>
      </div>
    </div>
  );
};
