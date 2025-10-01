document.addEventListener('DOMContentLoaded', () => {
    const menuContainer = document.getElementById('menu-container');
    const categoriesContainer = document.getElementById('menu-categories');
    const loader = document.getElementById('menu-loader');

    // --- Start of Edit ---
    // Check if all required elements exist before proceeding
    if (!menuContainer || !categoriesContainer || !loader) {
        console.error('CRITICAL ERROR: One or more required elements for the menu page are missing from the HTML.');
        console.error('Please ensure your HTML has elements with the following IDs: "menu-container", "menu-categories", and "menu-loader".');
        // Display an error message to the user
        const mainContainer = document.querySelector('main.container');
        if(mainContainer) {
            mainContainer.innerHTML = `<div class="text-center text-red-600 font-semibold">
                <p>Error: Could not load menu.</p>
                <p>Required page elements are missing.</p>
            </div>`;
        }
        return; // Stop execution if elements are missing
    }
    // --- End of Edit ---

    // 데이터 경로
    const menuDataUrl = 'data/menu.json';

    // 메뉴 데이터를 불러오고 화면에 렌더링하는 메인 함수
    async function loadMenu() {
        showLoader(true);
        try {
            const response = await fetch(menuDataUrl);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const menuData = await response.json();
            
            renderCategories(menuData.categories);
            renderMenuItems(menuData.items);
            
        } catch (error) {
            console.error("Fetching menu data failed:", error);
            showError("메뉴를 불러오는 데 실패했습니다. 잠시 후 다시 시도해주세요.");
        } finally {
            showLoader(false);
        }
    }

    // 카테고리 필터 버튼들을 렌더링하는 함수
    function renderCategories(categories) {
        // 'All' 버튼을 기본으로 추가
        const allButton = createCategoryButton('All', true); // Initially active
        categoriesContainer.appendChild(allButton);

        categories.forEach(category => {
            const button = createCategoryButton(category.name);
            categoriesContainer.appendChild(button);
        });
    }
    
    // 카테고리 버튼 생성 헬퍼 함수
    function createCategoryButton(name, isActive = false) {
        const button = document.createElement('button');
        button.textContent = name;
        button.dataset.category = name;
        button.className = `category-btn ${isActive ? 'active' : ''}`;
        button.addEventListener('click', handleCategoryClick);
        return button;
    }

    // 카테고리 클릭 이벤트 핸들러
    function handleCategoryClick(event) {
        const selectedCategory = event.target.dataset.category;

        // 모든 버튼에서 'active' 클래스 제거
        document.querySelectorAll('.category-btn').forEach(btn => btn.classList.remove('active'));
        // 클릭된 버튼에 'active' 클래스 추가
        event.target.classList.add('active');

        filterMenuItems(selectedCategory);
    }

    // 메뉴 아이템들을 필터링하고 애니메이션 효과와 함께 보여주는 함수
    function filterMenuItems(category) {
        const items = document.querySelectorAll('.menu-item-card');
        items.forEach(item => {
            // 부드러운 효과를 위해 기존 아이템 숨기기
            item.classList.add('hiding'); 
            
            setTimeout(() => {
                const itemCategory = item.dataset.category;
                const shouldShow = category === 'All' || itemCategory === category;
                
                item.classList.toggle('hidden', !shouldShow);
                
                // 다시 보여줄 때 애니메이션 효과
                if (shouldShow) {
                    item.classList.remove('hiding');
                }
            }, 300); // CSS transition 시간과 일치
        });
    }

    // 모든 메뉴 아이템들을 초기에 렌더링하는 함수
    function renderMenuItems(items) {
        menuContainer.innerHTML = ''; // 기존 메뉴 초기화
        items.forEach((item, index) => {
            const itemCard = document.createElement('div');
            itemCard.className = 'menu-item-card animate-on-scroll';
            itemCard.dataset.category = item.category;
            itemCard.style.setProperty('--delay', `${index * 50}ms`); // 순차적 애니메이션

            itemCard.innerHTML = `
                <img src="${item.imageUrl}" alt="${item.name}" class="menu-item-img" onerror="this.onerror=null;this.src='https://placehold.co/100x100/FDF0E0/4a5568?text=MAJI';">
                <div class="menu-item-details">
                    <h3 class="menu-item-name">${item.name}</h3>
                    <p class="menu-item-description">${item.description}</p>
                </div>
                <p class="menu-item-price">${item.price}</p>
            `;
            menuContainer.appendChild(itemCard);
        });
        
        // 스크롤 애니메이션 재설정 (main.js에 의존)
        if (window.setupScrollAnimations) {
            window.setupScrollAnimations();
        }
    }

    // 로딩 인디케이터 표시/숨김
    function showLoader(isLoading) {
        if (loader) {
            loader.classList.toggle('hidden', !isLoading);
        }
    }

    // 에러 메시지 표시
    function showError(message) {
        menuContainer.innerHTML = `<p class="text-center text-red-500">${message}</p>`;
    }

    // 메뉴 로딩 시작
    loadMenu();
});

// main.js의 스크롤 애니메이션 함수를 재사용할 수 있도록 전역 스코프에 노출
// (이미 main.js가 로드되었다고 가정)
window.setupScrollAnimations = () => {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    animatedElements.forEach(el => observer.observe(el));
};


