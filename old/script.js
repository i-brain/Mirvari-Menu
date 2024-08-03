document.addEventListener('DOMContentLoaded', () => {
    const data = [
        {
            "id": 1,
            "category": "Coffee",
            "data": [
                {
                    "id": 1,
                    "title": "Leslie",
                    "price": 2.4,
                    "image": "https://www.spoonfulofflavor.com/wp-content/uploads/2021/11/mocha-latte-recipe-500x375.jpg"
                },
                {
                    "id": 2,
                    "title": "Emma",
                    "price": 2.4,
                    "image": "https://www.spoonfulofflavor.com/wp-content/uploads/2021/11/mocha-latte-recipe-500x375.jpg"
                }
            ]
        },
        {
            "id": 2,
            "category": "Meal",
            "data": [
                {
                    "id": 1,
                    "title": "Leslie",
                    "price": 2.4,
                    "image": "https://www.spoonfulofflavor.com/wp-content/uploads/2021/11/mocha-latte-recipe-500x375.jpg"
                },
                {
                    "id": 2,
                    "title": "Emma",
                    "price": 2.4,
                    "image": "https://www.spoonfulofflavor.com/wp-content/uploads/2021/11/mocha-latte-recipe-500x375.jpg"
                }
            ]
        },
        {
            "id": 3,
            "category": "Drinks",
            "data": [
                {
                    "id": 1,
                    "title": "Leslie",
                    "price": 2.4,
                    "image": "https://www.spoonfulofflavor.com/wp-content/uploads/2021/11/mocha-latte-recipe-500x375.jpg"
                },
                {
                    "id": 2,
                    "title": "Emma",
                    "price": 2.4,
                    "image": "https://www.spoonfulofflavor.com/wp-content/uploads/2021/11/mocha-latte-recipe-500x375.jpg"
                }
            ]
        },
        {
            "id": 4,
            "category": "Other",
            "data": [
                {
                    "id": 1,
                    "title": "Leslie",
                    "price": 2.4,
                    "image": "https://www.spoonfulofflavor.com/wp-content/uploads/2021/11/mocha-latte-recipe-500x375.jpg"
                },
                {
                    "id": 2,
                    "title": "Emma",
                    "price": 2.4,
                    "image": "https://www.spoonfulofflavor.com/wp-content/uploads/2021/11/mocha-latte-recipe-500x375.jpg"
                }
            ]
        }
    ];

    const categoriesContainer = document.getElementById('categories-container');
    const categoryContent = document.getElementById('category-content');

    data.forEach((categoryData) => {
        // Create category button
        const categoryButton = document.createElement('div');
        categoryButton.classList.add('category');
        categoryButton.innerText = categoryData.category;
        categoryButton.onclick = () => scrollToCategory(`category${categoryData.id}`);
        categoriesContainer.appendChild(categoryButton);

        // Create category section
        const categorySection = document.createElement('div');
        categorySection.id = `category${categoryData.id}`;
        categorySection.classList.add('category-section');

        const categoryTitle = document.createElement('h2');
        categoryTitle.innerText = categoryData.category;
        categorySection.appendChild(categoryTitle);

        // Create items
        categoryData.data.forEach(itemData => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('item');
            itemElement.innerHTML = `
                <div class="item-details">
                    <h3>${itemData.title}</h3>
                    <p>$${itemData.price.toFixed(2)}</p>
                </div>
                <img src="${itemData.image}" alt="${itemData.title}">
            `;
            categorySection.appendChild(itemElement);
        });

        categoryContent.appendChild(categorySection);
    });
});

function scrollToCategory(categoryId) {
    const categoryElement = document.getElementById(categoryId);

    if (categoryElement) {
        const offset = 80; // Adjust this value based on the height of the fixed category list

        // Calculate the position of the category element with an offset
        const position = categoryElement.offsetTop - offset;

        // Smoothly scroll to the position
        window.scrollTo({
            top: position,
            behavior: 'smooth'
        });
    }
}

let lastScrollTop = 0;
const categoriesContainer = document.querySelector('.categories-container');

document.addEventListener('scroll', () => {
    const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (currentScrollTop > lastScrollTop) {
        // Scrolling down
        categoriesContainer.style.top = '-80px'; // Adjust based on the height of your category list
    } else {
        // Scrolling up
        categoriesContainer.style.top = '0';
    }

    lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop; // For Mobile or negative scrolling
});
