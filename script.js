const themeToggle = document.querySelector('.theme-toggle');
const promptBtn = document.querySelector('.prompt-btn');
const promptInput = document.querySelector('.prompt-input');
const promptForm = document.querySelector('.prompt-form');
const modelSelect = document.getElementById('model-select');
const countSelect = document.getElementById('count-select');
const ratioSelect = document.getElementById('ratio-select');
const gridGallery = document.querySelector('.gallery-grid');
const API_KEY = "YOUR-API-KEY";
let baseSize = 512;
const examplePrompts = [
    "A magic forest with glowing plants and fairy homes among giant mushrooms",
    "An old steampunk airship floating through golden clouds at sunset",
    "A future Mars colony with glass domes and gardens against red mountains",
    "A dragon sleeping on gold coins in a crystal cave",
    "An underwater kingdom with merpeople and glowing coral buildings",
    "A floating island with waterfalls pouring into clouds below",
    "A witch's cottage in fall with magic herbs in the garden",
    "A robot painting in a sunny studio with art supplies around it",
    "A magical library with floating glowing books and spiral staircases",
    "A Japanese shrine during cherry blossom season with lanterns and misty mountains",
    "A cosmic beach with glowing sand and an aurora in the night sky",
    "A medieval marketplace with colorful tents and street performers",
    "A cyberpunk city with neon signs and flying cars at night",
    "A peaceful bamboo forest with a hidden ancient temple",
    "A giant turtle carrying a village on its back in the ocean",
];

// code to convert the theme of the page from light to dark and vice versa.(start)
const toggleTheme = () => {
    const isDarkTheme =document.body.classList.toggle("dark-theme");
    localStorage.setItem("theme", isDarkTheme ? "dark" : "light");
    themeToggle.querySelector("i").className = isDarkTheme ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
};
// code to convert the theme of the page from light to dark and vice versa.(end)

const getImageDimensions = (aspectRatio) => {
    const [width, height] = aspectRatio.split("/").map(Number);
    const scaleFactor = baseSize/ Math.sqrt(width * height);

    let calculatedWidth = Math.round(width * scaleFactor);
    let calculatedHeight = Math.round(height * scaleFactor);

    calculatedWidth = Math.floor(calculatedWidth / 16) * 16;
    calculatedHeight = Math.floor(calculatedHeight / 16) * 16;

    return { width: calculatedWidth, height: calculatedHeight };
};

const updateImageCard = (imgIndex, imgUrl, promptText, selectedModel, aspectRatio) => {
    const imgCard = document.getElementById(`img-card-${imgIndex}`);
    if(!imgCard) return;

    imgCard.classList.remove("loading");
    imgCard.innerHTML = `<img src="${imgUrl}" class="result-img">
                        <div class="img-overlay">
                            <a href="${imgUrl}" class="img-download-btn" download="${Date.now()}">
                                <i class="fa-solid fa-download"></i>
                            </a>
                            <button class="img-refresh-btn" data-index="${imgIndex}" data-prompt="${promptText}" data-model="${selectedModel}" data-aspect="${aspectRatio}">
                                <i class="fa-solid fa-sync"></i>
                            </button>
                        </div>`;

    const refreshBtn = imgCard.querySelector('.img-refresh-btn');
    refreshBtn.addEventListener('click', handleRefreshImage);
};

const handleRefreshImage = async (event) => {
    const button = event.currentTarget;
    const imgIndex = button.getAttribute('data-index');
    const promptText = button.getAttribute('data-prompt');
    const selectedModel = button.getAttribute('data-model');
    const aspectRatio = button.getAttribute('data-aspect');

    const { width, height } = getImageDimensions(aspectRatio);
    const MODEL_URL = `https://router.huggingface.co/hf-inference/models/${selectedModel}`;

    try {
        const response = await fetch(MODEL_URL, {
            headers: {
                Authorization: `Bearer ${API_KEY}`,
                "Content-Type": "application/json",
                "x-use-cache": "false",
            },
            method: "POST",
            body: JSON.stringify({
                inputs: promptText,
                parameters: { width, height },
            }),
        });
        if (!response.ok) throw new Error((await response.json())?.error);
        const result = await response.blob();
        updateImageCard(imgIndex, URL.createObjectURL(result), promptText, selectedModel, aspectRatio);
    } catch (error) {
        console.error(error);
    }
};

const generateImages = async (selectedModel, imageCount, aspectRatio, promptText) => {
    const MODEL_URL = `https://router.huggingface.co/hf-inference/models/${selectedModel}`;
    const { width, height } = getImageDimensions(aspectRatio);

    const imagePromises = Array.from({ length: imageCount }, async (_, i) => {
        try {
            const response = await fetch(MODEL_URL, {
                headers: {
                    Authorization: `Bearer ${API_KEY}`,
                    "Content-Type": "application/json",
                    "x-use-cache": "false",
                },
                method: "POST",
                body: JSON.stringify({
                    inputs: promptText,
                    parameters: { width, height },
                }),
            });
            if (!response.ok) throw new Error((await response.json())?.error);
            const result = await response.blob();
            updateImageCard(i, URL.createObjectURL(result), promptText, selectedModel, aspectRatio);
        } catch (error) {
            console.error(error);
        }
    });

    await Promise.allSettled(imagePromises);
};

const createImageCards = (selectedModel, imageCount, aspectRatio, promptText) => {
    gridGallery.innerHTML = '';
    for(let i = 0; i < imageCount; i++){
        gridGallery.innerHTML += `
            <div class="img-card loading" id="img-card-${i}" style="--aspect-ratio: ${aspectRatio}">
                <div class="status-container">
                    <div class="spinner"></div>
                    <p class="status-text">Generating....</p>
                </div>
            </div>`;
    }

    generateImages(selectedModel, imageCount, aspectRatio, promptText);
}

//handlning form sumissions(start)
const handleFormSubmit = (event) => {
    event.preventDefault();

//getting values out of form
    const selectedModel = modelSelect.value;
    const imageCount = parseInt(countSelect.value) || 1;
    const aspectRatio= ratioSelect.value || "1/1";
    const promptText = promptInput.value.trim();

   createImageCards(selectedModel, imageCount, aspectRatio, promptText);
}
//handlning form sumissions(end)
//code to insert random value in th etext feild area when the button is clicked along with text getting selected.(start)
promptBtn.addEventListener('click', () => {
    const prompt = examplePrompts[Math.floor(Math.random() * examplePrompts.length)];
    promptInput.value = prompt;
    promptInput.select();
});
//code to insert random value in th etext feild area when the button is clicked along with text getting selected.(end)

promptForm.addEventListener('submit', handleFormSubmit);

themeToggle.addEventListener('click',toggleTheme);
