// LinkedIn Connection Finder - Popup JavaScript
(function() {
  'use strict';

  const elements = {
    statusCard: document.getElementById('linkedin-status'),
    statusText: document.getElementById('status-text'),
    copyTemplate: document.getElementById('copy-template'),
    clearCache: document.getElementById('clear-cache'),
    autoSearch: document.getElementById('auto-search'),
    showBanner: document.getElementById('show-banner'),
    helpLink: document.getElementById('help-link')
  };

  // Initialize
  async function init() {
    await checkLinkedInStatus();
    await loadSettings();
    setupEventListeners();
  }

  async function checkLinkedInStatus() {
    try {
      // Check if user has LinkedIn cookies (indicating they're logged in)
      const cookies = await chrome.cookies.getAll({
        domain: '.linkedin.com'
      });

      const hasSession = cookies.some(cookie => 
        cookie.name.includes('li_at') || cookie.name.includes('JSESSIONID')
      );

      if (hasSession) {
        elements.statusCard.classList.add('connected');
        elements.statusText.textContent = '✓ Connected to LinkedIn';
        elements.statusText.style.color = '#10B981';
      } else {
        elements.statusCard.classList.add('disconnected');
        elements.statusText.textContent = '⚠ Not logged into LinkedIn';
        elements.statusText.style.color = '#f59e0b';
      }
    } catch (error) {
      console.error('Error checking LinkedIn status:', error);
      elements.statusText.textContent = 'Unable to check status';
    }
  }

  async function loadSettings() {
    try {
      const result = await chrome.storage.local.get(['settings']);
      const settings = result.settings || {
        autoSearch: true,
        showBanner: true
      };

      elements.autoSearch.checked = settings.autoSearch;
      elements.showBanner.checked = settings.showBanner;
    } catch (error) {
      console.error('Error loading settings:', error);
    }
  }

  async function saveSettings() {
    try {
      const settings = {
        autoSearch: elements.autoSearch.checked,
        showBanner: elements.showBanner.checked
      };

      await chrome.storage.local.set({ settings });
      showNotification('Settings saved!');
    } catch (error) {
      console.error('Error saving settings:', error);
      showNotification('Failed to save settings');
    }
  }

  function setupEventListeners() {
    // Copy message template
    elements.copyTemplate.addEventListener('click', () => {
      const template = `Hi [Name],

I noticed you work at [Company] and I'm very interested in the [Job Title] position there.

I'd love to learn more about your experience at the company and get any insights you might have about the role and team culture.

Would you be open to a quick chat?

Best regards,
[Your Name]`;

      navigator.clipboard.writeText(template).then(() => {
        elements.copyTemplate.textContent = '✓ Copied!';
        setTimeout(() => {
          elements.copyTemplate.textContent = '📋 Copy Template';
        }, 2000);
      });
    });

    // Clear cache
    elements.clearCache.addEventListener('click', async () => {
      if (confirm('Clear all cached connection data?')) {
        try {
          await chrome.storage.local.remove(['connectionCache', 'lastSearch']);
          showNotification('Cache cleared!');
        } catch (error) {
          console.error('Error clearing cache:', error);
          showNotification('Failed to clear cache');
        }
      }
    });

    // Settings changes
    elements.autoSearch.addEventListener('change', saveSettings);
    elements.showBanner.addEventListener('change', saveSettings);

    // Help link
    elements.helpLink.addEventListener('click', (e) => {
      e.preventDefault();
      chrome.tabs.create({
        url: 'https://www.linkedin.com/help/linkedin/answer/a522735'
      });
    });
  }

  function showNotification(message) {
    // Simple notification in the popup
    const notification = document.createElement('div');
    notification.style.cssText = `
      position: fixed;
      top: 70px;
      right: 20px;
      background: #10B981;
      color: white;
      padding: 12px 20px;
      border-radius: 6px;
      font-size: 13px;
      font-weight: 600;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
      z-index: 10000;
      animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
      notification.style.animation = 'slideOut 0.3s ease';
      setTimeout(() => notification.remove(), 300);
    }, 2000);
  }

  // Initialize on load
  init();

})();
