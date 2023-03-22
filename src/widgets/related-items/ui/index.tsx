import { PriceContent } from "@entities/price-content";
import { Card } from "@shared/ui/card";

import s from "./styles.module.scss";

export const RelatedItems = () => {
  return (
    <section className={s.root}>
      <h3 className={s.title}>Related Items</h3>
      <ul className={s.related_items__container}>
        <Card
          id={27}
          image={"https://api.lorem.space/image?w=640&h=480&r=6164"}
          title={"Wooden Aesthetic Chair"}
          subtitle={"Combination of wood and wool"}
          division={"Decoration"}
          content={<PriceContent price={58.39} />}
        />
        <Card
          id={27}
          image={"https://api.lorem.space/image?w=640&h=480&r=6164"}
          title={"Wooden Aesthetic Chair"}
          subtitle={"Combination of wood and wool"}
          division={"Decoration"}
          content={<PriceContent price={58.39} />}
        />
        <Card
          id={27}
          image={"https://api.lorem.space/image?w=640&h=480&r=6164"}
          title={"Wooden Aesthetic Chair"}
          subtitle={"Combination of wood and wool"}
          division={"Decoration"}
          content={<PriceContent price={58.39} />}
        />
        <Card
          id={27}
          image={"https://api.lorem.space/image?w=640&h=480&r=6164"}
          title={"Wooden Aesthetic Chair"}
          subtitle={"Combination of wood and wool"}
          division={"Decoration"}
          content={<PriceContent price={58.39} />}
        />
      </ul>
    </section>
  );
};
