import Dropdown from "@/components/dropdown"; // Now the import should work!

export default function Course() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-1 row-start-2 items-center sm:items-start w-full">
        <Dropdown
          title="Topic 1: Alphabet Signing"
          lessons={[
            { id: 1, title: "Lesson 1: A B C", completed: true },
            { id: 2, title: "Lesson 2: D E F", completed: false },
            { id: 3, title: "Lesson 3: G H I", completed: false },
            { id: 4, title: "Lesson 4: J K L", completed: false },
            { id: 5, title: "Lesson 5: M N O", completed: false },
            { id: 6, title: "Lesson 6: P Q R", completed: false },
            { id: 7, title: "Lesson 7: S T U", completed: false },
            { id: 8, title: "Lesson 8: V W X", completed: false },
            { id: 9, title: "Lesson 9: Y Z", completed: false },

          ]}
        />
        <Dropdown title="Topic 2: Numbers Signing" />
        <Dropdown title="Topic 3: Colors Signing" />
        <Dropdown title="Topic 4: Common Phrases" />
        <Dropdown title="Quiz: Test Your Knowledge" />
      </main>
    </div>
  );
}
