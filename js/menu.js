document.addEventListener('DOMContentLoaded', () => {
    const menuContainer = document.getElementById('menu-container');
    const loadingIndicator = document.getElementById('loading');

    // Fetch menu data from menu.json
    fetch('data/menu.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(menuData => {
            loadingIndicator.style.display = 'none'; // Hide loading indicator
            
            // Group items by category
            const menuByCategory = menuData.reduce((acc, item) => {
                (acc[item.category] = acc[item.category] || []).push(item);
                return acc;
            }, {});

            // Generate HTML for each category and its items
            for (const category in menuByCategory) {
                const categorySection = document.createElement('div');
                categorySection.className = 'col-span-full mb-8';

                const categoryTitle = document.createElement('h2');
                categoryTitle.className = 'text-3xl font-bold text-amber-800 mb-6 border-b-2 border-amber-200 pb-2';
                categoryTitle.style.fontFamily = "'Playfair Display', serif";
                categoryTitle.textContent = category;
                categorySection.appendChild(categoryTitle);

                const itemsGrid = document.createElement('div');
                itemsGrid.className = 'grid md:grid-cols-2 lg:grid-cols-3 gap-8';
                
                menuByCategory[category].forEach(item => {
                    const menuItemHTML = `
                        <div class="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
                            <img class="w-full h-48 object-cover" src="${item.imageUrl}" alt="${item.name}" onerror="this.onerror=null;this.src='https://placehold.co/400x300/f5e5d5/4a5568?text=Image+Not+Found';">
                            <div class="p-6">
                                <h3 class="font-bold text-xl mb-2 text-gray-800">${item.name}</h3>
                                <p class="text-gray-600 text-sm mb-4">${item.description}</p>
                                <div class="font-bold text-lg text-amber-700">$${item.price}</div>
                            </div>
                        </div>
                    `;
                    itemsGrid.innerHTML += menuItemHTML;
                });
                categorySection.appendChild(itemsGrid);
                menuContainer.appendChild(categorySection);
            }
        })
        .catch(error => {
            console.error('Error fetching menu data:', error);
            loadingIndicator.textContent = 'Failed to load menu. Please try again later.';
        });
});
