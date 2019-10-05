import PropTypes from 'prop-types';
import Head from 'next/head';
import 'bulma/bulma.sass';

const Page = ({ children }) => (
  <>
    <Head>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
      />
      <meta
        http-equiv="X-UA-Compatible"
        content="ie=edge"
      />
    </Head>
    {children}
  </>
);

Page.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Page
