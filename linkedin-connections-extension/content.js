// LinkedIn Connection Finder - Content Script
(function() {
  'use strict';

  const siteConfigs = {
    'linkedin.com': {
      companySelector: '.job-details-jobs-unified-top-card__company-name, .topcard__org-name-link, .jobs-unified-top-card__company-name a',
      titleSelector: '.job-details-jobs-unified-top-card__job-title, .topcard__title, .jobs-unified-top-card__job-title',
      companyLinkSelector: '.job-details-jobs-unified-top-card__company-name a, .jobs-unified-top-card__company-name a'
    },
    'indeed.com': {
      companySelector: '[data-company-name="true"], .jobsearch-InlineCompanyRating-companyHeader a',
      titleSelector: '.jobsearch-JobInfoHeader-title, h1.jobsearch-JobInfoHeader-title'
    },
    'glassdoor.com': {
      companySelector: '[data-test="employerName"], .employer-name',
      titleSelector: '[data-test="jobTitle"], .job-title'
    },
    'monster.com': {
      companySelector: '.company-name, [data-test-id="companyName"]',
      titleSelector: '.job-title, h1[data-test-id="jobTitle"]'
    },
    'ziprecruiter.com': {
      companySelector: '.hiring_company_text, [data-test="companyName"]',
      titleSelector: '.job_title, h1.job-title'
    },
    'dice.com': {
      companySelector: '.employer, [data-cy="companyNameLink"]',
      titleSelector: '.jobTitle, h1[data-cy="jobTitle"]'
    },
    'lever.co': {
      companySelector: '.company-name, .main-header-text',
      titleSelector: '.posting-headline h2'
    },
    'ashbyhq.com': {
      companySelector: '.ashby-job-posting-heading__company-name',
      titleSelector: '.ashby-job-posting-heading__title'
    },
    'greenhouse.io': {
      companySelector: '#header .company-name',
      titleSelector: '.app-title, h1.app-title'
    }
  };

  let connectionBanner = null;
  let currentCompany = null;

  function getCurrentSiteConfig() {
    const hostname = window.location.hostname;
    for (const [site, config] of Object.entries(siteConfigs)) {
      if (hostname.includes(site)) {
        return config;
      }
    }
    return null;
  }

  function extractText(selector) {
    const element = document.querySelector(selector);
    return element ? element.textContent.trim() : null;
  }

  function extractCompanyInfo() {
    const config = getCurrentSiteConfig();
    if (!config) return null;

    const companyName = extractText(config.companySelector);
    const jobTitle = extractText(config.titleSelector);

    if (!companyName) return null;

    // Get company LinkedIn URL if available (for LinkedIn jobs)
    let companyUrl = null;
    if (config.companyLinkSelector && window.location.hostname.includes('linkedin.com')) {
      const linkElement = document.querySelector(config.companyLinkSelector);
      if (linkElement) {
        companyUrl = linkElement.href;
      }
    }

    return {
      companyName,
      jobTitle,
      companyUrl
    };
  }

  function createConnectionBanner() {
    if (connectionBanner) return;

    connectionBanner = document.createElement('div');
    connectionBanner.id = 'linkedin-connection-banner';
    connectionBanner.className = 'connection-banner loading';
    connectionBanner.innerHTML = `
      <div class="banner-content">
        <div class="banner-icon">🔍</div>
        <div class="banner-text">
          <div class="banner-title">Searching for connections...</div>
          <div class="banner-subtitle">Checking your LinkedIn network</div>
        </div>
        <button class="banner-close" title="Close">&times;</button>
      </div>
    `;

    document.body.appendChild(connectionBanner);

    connectionBanner.querySelector('.banner-close').addEventListener('click', () => {
      connectionBanner.remove();
      connectionBanner = null;
    });
  }

  function updateBanner(connections, companyName) {
    if (!connectionBanner) return;

    connectionBanner.classList.remove('loading');

    if (connections.length === 0) {
      connectionBanner.classList.add('no-connections');
      connectionBanner.innerHTML = `
        <div class="banner-content">
          <div class="banner-icon">ℹ️</div>
          <div class="banner-text">
            <div class="banner-title">No direct connections found</div>
            <div class="banner-subtitle">You don't have 1st-degree connections at ${companyName}</div>
          </div>
          <button class="banner-action" id="search-linkedin">Search Manually</button>
          <button class="banner-close" title="Close">&times;</button>
        </div>
      `;
    } else {
      connectionBanner.classList.add('has-connections');
      connectionBanner.innerHTML = `
        <div class="banner-content">
          <div class="banner-icon">✨</div>
          <div class="banner-text">
            <div class="banner-title">🎉 Found ${connections.length} connection${connections.length > 1 ? 's' : ''}!</div>
            <div class="banner-subtitle">You have connections at ${companyName}</div>
          </div>
          <button class="banner-action" id="view-connections">View Connections</button>
          <button class="banner-close" title="Close">&times;</button>
        </div>
        <div class="connections-list" style="display: none;">
          ${connections.map(conn => `
            <div class="connection-item">
              <img src="${conn.profileImage || 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%230077b5"><circle cx="12" cy="12" r="10"/></svg>'}" alt="${conn.name}" class="connection-avatar">
              <div class="connection-info">
                <div class="connection-name">${escapeHtml(conn.name)}</div>
                <div class="connection-title">${escapeHtml(conn.headline || 'LinkedIn Member')}</div>
              </div>
              <a href="${conn.profileUrl}" target="_blank" class="connection-link">View Profile</a>
            </div>
          `).join('')}
        </div>
      `;
    }

    // Re-attach event listeners
    const closeBtn = connectionBanner.querySelector('.banner-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        connectionBanner.remove();
        connectionBanner = null;
      });
    }

    const viewBtn = connectionBanner.querySelector('#view-connections');
    if (viewBtn) {
      viewBtn.addEventListener('click', () => {
        const list = connectionBanner.querySelector('.connections-list');
        if (list.style.display === 'none') {
          list.style.display = 'block';
          viewBtn.textContent = 'Hide Connections';
        } else {
          list.style.display = 'none';
          viewBtn.textContent = 'View Connections';
        }
      });
    }

    const searchBtn = connectionBanner.querySelector('#search-linkedin');
    if (searchBtn) {
      searchBtn.addEventListener('click', () => {
        const searchUrl = `https://www.linkedin.com/search/results/people/?keywords=${encodeURIComponent(companyName)}`;
        window.open(searchUrl, '_blank');
      });
    }
  }

  async function searchConnections(companyInfo) {
    try {
      // Send message to background script to search LinkedIn
      chrome.runtime.sendMessage({
        type: 'SEARCH_CONNECTIONS',
        data: companyInfo
      }, (response) => {
        if (response && response.connections) {
          updateBanner(response.connections, companyInfo.companyName);
          
          // Store in extension storage
          chrome.storage.local.set({
            lastSearch: {
              company: companyInfo.companyName,
              connections: response.connections,
              timestamp: Date.now()
            }
          });
        } else {
          updateBanner([], companyInfo.companyName);
        }
      });
    } catch (error) {
      console.error('Error searching connections:', error);
      updateBanner([], companyInfo.companyName);
    }
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  async function initialize() {
    const companyInfo = extractCompanyInfo();
    
    if (!companyInfo) return;

    currentCompany = companyInfo;

    // Check if we already have cached connections for this company
    const result = await chrome.storage.local.get(['lastSearch']);
    if (result.lastSearch && 
        result.lastSearch.company === companyInfo.companyName &&
        Date.now() - result.lastSearch.timestamp < 3600000) { // 1 hour cache
      
      createConnectionBanner();
      updateBanner(result.lastSearch.connections, companyInfo.companyName);
      return;
    }

    // Create banner and start searching
    createConnectionBanner();
    searchConnections(companyInfo);
  }

  // Initialize after page loads
  setTimeout(initialize, 2000);

  // Watch for URL changes (SPAs)
  let lastUrl = location.href;
  new MutationObserver(() => {
    const url = location.href;
    if (url !== lastUrl) {
      lastUrl = url;
      if (connectionBanner) {
        connectionBanner.remove();
        connectionBanner = null;
      }
      setTimeout(initialize, 2000);
    }
  }).observe(document, { subtree: true, childList: true });

})();
