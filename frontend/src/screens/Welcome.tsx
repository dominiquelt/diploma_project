type Props = {
  onNext: () => void;
};

export default function WelcomeScreen({ onNext }: Props) {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-bgLight text-textMain">
      <p className="text-[2rem] mb-10 py-15 font-semibold text-center">Looking for a perfect song?</p>

      <button
        onClick={onNext}
        className="bg-gradient-to-r from-coralStart to-coralEnd text-2xl text-white px-16 py-6 rounded-full shadow-lg font-medium tracking-wide hover:scale-110 transition-transform duration-300"
      >
        find me.
      </button>
    </div>
  );
}
