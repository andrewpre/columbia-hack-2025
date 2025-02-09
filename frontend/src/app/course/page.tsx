import Dropdown from "@/components/dropdown"; // Now the import should work!
import UserProfile from "@/components/userprofile";
export default function Course() {
  return (
    <div className="grid grid-rows-[31fr]  sm: font-[family-name:var(--font-geist-sans)]">
      <UserProfile />
      <main className="flex flex-col mt-2 gap-1 bg-gray-100 row-start-2 items-center sm:items-start w-full">
        <Dropdown
          title="Topic 1: Alphabet Signing"
          lessons={[
            { id: 1.1, title: "Lesson 1: A B C", completed: false },
            { id: 1.2, title: "Lesson 2: D E F", completed: false },
            { id: 1.3, title: "Lesson 3: G H I", completed: false },
            { id: 1.4, title: "Lesson 4: J K L", completed: false },
            { id: 1.5, title: "Lesson 5: M N O", completed: false },
            { id: 1.6, title: "Lesson 6: P Q R", completed: false },
            { id: 1.7, title: "Lesson 7: S T U", completed: false },
            { id: 1.8, title: "Lesson 8: V W X", completed: false },
            { id: 1.9, title: "Lesson 9: Y Z", completed: false },

          ]}
        />
        <Dropdown title="Topic 2: Numbers Signing"           lessons={[
            { id: 2.1, title: "Lesson 2: 1 2 3", completed: true },
            { id: 2.2, title: "Lesson 2: 4 5 6", completed: false },
            { id: 2.3, title: "Lesson 3: 7 8 9", completed: false },
          ]}/>
        <Dropdown title="Topic 3: Colors Signing" lessons={[
            { id: 3.1, title: "Lesson 2: Red Blue Green", completed: true },
            { id: 3.2, title: "Lesson 2: Black White Purple", completed: false },
          ]}/>
        <Dropdown title="Topic 4: Common Phrases" lessons={[
            { id: 4.1, title: "Lesson 2: Yes No", completed: true },
            { id: 4.2, title: "Lesson 2: What? Where? Why?", completed: false },
          ]}/>
        <Dropdown title="Quiz: Test Your Knowledge" lessons={[{ id: 5.1, title: "Lesson 1: Basic Conversation", completed: true }]}/>
      </main>
    </div>
  );
}
