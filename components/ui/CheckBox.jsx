import { Check } from "lucide-react";

const CheckBox = ({ ticked = false }) => {
  return (
    <>
      <div
        className={`h-5 w-5 border flex items-center justify-center rounded-sm ${
          ticked
            ? "border-primary  bg-gradient-to-br from-primary  to-primary/30"
            : "border-primary/50"
        }`}
      >
        {ticked && <Check className="text-white" />}
      </div>
    </>
  );
};

export default CheckBox;
