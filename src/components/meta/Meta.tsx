import { Helmet } from "react-helmet";

interface Props {
  title: string;
}

const Meta: React.FC<Props> = ({ title }) => {
  return (
    <Helmet>
      <meta charSet="utf-8" />
      <title>Project Hub | {title}</title>
    </Helmet>
  );
};

export default Meta;
