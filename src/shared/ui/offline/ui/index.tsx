import { FC, ReactElement } from "react";

import { OFFLINE_TEXT } from "@shared/config";
import { hooks } from "@shared/lib";
import cn from "classnames";

import styles from "./offline.module.scss";

interface IOffline {
  className?: string;
}

const Offline: FC<IOffline> = ({ className }): ReactElement => {
  const isAppOnline = hooks.useOnlineStatus();

  return (
    <div
      className={cn(
        className,
        styles.offline,
        isAppOnline ? styles.hide : styles.show
      )}
    >
      {OFFLINE_TEXT}
    </div>
  );
};

export { Offline };
