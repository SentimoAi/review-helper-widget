/**
 * Sentimo Review Helper Widget
 * v1.0.0 - Customizable popup styles
 */
(function (global) {
  global.Sentimo = global.Sentimo || {};

  global.Sentimo.reviewHelper = function (config) {
    const reviewField = document.querySelector(config.reviewFieldSelector);
    if (!reviewField) return;

    const defaultMessages = {
      tooShort: 'Please write at least 10 characters.',
      loading: 'Analyzing review...',
      success: 'Review analyzed successfully!',
      error: 'Error validating your review. Please try again.'
    };

    const messages = Object.assign({}, defaultMessages, config.messages || {});
    const proxyUrl = config.proxyUrl || 'https://sentimoai.com/review-helper/api/proxy';

    // Create logo as floating button
    const button = document.createElement('img');
    button.src = 'https://sentimoai.com/images/sentimo-logo/no-title/sentimo-simple@2x.png';
    button.alt = 'Sentimo Review';
    button.style.position = 'absolute';
    button.style.right = '12px';
    button.style.bottom = '12px';
    button.style.width = '32px';
    button.style.height = '32px';
    button.style.cursor = 'pointer';
    button.style.zIndex = 10;

    // Create popup
    const popup = document.createElement('div');
    popup.style.position = 'absolute';
    popup.style.right = '0';
    popup.style.bottom = '8px';
    popup.style.transform = 'translateY(25%)';
    popup.style.maxWidth = '280px';
    popup.style.padding = '10px';
    popup.style.fontSize = '14px';
    popup.style.background = '#fff';
    popup.style.border = '1px solid #405189';
    popup.style.borderRadius = '6px';
    popup.style.boxShadow = '0 2px 6px rgba(0,0,0,0.1)';
    popup.style.display = 'none';
    popup.style.zIndex = 9999;
    popup.style.color = '#333';

    // Apply custom popup styles if provided
    if (config.popupStyle && typeof config.popupStyle === 'object') {
      Object.assign(popup.style, config.popupStyle);
    }

    // Insert elements in DOM
    reviewField.style.position = 'relative';
    reviewField.parentNode.style.position = 'relative';
    reviewField.parentNode.appendChild(button);
    reviewField.parentNode.appendChild(popup);

    const render = (type, message) => {
      popup.textContent = message;
      popup.style.display = 'block';
      button.style.bottom = '-43px'; // push the logo further down
    };

    button.addEventListener('click', () => {
      const content = reviewField.value.trim();
      if (content.length < 10) {
        render('error', messages.tooShort);
        return;
      }

      render('loading', messages.loading);

      fetch(proxyUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Client-Id': config.clientId,
        },
        body: JSON.stringify({ content }),
      })
        .then(async (res) => {
          const data = await res.json().catch(() => ({}));

          if (data.category && config.messageOverrides && config.messageOverrides[data.category]) {
            data.message = config.messageOverrides[data.category];
          }

          if (!res.ok) {
            const errorMessage = data.error || messages.error;
            throw new Error(errorMessage);
          }

          render('success', data.message || messages.success);
        })
        .catch((err) => {
          render('error', err.message || messages.error);
        });
    });
  };
})(window);

