"use client";
import { useState, useEffect } from "react";
import Dropdown from "@/components/dropdown"; // Now the import should work!
import UserProfile from "@/components/userprofile";
import IntroCard from "@/components/ui/introCard";
import SignA from "../../Images/Sign_A.png";
import SignB from "../../Images/Sign_B.png";
import SignC from "../../Images/Sign_C.png";
import { getUser, addUserXp } from "../reusableRoutes";
import WebcamComponent from "@/components/WebsocketComponent";
// Define types for lesson items
interface Lesson {
  id: number;
  title: string;
  completed: boolean;
  learningItems: string[]; // New property for the things being learned
}

// Define a type for the Topic structure
interface Topic {
  title: string;
  lessons: Lesson[];
}

export default function Course() {
  const [user, setUser] = useState<any>(null);
  const [guessingLetter, setGuessingLetter] = useState<any>("A");
  useEffect(() => {
    getUser().then((data) => {
      setUser(data);
    });
    // addUserXp().then((data) => {
    //   console.log(data);
    // });
  }, []);
  const [isActive, setIsActive] = useState<boolean>(false); // Type the state as boolean
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null); // Type as Lesson or null
  const [currLetter, setCurrLetter] = useState("A");
  useEffect(() => {
    // Disable scrolling when isActive is true
    if (isActive) {
      document.body.style.overflowY = "hidden"; // Hide vertical scroll
      window.scrollTo(0, 0); // Force the page to the top
    } else {
      document.body.style.overflowY = "auto"; // Enable vertical scroll
    }

    // Cleanup function to reset scroll behavior when the component is unmounted or isActive changes
    return () => {
      document.body.style.overflowY = "auto";
    };
  }, [isActive]);
  useEffect(() => {
    // console.log("CURR LETTER CHANGED", currLetter);
  }, [currLetter, setCurrLetter]);
  // Handle opening and closing the popover
  const togglePopover = () => {
    setIsActive(!isActive);
    if (isActive) {
      setCurrLetter("A");
    }
  };

  const allLessonsCompleted = (lessons: Lesson[]) => {
    return lessons.every((lesson) => lesson.completed);
  };
  // Array of Topics and Lessons
  const topics: Topic[] = [
    {
      title: "Topic 1: Alphabet Signing",
      lessons: [
        {
          id: 1.1,
          title: "Lesson 1: A B C",
          completed: false,
          learningItems: ["A", "B", "C"],
        },
        {
          id: 1.2,
          title: "Lesson 2: D E F",
          completed: false,
          learningItems: ["D", "E", "F"],
        },
        {
          id: 1.3,
          title: "Lesson 3: G H I",
          completed: false,
          learningItems: ["G", "H", "I"],
        },
        {
          id: 1.4,
          title: "Lesson 4: J K L",
          completed: false,
          learningItems: ["J", "K", "L"],
        },
        {
          id: 1.5,
          title: "Lesson 5: M N O",
          completed: false,
          learningItems: ["M", "N", "O"],
        },
        {
          id: 1.6,
          title: "Lesson 6: P Q R",
          completed: false,
          learningItems: ["P", "Q", "R"],
        },
        {
          id: 1.7,
          title: "Lesson 7: S T U",
          completed: false,
          learningItems: ["S", "T", "U"],
        },
        {
          id: 1.8,
          title: "Lesson 8: V W X",
          completed: false,
          learningItems: ["V", "W", "X"],
        },
        {
          id: 1.9,
          title: "Lesson 9: Y Z",
          completed: false,
          learningItems: ["Y", "Z"],
        },
      ],
    },
    {
      title: "Topic 2: Numbers Signing",
      lessons: [
        {
          id: 2.1,
          title: "Lesson 1: 1 2 3",
          completed: true,
          learningItems: ["1", "2", "3"],
        },
        {
          id: 2.2,
          title: "Lesson 2: 4 5 6",
          completed: false,
          learningItems: ["4", "5", "6"],
        },
        {
          id: 2.3,
          title: "Lesson 3: 7 8 9",
          completed: false,
          learningItems: ["7", "8", "9"],
        },
      ],
    },
    {
      title: "Topic 3: Colors Signing",
      lessons: [
        {
          id: 3.1,
          title: "Lesson 1: Red Blue Green",
          completed: true,
          learningItems: ["Red", "Blue", "Green"],
        },
        {
          id: 3.2,
          title: "Lesson 2: Black White Purple",
          completed: false,
          learningItems: ["Black", "White", "Purple"],
        },
      ],
    },
    {
      title: "Topic 4: Common Phrases",
      lessons: [
        {
          id: 4.1,
          title: "Lesson 1: Yes No",
          completed: true,
          learningItems: ["Yes", "No"],
        },
        {
          id: 4.2,
          title: "Lesson 2: What? Where? Why?",
          completed: false,
          learningItems: ["What?", "Where?", "Why?"],
        },
      ],
    },
    {
      title: "Quiz: Test Your Knowledge",
      lessons: [
        {
          id: 5.1,
          title: "Lesson 1: Basic Conversation",
          completed: true,
          learningItems: ["Hello", "How are you?", "Goodbye"],
        },
      ],
    },
  ];
  return (
    <div className="grid grid-rows-[31fr] sm: font-[family-name:var(--font-geist-sans)]">
      <WebcamComponent letter={currLetter} guessingLetter={setGuessingLetter} />

      {isActive && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <div
              className="bg-white p-8 w-[80%] h-[80%] rounded"
              style={{ width: "95%", height: "95%" }}
            >
              <IntroCard
                name={selectedLesson?.title}
                images={[SignA, SignB, SignC]}
                togglePopup={togglePopover}
                setCurrLetter={setCurrLetter}
                guessingLetter={guessingLetter}
              />
            </div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center z-0 bg-gray-800 bg-opacity-80 overflow-y-hidden" />
        </div>
      )}
      {user != undefined && <UserProfile user={user} />}
      <main className="flex flex-col justify-between mt-2 gap-1 bg-gray-100 row-start-2 items-center sm:items-start w-full">
        {topics.map((topic, idx) => (
          <Dropdown
            key={idx}
            setSelectedLesson={(lesson) => setSelectedLesson(lesson)}
            title={topic.title}
            lessons={topic.lessons}
            togglePopover={(e) => togglePopover(e)}
            allLessonsCompleted={allLessonsCompleted(topic.lessons)}
          />
        ))}
      </main>
      <footer className=" text-white py-8">
        <div className="max-w-screen-xl mx-auto text-center">
          <p className="text-lg">© 2025 s[AI]gn. All rights reserved.</p>
          <div className="mt-4">
            <a href="#" className="mx-4 text-blue-400 hover:text-blue-600">
              Privacy Policy
            </a>
            <a href="#" className="mx-4 text-blue-400 hover:text-blue-600">
              Terms of Service
            </a>
            <a href="#" className="mx-4 text-blue-400 hover:text-blue-600">
              Contact Us
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
