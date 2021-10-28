import { NextPage } from "next";
import { useRouter } from "next/router";

// With Edge Functions this component gets rendered
const Country: NextPage = () => {
  const router = useRouter();
  const { country } = router.query;

  return (
    <div>
      <h1>Welcome to /edge/{country}</h1>
    </div>
  );
};

export default Country;
