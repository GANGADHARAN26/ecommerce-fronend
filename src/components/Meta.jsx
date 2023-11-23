import { Helmet } from "react-helmet";

const Meta = (props) => {
  return (
    <Helmet>
      <meta charSet="utf-8" />
      {/*  eslint-disable-next-line react/prop-types */}
      <title>{props.title}</title>
    </Helmet>
  );
};

export default Meta;
