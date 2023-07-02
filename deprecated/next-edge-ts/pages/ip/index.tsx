import { GetServerSideProps, NextPage } from "next";

interface Props {
  address: string;
}

const Ip: NextPage<Props> = ({ address }) => {
  return (
    <div>
      <h1>Your address is: {address}</h1>
    </div>
  );
};

export default Ip;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const address = req.headers["x-real-ip"] || req.socket.remoteAddress;

  return {
    props: {
      address,
    },
  };
};
