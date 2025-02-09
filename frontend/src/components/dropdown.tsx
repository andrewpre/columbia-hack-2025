"use client";

import { useState } from "react";

interface DropdownProps {
  title: string;
  lessons?: { id: number; title: string; completed: boolean }[];
}

export default function Dropdown({ title, lessons = [] }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full">
      {/* Dropdown Header */}
      <button
        className="w-full bg-[#FF5733] text-white text-xl font-semibold py-4 px-4 flex justify-between items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        {title}
        <span className={`${isOpen ? "rotate-180" : ""} transition-transform`}>
          ▼
        </span>
      </button>

      {/* Dropdown Content */}
      {isOpen && (
        <div className="bg-gray-100 ">
          {lessons.map((lesson) => (
            <div key={lesson.id} className="border border-gray-300 mb-4 mt-4 mx-auto" style={{width: "90%"}}>
            <div
              
              className="flex justify-between items-center p-4"
            >
              <span className="flex items-center gap-2">
                <span
                  className={`h-4 w-4 rounded-full ${
                    lesson.completed ? "bg-blue-500" : "bg-red-500"
                  }`}
                ></span>
                <span className="font-bold">{lesson.title}</span> {/* Bold lesson title */}

              </span>
              <button className="bg-blue-500 text-white px-6 py-1 rounded hover:bg-blue-600 transition-all">
                Begin
              </button>
            </div>
            </div>
          ))}
          
        </div>
      )}
    </div>
  );
}
