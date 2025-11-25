import { useState } from "react";

type Props = {
    track_name: string,
    artist: string,
    similarity: number,
    onRestart: () => void;
}

export default function ResultScreen({ track_name, artist, similarity, onRestart }: Props) {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-bgLight text-textMain">
            <p className="text-10xl mb-10 py-15"> Your very own recommendation is here!</p>

            <div className="bg-white rounded-2xl shadow-md p-8 mb-20 max-w-sm w-full">
                <p className="text-4xl mb-2 font-bold text-coralStart">{track_name}</p>
                <p className="text-lg text-gray-700 mb-2">by {artist}</p>
                <p className="text-md text-gray-500">similarity: {similarity}</p>
            </div>

            <button 
                onClick={onRestart}
                className="bg-gradient-to-r from-coralStart to-coralEnd text-white px-10 py-3 rounded-full shadow-md font-medium tracking-wide hover:scale-105 transition-transform duration-300"
            >
                Try again
            </button>
        </div>
    )
}
