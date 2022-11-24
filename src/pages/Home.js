import Form1 from "../components/FormFunctionalComponent";
import Form2 from "../components/FormClassComponent";
import Details1 from "../components/display/Details1";
import Details2 from "../components/display/Details2";

const Home = () => {
  return (
    <>
      <Form1 />
      <Details1 />

      <Form2 />
      <Details2 />
    </>
  );
};

export default Home;
