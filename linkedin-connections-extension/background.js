// LinkedIn Connection Finder - Background Service Worker

// Listen for connection search requests
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'SEARCH_CONNECTIONS') {
    handleConnectionSearch(message.data, sendResponse);
    return true; // Will respond asynchronously
  } else if (message.type === 'OPEN_LINKEDIN_SEARCH') {
    openLinkedInSearch(message.companyName);
  }
});

async function handleConnectionSearch(companyInfo, sendResponse) {
  try {
    // Check if user is logged into LinkedIn
    const isLoggedIn = await checkLinkedInAuth();
    
    if (!isLoggedIn) {
      sendResponse({
        connections: [],
        error: 'NOT_LOGGED_IN',
        message: 'Please log in to LinkedIn to search for connections'
      });
      return;
    }

    // Since we can't directly access LinkedIn's API without authentication,
    // we'll provide a manual search option and cache any manually entered connections
    
    // Check cache for this company
    const cached = await getCachedConnections(companyInfo.companyName);
    if (cached) {
      sendResponse({ connections: cached });
      return;
    }

    // For now, return empty array and suggest manual search
    // In a production version, you would:
    // 1. Use LinkedIn's official OAuth API
    // 2. Implement proper API authentication
    // 3. Make authorized API calls to search connections
    
    sendResponse({
      connections: [],
      suggestManualSearch: true,
      searchUrl: generateSearchUrl(companyInfo.companyName)
    });

  } catch (error) {
    console.error('Error in connection search:', error);
    sendResponse({
      connections: [],
      error: 'SEARCH_FAILED',
      message: error.message
    });
  }
}

async function checkLinkedInAuth() {
  try {
    // Check if LinkedIn cookies exist
    const cookies = await chrome.cookies.getAll({
      domain: '.linkedin.com'
    });
    
    // Look for session cookie
    const hasSession = cookies.some(cookie => 
      cookie.name.includes('li_at') || cookie.name.includes('JSESSIONID')
    );
    
    return hasSession;
  } catch (error) {
    console.error('Error checking LinkedIn auth:', error);
    return false;
  }
}

async function getCachedConnections(companyName) {
  try {
    const result = await chrome.storage.local.get(['connectionCache']);
    if (!result.connectionCache) return null;
    
    const cache = result.connectionCache[companyName];
    if (!cache) return null;
    
    // Check if cache is still valid (24 hours)
    if (Date.now() - cache.timestamp > 86400000) {
      return null;
    }
    
    return cache.connections;
  } catch (error) {
    console.error('Error getting cached connections:', error);
    return null;
  }
}

async function cacheConnections(companyName, connections) {
  try {
    const result = await chrome.storage.local.get(['connectionCache']);
    const cache = result.connectionCache || {};
    
    cache[companyName] = {
      connections,
      timestamp: Date.now()
    };
    
    await chrome.storage.local.set({ connectionCache: cache });
  } catch (error) {
    console.error('Error caching connections:', error);
  }
}

function generateSearchUrl(companyName) {
  // Generate LinkedIn search URL for people at this company
  const encodedCompany = encodeURIComponent(companyName);
  return `https://www.linkedin.com/search/results/people/?currentCompany=%5B%22${encodedCompany}%22%5D&network=%5B%22F%22%5D&origin=FACETED_SEARCH`;
}

function openLinkedInSearch(companyName) {
  const searchUrl = generateSearchUrl(companyName);
  chrome.tabs.create({ url: searchUrl });
}

// Helper function to simulate connection data (for demo purposes)
// In production, this would be replaced with actual LinkedIn API calls
async function fetchConnectionsFromLinkedIn(companyName, companyUrl) {
  // This is a placeholder that would be replaced with actual LinkedIn API integration
  // For now, we return empty array and suggest manual search
  
  // Example of what the API response might look like:
  /*
  return [
    {
      name: "John Doe",
      headline: "Software Engineer at Company",
      profileUrl: "https://linkedin.com/in/johndoe",
      profileImage: "https://...",
      mutualConnections: 5,
      connectionDegree: "1st"
    }
  ];
  */
  
  return [];
}

// Listen for tab updates to detect when user navigates to LinkedIn
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && 
      tab.url && 
      tab.url.includes('linkedin.com/search/results/people')) {
    // Could potentially scrape connection data here if permissions allow
    // However, this would violate LinkedIn's terms of service
  }
});

// Helper: Clean company name for better search results
function cleanCompanyName(name) {
  // Remove common suffixes and clean up
  return name
    .replace(/,?\s*(Inc\.?|LLC|Ltd\.?|Corporation|Corp\.?|Limited|Company|Co\.?)$/i, '')
    .trim();
}

// Helper: Generate draft message for reaching out to connection
function generateIntroMessage(connectionName, companyName, jobTitle) {
  return `Hi ${connectionName},

I noticed you work at ${companyName} and I'm very interested in the ${jobTitle} position there.

I'd love to learn more about your experience at the company and get any insights you might have about the role and team culture.

Would you be open to a quick chat?

Best regards`;
}

// Store draft messages
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'GENERATE_INTRO_MESSAGE') {
    const introMessage = generateIntroMessage(
      message.connectionName,
      message.companyName,
      message.jobTitle
    );
    sendResponse({ message: introMessage });
  }
});
