import React from 'react';
import Head from 'next/head';

interface Props {
  title: string;
  description?: string;
  image?: string;
}

const Meta: React.FC<Props> = ({
  title = 'ProjectHub',
  description = 'ProjectHub is a community of developers to share & discuss the latest projects and ideas. It is a place to discover and get access to new projects.',
  image = '',
}) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name='twitter:card' content={description} />
      <meta name='twitter:site' content='@projecthub' />
      <meta name='twitter:title' content={title} />
      <meta name='twitter:description' content={description} />
      <meta name='twitter:image' content={image} />

      <meta property='og:title' content={title} />
      <meta property='og:description' content={description} />
      <meta property='og:image' content={image} />
    </Head>
  );
};

export default Meta;
