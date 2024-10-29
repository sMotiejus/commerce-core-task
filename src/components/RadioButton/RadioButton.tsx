import "components/RadioButton/RadioButton.css";

interface RadioButtonInterface {
  name: string;
  value: string;
  checked: boolean;
  onCheck: (value: string) => void;
}

const RadioButton = ({
  name,
  value,
  checked,
  onCheck,
}: RadioButtonInterface) => {
  return (
    <label className="credit-card-radio flex align-items">
      <input
        className="accent-[#3362AB] w-[20px] h-[20px]"
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={(e) => onCheck(e.currentTarget.value)}
      />
      <span className="radio-mark"></span>
    </label>
  );
};

export default RadioButton;
