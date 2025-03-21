# 🌟 AI Image Generator

This project is a web-based **AI Image Generator** that uses **Hugging Face** models to generate images based on user-inputted prompts. Users can select different models, specify aspect ratios, and choose the number of images to generate. The project also features a **🌙 Dark Mode Toggle** and allows users to refresh images individually.

---

## ✨ Features

- 🎨 **AI-Generated Images**: Uses Hugging Face models to generate images from text prompts.
- 🖼️ **Model Selection**: Choose from available AI models for different image styles.
- 📏 **Customizable Image Dimensions**: Select aspect ratios for generated images.
- 🔢 **Multiple Image Generation**: Generate multiple images at once.
- 🌙 **Dark Mode Toggle**: Switch between light and dark themes.
- 🎲 **Random Prompt Suggestions**: Click a button to get a random image prompt.
- 🔄 **Image Refresh**: Regenerate individual images without reloading the entire page.

---

## 🛠️ Technologies Used

- 🏗️ **HTML, CSS (Tailwind CSS)**
- ⚡ **JavaScript (ES6+)**
- 🤗 **Hugging Face API**

---

## 🔗 API Endpoint

The project uses the **Hugging Face Inference API** for image generation. The API endpoint is:

```sh
https://router.huggingface.co/hf-inference/models/{model_name}
```

Replace `{model_name}` with the selected AI model you wish to use.

---

## 🏃 Usage

1. ✍️ **Enter a prompt** in the text input field or click the **Random Prompt** button to get a suggestion.
2. 🖼️ **Select an AI model** from the dropdown menu.
3. 📐 **Choose the number of images** to generate and the aspect ratio.
4. 🎨 **Click Generate** to fetch images from the Hugging Face API.
5. 🔄 **Click the refresh button** on an individual image to regenerate it.
6. 🌙 **Toggle dark mode** using the theme switch button.

---

## 🔑 API Key Configuration

Replace the `API_KEY` value in the script with your Hugging Face API key:

```js
const API_KEY = "your_huggingface_api_key";
```

---

## 🤝 Contributions

Contributions are welcome! Feel free to **open an issue** or **submit a pull request**. 💡

---

## 📜 License

This project is licensed under the **MIT License**.

