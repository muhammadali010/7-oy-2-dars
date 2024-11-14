import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';

interface FormData {
  logoUrl: string;
  companyName: string;
  isNew: boolean;
  isFeatured: boolean;
  position: string;
  time: string;
  jobType: string;
  location: string;
  skills: string[];
}

const App: React.FC = () => {
  const [form, setForm] = useState<FormData>({
    logoUrl: '',
    companyName: '',
    isNew: false,
    isFeatured: false,
    position: '',
    time: '',
    jobType: '',
    location: '',
    skills: [],
  });

  const [cards, setCards] = useState<FormData[]>([]);

  useEffect(() => {
    const storedCards = localStorage.getItem('cards');
    if (storedCards) {
      setCards(JSON.parse(storedCards));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cards', JSON.stringify(cards));
  }, [cards]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      setForm({ ...form, [name]: value});
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSkillsChange = (skill: string) => {
    setForm((prev) => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter((s) => s !== skill)
        : [...prev.skills, skill],
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setCards([...cards, form]);
    setForm({
      logoUrl: '',
      companyName: '',
      isNew: false,
      isFeatured: false,
      position: '',
      time: '',
      jobType: '',
      location: '',
      skills: [],
    });
  };

  const deleteCard = (index: number) => {
    const updatedCards = cards.filter((_, i) => i !== index);
    setCards(updatedCards);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Vakansiya ma'lumotlarini kiriting</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Logotip URL</label>
            <input
              type="text"
              name="logoUrl"
              value={form.logoUrl}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              placeholder="Logotip URL manzilini kiriting"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Kompaniya nomi</label>
            <input
              type="text"
              name="companyName"
              value={form.companyName}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              placeholder="Kompaniya nomi"
            />
          </div>
          <div className="mb-4 flex items-center space-x-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="isNew"
                checked={form.isNew}
                onChange={handleChange}
                className="mr-2"
              />
              Yangi
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                name="isFeatured"
                checked={form.isFeatured}
                onChange={handleChange}
                className="mr-2"
              />
              Featured
            </label>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Lavozim</label>
            <input
              type="text"
              name="position"
              value={form.position}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              placeholder="Fullstack Developer"
            />
          </div>
          <div className="mb-4 flex space-x-2">
            <select
              name="time"
              value={form.time}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            >
              <option>Vaqt</option>
              <option>Full Time</option>
              <option>Part Time</option>
            </select>
            <select
              name="jobType"
              value={form.jobType}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            >
              <option>Ish turi</option>
              <option>Remote</option>
              <option>On-site</option>
            </select>
            <select
              name="location"
              value={form.location}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            >
              <option>Joylashuv</option>
              <option>USA</option>
              <option>UK</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Ko'nikmalar</label>
            <div className="flex space-x-4">
              {['Fullstack', 'Python', 'Midweight', 'React'].map((skill) => (
                <label key={skill} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={form.skills.includes(skill)}
                    onChange={() => handleSkillsChange(skill)}
                    className="mr-2"
                  />
                  {skill}
                </label>
              ))}
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded hover:bg-blue-600"
          >
            Saqlash
          </button>
        </form>
      </div>

      <div className="mt-8 space-y-4">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`bg-white p-4 rounded shadow-lg border-l-4 ${
              card.isFeatured ? 'border-blue-500' : 'border-transparent'
            } w-full`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                {card.logoUrl && (
                  <img src={card.logoUrl} alt="Company logo" className="w-12 h-12 rounded-full" />
                )}
                <div>
                  <h3 className="text-xl font-semibold">{card.companyName}</h3>
                  <p className="text-gray-500">{card.position}</p>
                </div>
              </div>
              <button
                onClick={() => deleteCard(index)}
                className="text-red-500 hover:text-red-700 font-semibold"
              >
                O'chirish
              </button>
            </div>
            <div className="flex flex-wrap mt-4 space-x-2">
              {card.isNew && <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs">New</span>}
              {card.isFeatured && <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs">Featured</span>}
              <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs">{card.time}</span>
              <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs">{card.jobType}</span>
              <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs">{card.location}</span>
              {card.skills.map((skill, i) => (
                <span key={i} className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
