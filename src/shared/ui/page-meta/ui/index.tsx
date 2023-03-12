import { FC, memo } from "react";

import { APP_NAME } from "@shared/config";
import { Helmet } from "react-helmet-async";

export type Props = {
  title?: string;
  description?: string;
  image?: string;
};

const cutTags = (text = "") => text.replace(/<\/?.+?>/gi, "");

const prepareData = ({ title, description, image }: Props) => ({
  title: cutTags(title),
  description: cutTags(description).substr(0, 250),
  image,
});

const PageMeta: FC<Props> = (props: Props) => {
  const { title, description, image } = prepareData(props);

  return (
    <Helmet>
      {title ? (
        <title>
          {title} - {APP_NAME}
        </title>
      ) : (
        <title>{APP_NAME}</title>
      )}
      <meta property="og:title" content={title} />
      <meta property="twitter:title" content={title} />
      {description && (
        <>
          <meta name="description" content={description} />
          <meta property="og:description" content={description} />
          <meta property="twitter:description" content={description} />
        </>
      )}
      {image && <meta property="og:image" content={image} />}
    </Helmet>
  );
};

const memorizedPageMeta = memo(PageMeta);

export { memorizedPageMeta as PageMeta };
