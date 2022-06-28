/* eslint-disable @typescript-eslint/no-explicit-any*/
import { memo } from "react";
import styles from "./TimestampProcessing.module.scss";

type PROPS = {
  timestamp: string;
};

const TimestampProcessing = memo((props: PROPS) => {
  const { timestamp } = props;
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const hour = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return (
    <div className={styles.container}>
      {new Date(timestamp).toDateString() === new Date().toDateString() ? (
        <>
          <span>本日</span>
          &nbsp;<span>{`${hour}:${minutes}`}</span>
        </>
      ) : (
        `${
          year === new Date().getFullYear() ? "" : `${year}.`
        }${month}.${day} ${hour}:${minutes}`
      )}
    </div>
  );
});

export default TimestampProcessing;
