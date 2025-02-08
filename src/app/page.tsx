
export default function Home() {
  return (

    <div className="w-full">

    {/* Hero Section */}
    <section className="hero bg-white text-center py-20 px-6 flex flex-col md:flex-row items-center justify-center gap-10">
      <div className="text-left max-w-lg">
        <h1 className="text-4xl font-bold">
          Learn <span className="text-blue-600">Sign Language</span> the Fun Way!
        </h1>
        <p className="text-gray-600 mt-4">
          Master sign language with AI-powered lessons and real-time feedback.
        </p>
        <button className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-full text-lg">
          Get Started
        </button>
      </div>
      {/* Placeholder for Image */}
      <div className="bg-gray-300 w-72 h-40 rounded-lg"></div>

      
    </section>

    {/* Key Features Section */}
    <section className="bg-blue-600 text-white py-16 px-6 text-center">
      <h2 className="text-3xl font-bold mb-8">Key Features</h2>
      <div className="flex flex-col md:flex-row justify-center gap-6">
        {/* Feature 1 */}
        <div className="bg-white text-black p-6 rounded-lg shadow-md w-80">
          <div className="text-2xl">🖥️</div>
          <h3 className="text-xl font-bold mt-2">Real-Time Feedback</h3>
          <p className="text-gray-600 mt-2">
            Get instant feedback on your signs using AI-powered webcam detection. Learn and improve in real-time!
          </p>
        </div>
        {/* Feature 2 */}
        <div className="bg-white text-black p-6 rounded-lg shadow-md w-80">
          <div className="text-2xl">🎮</div>
          <h3 className="text-xl font-bold mt-2">Gamified Learning</h3>
          <p className="text-gray-600 mt-2">
            Earn points, unlock badges, and level up as you master new signs. Learning has never been this fun!
          </p>
        </div>
        {/* Feature 3 */}
        <div className="bg-white text-black p-6 rounded-lg shadow-md w-80">
          <div className="text-2xl">📊</div>
          <h3 className="text-xl font-bold mt-2">Track Your Progress</h3>
          <p className="text-gray-600 mt-2">
            Monitor your growth with progress bars and stats. Set goals and celebrate every milestone!
          </p>
        </div>
      </div>
    </section>

    {/* Awards & Progress Section */}
    <section className="py-16 px-6 flex flex-col md:flex-row items-center gap-10">
      {/* Placeholder for Image */}
      <div className="bg-gray-300 w-72 h-40 rounded-lg"></div>
      <div className="text-left max-w-lg">
        <h2 className="text-3xl font-bold">
          Earn <span className="text-blue-600">Awards</span> & Celebrate Your <span className="text-blue-600">Progress</span>!
        </h2>
        <p className="text-gray-600 mt-4">
          Unlock badges, trophies, and special achievements as you advance through lessons. Whether it’s mastering your first signs or dominating challenges, every milestone comes with a reward to keep you motivated and excited to learn!
        </p>
      </div>
    </section>
  </div>




  );
}
