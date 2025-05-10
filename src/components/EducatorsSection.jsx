const TeacherCard = ({ image, name, role }) => (
  <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-6 text-center border border-gray-100">
    <div className="w-28 h-28 mx-auto mb-4 rounded-full border-4 border-blue-600 overflow-hidden shadow-sm">
      <img src={image} alt={name} className="w-full h-full object-cover" />
    </div>
    <h3 className="text-xl font-semibold text-gray-800">{name}</h3>
    <p className="text-blue-500 font-medium">{role}</p>
  </div>
);

const EducatorsSection = () => {
  const teachers = [
    {
      image: "/images/alok.jpg",
      name: "Alok Ratn",
      role: "Managing Director",
    },
    {
      image: "/images/sohel.jpg",
      name: "Shohel Akhtar",
      role: "Principal",
    },
    {
      image: "/images/rajesh.jpg",
      name: "Rajesh Ranjan",
      role: "Teacher",
    },
    {
      image: "/images/rajesh.jpg",
      name: "Rajesh Ranjan",
      role: "Teacher",
    },
    {
      image: "/images/rajesh.jpg",
      name: "Rajesh Ranjan",
      role: "Teacher",
    },
  ];

  return (
    <section className="bg-gray-50 py-14 px-4">
      <div className="max-w-6xl mx-auto text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
          Meet Our Educators
          <span className="ml-3 text-sm font-normal text-blue-500 hover:underline cursor-pointer">
            View All
          </span>
        </h2>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 max-w-6xl mx-auto">
        {teachers.map((t, index) => (
          <TeacherCard key={index} {...t} />
        ))}
      </div>
    </section>
  );
};

export default EducatorsSection;
