# Sentimo Review Helper Widget

The Sentimo Review Helper is a lightweight JavaScript widget that helps users write clearer and more respectful product reviews — powered by Sentimo’s moderation API.

## 🔧 Installation

1. Include the script on your page:
```html
<script src="path/to/review-helper-1.0.0.min.js"></script>
```

```js
Sentimo.reviewHelper({
  reviewFieldSelector: '#yourTextareaId',
  clientId: 'your-sentimo-client-id',
  proxyUrl: 'https://yourdomain.com/review-helper/api/proxy', // optional
  messageOverrides: {
    clear: "Thanks! Your message is clear.",
    vague: "Could you clarify your message?",
    ironic: "This seems sarcastic. Please rephrase.",
    disrespectful: "Let's keep things respectful."
  },
  messages: {
    tooShort: "Please write at least 10 characters.",
    loading: "Analyzing your review...",
    success: "Your review looks great!",
    error: "Oops! Something went wrong."
  },
  popupStyle: {
    backgroundColor: '#f8f9fa',
    borderColor: '#00bfa6',
    color: '#000',
    fontWeight: 'bold'
  }
});

```

## ✨ Features

* ✅ Fully standalone (no dependency)

* 🧠 AI-powered review quality detection

* 💬 Dynamic feedback based on tone & clarity

* 🖌️ Styleable popup feedback box

* 🔧 Works anywhere you can place a <textarea>

## 💬 Output
By default, the widget:

* Injects a floating Sentimo logo button inside the review field container

* Displays a feedback popup partially overlaid on the bottom edge of the textarea

You can customize:

* All messages (`messageOverrides` and `messages`)
* Popup styling (`popupStyle`)
* Or override the rendering entirely with a custom `render()` function

## 🧪 Example
See `example/index.html` for a working demo and integration guide.

Made with ❤️ by Sentimo
