import { useState } from "react";
import { BookOpen, Atom, Globe, Code, Palette, Languages, Dumbbell } from "lucide-react"; // Icon pack

const categoryIcons = {
  Languages: <Languages className="text-blue-600" />,
  Mathematics: <BookOpen className="text-green-600" />,
  Science: <Atom className="text-purple-600" />,
  "Social Studies": <Globe className="text-yellow-600" />,
  "Computer & Tech": <Code className="text-pink-600" />,
  "Creative & Co-curricular": <Palette className="text-orange-500" />,
  "Physical & Life Skills": <Dumbbell className="text-teal-600" />
};

const subjects = [
  { name: "English", category: "Languages" },
  { name: "Hindi", category: "Languages" },
  { name: "Sanskrit", category: "Languages" },
  { name: "Mathematics", category: "Mathematics" },
  { name: "Science", category: "Science" },
  { name: "EVS", category: "Science" },
  { name: "Social Science", category: "Social Studies" },
  { name: "History", category: "Social Studies" },
  { name: "Geography", category: "Social Studies" },
  { name: "Civics", category: "Social Studies" },
  { name: "Computer Basics", category: "Computer & Tech" },
  { name: "Information Technology", category: "Computer & Tech" },
  { name: "Drawing & Crafts", category: "Creative & Co-curricular" },
  { name: "Art & Culture", category: "Creative & Co-curricular" },
  { name: "Physical Education", category: "Physical & Life Skills" },
  { name: "General Knowledge", category: "Physical & Life Skills" }
];

const CoursesAndPrograms = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", ...new Set(subjects.map((subj) => subj.category))];

  const filteredSubjects =
    selectedCategory === "All"
      ? subjects
      : subjects.filter((s) => s.category === selectedCategory);

  return (
    <section className="bg-gray-50 py-16 px-4">
      <div className="max-w-6xl mx-auto text-center mb-10">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">Courses & Programs</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Discover the wide range of subjects we offer to nurture every child's potential.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 text-sm rounded-full border transition font-medium shadow-sm ${
              selectedCategory === cat
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 hover:bg-blue-50"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {filteredSubjects.map((subject, i) => (
          <div
            key={i}
            className="bg-white border rounded-xl shadow-md p-4 flex items-center gap-4 hover:shadow-lg transition duration-300 hover:scale-[1.03]"
          >
            <div className="text-2xl">{categoryIcons[subject.category]}</div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">{subject.name}</h3>
              <p className="text-sm text-gray-500">{subject.category}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CoursesAndPrograms;
