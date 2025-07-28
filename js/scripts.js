document.addEventListener('DOMContentLoaded', () => {
    const userId = localStorage.getItem('userId') || '100';
    const API_BASE_URL = 'http://localhost:8000';
    const ORDER_API_URL = 'http://localhost:8001';
    const API_KEY = 'wymi-secret-key';
    const FRONTEND_BASE_URL = 'http://localhost:3000';

    const products = [
        { product_id: 1, category: 'Rings', material: 'Gold-Plated', price: 436, image: 'https://rubans.in/cdn/shop/files/rubans-18k-gold-plated-bow-design-adjustable-ring-with-cubic-zirconia-stones-for-women-finger-ring-1165374885.jpg?v=1750329619&width=1080' },
        { product_id: 2, category: 'Rings', material: 'Silver-Plated', price: 75, image: 'https://rubans.in/cdn/shop/files/rubans-18k-gold-plated-snake-design-cubic-zirconia-studded-adjustable-ring-ring-38034176245934.jpg?v=1750331877&width=1080' },
        { product_id: 3, category: 'Earrings', material: 'Pearl Imitation', price: 416, image: 'https://rubans.in/cdn/shop/files/rubans-24k-gold-plated-ruby-pink-kundan-green-beaded-handcrafted-shoulder-duster-earring-earrings-1144223644.jpg?v=1750329963&width=1080' },
        { product_id: 4, category: 'Earrings', material: 'American Diamond', price: 351, image: 'http://rubans.in/cdn/shop/files/rubans-18k-gold-plated-cubic-zirconia-studded-heart-shape-hoop-earrings-earrings-1165374890.jpg?v=1750331706&width=900' },
        { product_id: 5, category: 'Necklace', material: 'Silver-Plated', price: 287, image: 'https://rubans.in/cdn/shop/files/rubans-24k-gold-plated-cz-studded-temple-motif-designed-jewellery-set-necklace-set-33839911272622.jpg?v=1750340467&width=1080' },
        { product_id: 6, category: 'Necklace', material: 'Gold-Plated', price: 185, image: 'https://rubans.in/cdn/shop/files/rubans-22k-gold-plated-ruby-stone-golden-beads-handcrafted-necklace-set-with-floral-medallions-necklaces-necklace-chain-37559070687406.jpg?v=1750332614&width=1080' },
        { product_id: 7, category: 'Bangles', material: 'Oxidized', price: 210, image: 'https://rubans.in/cdn/shop/files/rubans-rhodium-plated-multicolor-cubic-zirconia-studded-premium-bangles-bangles-bracelets-1127509958.jpg?v=1750331326&width=1080' },
        { product_id: 8, category: 'Bangles', material: 'Gold-Tone', price: 179, image: 'https://rubans.in/cdn/shop/files/rubans-set-of-2-22k-gold-plated-handcrafted-traditional-bridal-bangles-with-multicolor-enamel-work-bangles-1143857578.jpg?v=1750331744&width=1080' },
        { product_id: 9, category: 'Bracelets', material: 'Pearl Imitation', price: 273, image: 'https://rubans.in/cdn/shop/products/tokyo-talkies-x-rubans-modern-center-stone-stackable-bracelets-bangles-bracelets-33662599200942.jpg?v=1750340373&width=1080' },
        { product_id: 10, category: 'Bracelets', material: 'Silver-Plated', price: 482, image: 'https://rubans.in/cdn/shop/files/roadster-18k-gold-rhodium-plated-stainless-steel-link-chain-necklace-for-men-chain-necklace-1168575210.jpg?v=1750329487&width=1080' },
        { product_id: 11, category: 'Anklets', material: 'Oxidized Silver', price: 132, image: 'https://rubans.in/cdn/shop/products/rubans-24k-gold-plated-handcrafted-ruby-with-paisley-shape-anklet-set-28348350922926.jpg?v=1678369704&width=1800' },
        { product_id: 12, category: 'Anklets', material: 'Beaded', price: 158, image: 'https://rubans.in/cdn/shop/files/rubans-set-of-2-gold-plated-anklet-anklet-1143857724.jpg?v=1750330455&width=360' },
        { product_id: 13, category: 'Maang Tikka', material: 'Gold-Plated', price: 249, image: 'https://rubans.in/cdn/shop/files/rubans-rhodium-plated-white-cubic-zirconia-maang-tikka-maang-tikka-1143857350.jpg?v=1750330351&width=1080' },
        { product_id: 14, category: 'Maang Tikka', material: 'Kundan Style', price: 312, image: 'https://rubans.in/cdn/shop/files/rubans-rhodium-plated-cubic-zirconia-maang-tikka-maang-tikka-1143857375.jpg?v=1750330357&width=1080' },
        { product_id: 15, category: 'Nose Pins', material: 'Stone-Studded', price: 110, image: 'https://rubans.in/cdn/shop/products/rubans-silver-plated-handcrafted-zircon-stone-nose-clip-nosepin-23370023370926.jpg?v=1628458865&width=360' },
        { product_id: 16, category: 'Nose Pins', material: 'Gold-Plated', price: 99, image: 'https://rubans.in/cdn/shop/files/rubans-rose-gold-plated-handcrafted-zircon-stone-nose-clip-accessories-35074289238190.jpg?v=1701840871&width=1080' },
        { product_id: 17, category: 'Waist Chains', material: 'Pearl Chain', price: 390, image: 'https://rubans.in/cdn/shop/files/rubans-18k-gold-plated-kundan-pearl-beaded-waist-chain-saree-accessories-saree-accessories-1143859006.jpg?v=1750330739&width=360' },
        { product_id: 18, category: 'Waist Chains', material: 'Gold-Plated', price: 450, image: 'https://rubans.in/cdn/shop/files/rubans-22k-gold-plated-pearl-beaded-handcrafted-traditional-kamarbandh-saree-accessories-1143859037.jpg?v=1750330745&width=1080' },
        { product_id: 19, category: 'Brooches', material: 'American Diamond', price: 220, image: 'https://cdn.shopify.com/s/files/1/2015/7815/files/rubans-gold-plated-red-green-stone-studded-temple-jewellery-set-necklace-set-33613007782062_480x480.webp?v=1713591155' },
        { product_id: 20, category: 'Brooches', material: 'Gold-Tone', price: 180, image: 'https://cdn.shopify.com/s/files/1/2015/7815/files/rubans-24k-gold-plated-temple-necklace-set-with-goddess-motifs-jewelry-sets-32112588062894_480x480.jpg?v=1713591233' }
    ];

    async function logActivity(productId, activityType) {
        try {
            const response = await fetch(`${API_BASE_URL}/log_activity`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-API-Key': API_KEY
                },
                body: JSON.stringify({
                    user_id: userId,
                    product_id: productId,
                    activity_type: activityType
                })
            });
            if (!response.ok) throw new Error(`Failed to log ${activityType}: ${response.status}`);
            console.log(`Logged ${activityType} for product ${productId}`);
        } catch (error) {
            console.error('Error logging activity:', error);
        }
    }

    async function getRecommendations() {
        try {
            const response = await fetch(`${API_BASE_URL}/recommend/${userId}`, {
                headers: { 'X-API-Key': API_KEY }
            });
            if (!response.ok) throw new Error(`Failed to fetch recommendations: ${response.status}`);
            const data = await response.json();
            console.log('Recommendations response:', data);
            displayResults(data, 'recommendations');
        } catch (error) {
            console.error('Error fetching recommendations:', error);
            document.getElementById('recommendations').innerHTML = `<p class="error">Error: ${error.message}</p>`;
        }
    }

    async function handleSearch() {
        const query = searchInput.value.trim();
        if (!query) {
            document.getElementById('recommendations').innerHTML = '<p class="error">Please enter a search query</p>';
            return;
        }
        try {
            const response = await fetch(`${API_BASE_URL}/search`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-API-Key': API_KEY
                },
                body: JSON.stringify({ user_id: userId, query })
            });
            if (!response.ok) throw new Error(`Failed to search: ${response.status}`);
            const data = await response.json();
            console.log('Search response:', data);
            document.getElementById('searchResults').innerHTML = ''; // Clear previous search results
            await getRecommendations(); // Fetch recommendations after search
        } catch (error) {
            console.error('Error searching:', error);
            document.getElementById('recommendations').innerHTML = `<p class="error">Error: ${error.message}</p>`;
        }
    }

    function displayResults(data, containerId) {
        const container = document.getElementById(containerId);
        if (!container) {
            console.error(`Container ${containerId} not found`);
            return;
        }
        container.innerHTML = `<h2>${containerId === 'searchResults' ? 'Search Results' : 'Recommended for You'}</h2>`;
        if (data.suggestion) {
            container.innerHTML += `<p>${data.suggestion}</p>`;
        }
        const ul = document.createElement('ul');
        ul.className = 'product-list';
        data.recommendations.forEach(rec => {
            const product = products.find(p => p.product_id === rec.product_id) || {
                image: 'https://rubans.in/cdn/shop/files/rubans-22k-gold-plated-ruby-stone-golden-beads-handcrafted-necklace-set-with-floral-medallions-necklaces-necklace-chain-37559070687406.jpg?v=1750332614&width=1080'
            };
            const li = document.createElement('li');
            li.className = 'product-card';
            li.innerHTML = `
                <img src="${product.image}" alt="${rec.category}" class="product-image">
                <h3>${rec.category} (${rec.material})</h3>
                <p>$${rec.price}</p>
                <p>Rating: ${rec.predicted_rating.toFixed(1)}</p>
                <button onclick="handleAction(${rec.product_id}, 'buy')">Buy Now</button>
                <button onclick="handleAction(${rec.product_id}, 'cart')">Add to Cart</button>
                <button onclick="handleAction(${rec.product_id}, 'wishlist')">Wishlist</button>
            `;
            li.addEventListener('click', () => {
                logActivity(rec.product_id, 'CLICK').then(() => {
                    window.location.href = `${FRONTEND_BASE_URL}/product.html?product_id=${rec.product_id}&user_id=${userId}`;
                });
            });
            ul.appendChild(li);
        });
        container.appendChild(ul);
    }

    const productList = document.getElementById('productList');
    if (productList) {
        products.forEach(product => {
            const card = document.createElement('div');
            card.className = 'product-card';
            card.innerHTML = `
                <img src="${product.image}" alt="${product.category}" class="product-image">
                <h3>${product.category} (${product.material})</h3>
                <p>$${product.price}</p>
                <button onclick="handleAction(${product.product_id}, 'buy')">Buy Now</button>
                <button onclick="handleAction(${product.product_id}, 'cart')">Add to Cart</button>
                <button onclick="handleAction(${product.product_id}, 'wishlist')">Wishlist</button>
            `;
            card.addEventListener('mouseenter', () => logActivity(product.product_id, 'VIEW'));
            card.addEventListener('click', () => {
                logActivity(product.product_id, 'CLICK').then(() => {
                    window.location.href = `${FRONTEND_BASE_URL}/product.html?product_id=${product.product_id}&user_id=${userId}`;
                });
            });
            productList.appendChild(card);
        });
    }

    window.handleAction = async (productId, action) => {
        const activityType = action === 'buy' ? 'CLICK' : 'CLICK';
        await logActivity(productId, activityType);
        if (action === 'buy') {
            try {
                const product = products.find(p => p.product_id === productId);
                const response = await fetch(`${ORDER_API_URL}/insert_order`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        user_id: userId,
                        product_id: productId,
                        price: product.price
                    })
                });
                if (!response.ok) throw new Error(`Failed to purchase: ${response.status}`);
                console.log(`Purchased product ${productId}`);
                alert('Purchase successful!');
            } catch (error) {
                console.error('Error purchasing:', error);
                alert(`Purchase failed: ${error.message}`);
            }
        }
        await getRecommendations();
    };

    const searchButton = document.getElementById('searchButton');
    const searchInput = document.getElementById('searchInput');
    if (searchButton && searchInput) {
        searchButton.addEventListener('click', handleSearch);
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') handleSearch();
        });
    }

    document.getElementById('logoutButton')?.addEventListener('click', () => {
        localStorage.removeItem('userId');
        console.log('Logged out, redirecting to login');
        window.location.href = `${FRONTEND_BASE_URL}/login.html`;
    });

    logActivity(null, 'VIEW');
});