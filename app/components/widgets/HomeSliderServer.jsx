import HomeSlider from "./HomeSlider";
import { getAllSlidersFrontendAction } from "@/actions/admin/Slider";

const HomeSliderServer = async () => {
  const sliderData = await getAllSlidersFrontendAction();

  return (
    <>
      <HomeSlider data={sliderData} />
    </>
  );
};

export default HomeSliderServer;
