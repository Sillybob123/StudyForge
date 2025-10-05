// Create Set Page
import { db } from '../firebase-config.js';
import { currentUser } from '../auth.js';
import { collection, addDoc, doc, setDoc } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';

export function render() {
    return `
        <div class="container mx-auto px-4 py-8 max-w-4xl animate-fade-in">
            <h1 class="text-4xl font-bold text-gray-900 mb-8">Create Study Set</h1>
            
            <form id="createSetForm" class="space-y-6">
                <div class="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                    <input type="text" id="setTitle" placeholder="Enter a title, like 'Biology - Chapter 22: Evolution'" required class="w-full text-2xl font-bold border-0 border-b-2 border-gray-200 focus:border-blue-500 outline-none mb-4 py-3">
                    <textarea id="setDescription" placeholder="Add a description (optional)" class="w-full border-0 border-b-2 border-gray-200 focus:border-blue-500 outline-none py-2 resize-none" rows="2"></textarea>
                </div>

                <div id="cardsContainer" class="space-y-4">
                    <div class="card-item bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                        <div class="flex justify-between items-center mb-4">
                            <span class="text-sm font-bold text-gray-500">CARD 1</span>
                        </div>
                        <div class="grid md:grid-cols-2 gap-4">
                            <div>
                                <label class="text-xs text-gray-500 uppercase font-semibold mb-2 block">Term</label>
                                <textarea class="card-term w-full p-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none" rows="3" required></textarea>
                            </div>
                            <div>
                                <label class="text-xs text-gray-500 uppercase font-semibold mb-2 block">Definition</label>
                                <textarea class="card-definition w-full p-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none" rows="3" required></textarea>
                            </div>
                        </div>
                    </div>
                    <div class="card-item bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                        <div class="flex justify-between items-center mb-4">
                            <span class="text-sm font-bold text-gray-500">CARD 2</span>
                        </div>
                        <div class="grid md:grid-cols-2 gap-4">
                            <div>
                                <label class="text-xs text-gray-500 uppercase font-semibold mb-2 block">Term</label>
                                <textarea class="card-term w-full p-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none" rows="3" required></textarea>
                            </div>
                            <div>
                                <label class="text-xs text-gray-500 uppercase font-semibold mb-2 block">Definition</label>
                                <textarea class="card-definition w-full p-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none" rows="3" required></textarea>
                            </div>
                        </div>
                    </div>
                </div>

                <button type="button" id="addCardBtn" class="w-full py-4 border-2 border-dashed border-gray-300 rounded-2xl text-gray-600 hover:border-blue-400 hover:text-blue-600 transition font-medium text-lg">
                    ➕ Add Card
                </button>

                <div class="flex justify-between items-center pt-4">
                    <button type="button" onclick="window.location.hash='/dashboard'" class="px-6 py-3 text-gray-600 hover:text-gray-800 transition font-medium">
                        Cancel
                    </button>
                    <button type="submit" class="px-8 py-3 button-primary text-white rounded-xl font-bold shadow-lg">
                        Create Study Set
                    </button>
                </div>
            </form>
        </div>
    `;
}

export function init() {
    if (!currentUser) {
        window.location.hash = '/login';
        return;
    }

    let cardCount = 2;
    
    document.getElementById('addCardBtn').addEventListener('click', () => {
        cardCount++;
        const container = document.getElementById('cardsContainer');
        const newCard = document.createElement('div');
        newCard.className = 'card-item bg-white p-6 rounded-2xl shadow-lg border border-gray-100 animate-fade-in';
        newCard.innerHTML = `
            <div class="flex justify-between items-center mb-4">
                <span class="text-sm font-bold text-gray-500">CARD ${cardCount}</span>
                <button type="button" class="remove-card text-red-500 hover:text-red-700 transition" title="Remove">🗑️</button>
            </div>
            <div class="grid md:grid-cols-2 gap-4">
                <div>
                    <label class="text-xs text-gray-500 uppercase font-semibold mb-2 block">Term</label>
                    <textarea class="card-term w-full p-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none" rows="3"></textarea>
                </div>
                <div>
                    <label class="text-xs text-gray-500 uppercase font-semibold mb-2 block">Definition</label>
                    <textarea class="card-definition w-full p-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none" rows="3"></textarea>
                </div>
            </div>
        `;
        container.appendChild(newCard);

        newCard.querySelector('.remove-card').addEventListener('click', () => {
            newCard.remove();
            updateCardNumbers();
        });
    });

    document.getElementById('createSetForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const title = document.getElementById('setTitle').value.trim();
        const description = document.getElementById('setDescription').value.trim();
        const terms = Array.from(document.querySelectorAll('.card-term')).map(el => el.value.trim()).filter(v => v);
        const definitions = Array.from(document.querySelectorAll('.card-definition')).map(el => el.value.trim()).filter(v => v);

        if (terms.length === 0) {
            alert('Please add at least one card with both term and definition');
            return;
        }

        try {
            const setRef = await addDoc(collection(db, 'studySets'), {
                title,
                description,
                ownerId: currentUser.uid,
                createdAt: new Date(),
                updatedAt: new Date(),
                cardCount: terms.length
            });

            for (let i = 0; i < terms.length; i++) {
                await setDoc(doc(db, 'studySets', setRef.id, 'cards', `card_${i}`), {
                    term: terms[i],
                    definition: definitions[i],
                    order: i
                });
            }

            alert('Study set created successfully!');
            window.location.hash = '/dashboard';
        } catch (error) {
            alert('Error creating set: ' + error.message);
        }
    });

    function updateCardNumbers() {
        const cards = document.querySelectorAll('.card-item');
        cards.forEach((card, index) => {
            card.querySelector('.text-sm').textContent = `CARD ${index + 1}`;
        });
        cardCount = cards.length;
    }
}
