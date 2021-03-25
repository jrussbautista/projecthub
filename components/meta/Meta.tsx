import React from "react";
import Head from "next/head";

interface Props {
  title: string;
}

const Meta: React.FC<Props> = ({ title }) => {
  return (
    <Head>
      <title>{title}</title>
    </Head>
  );
};

export default Meta;
