type Props = {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (newValue: number) => void;
};

export default function SliderInput({ label, value, min, max, step, onChange }: Props) {
  return (
    <div className="w-full my-4">
      <label className="block mb-2 text-lg font-medium">
        {label}: <span className="text-coralStart">{value.toFixed(2)}</span>
      </label>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full accent-coralStart"
      />
    </div>
  );
}
