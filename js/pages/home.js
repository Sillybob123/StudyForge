// Home Page
export function render() {
    return `
        <div class="container mx-auto px-4">
            <div class="text-center py-20 animate-fade-in">
                <div class="mb-8">
                    <div class="text-6xl mb-4">📚</div>
                    <h1 class="text-5xl md:text-6xl font-extrabold text-gray-900 mb-4">
                        Study Smarter with <span class="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">StudyForge</span>
                    </h1>
                    <p class="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
                        Your powerful, self-hosted flashcard platform. Create, study, and master any subject with intelligent learning tools.
                    </p>
                </div>
                <div class="space-x-4 mb-16">
                    <button onclick="window.location.hash='/signup'" class="px-8 py-4 bg-blue-600 text-white text-xl rounded-xl hover:bg-blue-700 transition shadow-lg font-bold hover:scale-105 duration-200">
                        Get Started Free
                    </button>
                    <button onclick="window.location.hash='/login'" class="px-8 py-4 border-2 border-blue-600 text-blue-600 text-xl rounded-xl hover:bg-blue-50 transition font-bold">
                        Log In
                    </button>
                </div>

                <!-- Features -->
                <div class="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mt-20">
                    <div class="bg-white p-8 rounded-2xl shadow-xl card-hover border border-gray-100">
                        <div class="text-5xl mb-4">⚡</div>
                        <h3 class="text-2xl font-bold mb-3 text-gray-900">4 Study Modes</h3>
                        <p class="text-gray-600 leading-relaxed">Flashcards, Write, Spell, and Learn modes with intelligent repetition</p>
                    </div>
                    <div class="bg-white p-8 rounded-2xl shadow-xl card-hover border border-gray-100">
                        <div class="text-5xl mb-4">🔒</div>
                        <h3 class="text-2xl font-bold mb-3 text-gray-900">Privacy First</h3>
                        <p class="text-gray-600 leading-relaxed">Self-hosted and open-source. Your data stays yours</p>
                    </div>
                    <div class="bg-white p-8 rounded-2xl shadow-xl card-hover border border-gray-100">
                        <div class="text-5xl mb-4">💝</div>
                        <h3 class="text-2xl font-bold mb-3 text-gray-900">Free Forever</h3>
                        <p class="text-gray-600 leading-relaxed">No subscriptions, no limits, completely free</p>
                    </div>
                </div>

                <!-- CTA -->
                <div class="mt-20 gradient-primary rounded-2xl p-12 text-white max-w-4xl mx-auto">
                    <h2 class="text-3xl md:text-4xl font-bold mb-4">Ready to transform your learning?</h2>
                    <p class="text-xl mb-8 opacity-90">Join thousands of students studying smarter</p>
                    <button onclick="window.location.hash='/signup'" class="px-10 py-5 bg-white text-blue-600 rounded-xl font-bold text-lg hover:bg-blue-50 transition shadow-2xl hover:scale-105 duration-200">
                        Create Your Free Account
                    </button>
                </div>
            </div>
        </div>
    `;
}

export function init() {
    console.log('Home page initialized');
}
