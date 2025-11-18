type Props = {
  onNext: () => void;
};

export default function WelcomeScreen({ onNext }: Props) {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-bgLight text-textMain">
      <p className="text-10xl mb-10 py-15">Looking for a perfect song?</p>

      <button
        onClick={onNext}
        className="bg-gradient-to-r from-coralStart to-coralEnd text-white px-10 py-3 rounded-full shadow-md font-medium tracking-wide hover:scale-105 transition-transform duration-300"
      >
        find me.
      </button>
    </div>
  );
}
