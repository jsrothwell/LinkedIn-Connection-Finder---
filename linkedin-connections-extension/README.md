# LinkedIn Connection Finder - Browser Extension

Leverage your LinkedIn network when job hunting! This browser extension automatically detects when you're viewing job postings and searches for your 1st-degree LinkedIn connections at that company.

## Features

### 🎯 Core Features
- **Automatic Company Detection**: Detects companies from job postings on major job sites
- **Connection Search**: Finds your 1st-degree LinkedIn connections at the company
- **Smart Banner**: Shows an elegant overlay with connection results
- **Manual Search Option**: Quickly open LinkedIn to manually search connections
- **Message Templates**: Copy pre-written introduction messages
- **Connection Cache**: Saves search results to avoid repeated lookups

### 🌟 Benefits
- **Get Referrals**: Reach out to connections for employee referrals
- **Inside Information**: Ask about company culture, team, and role details
- **Higher Success Rate**: Employee referrals significantly increase interview chances
- **Save Time**: Automatically find connections instead of manual searching
- **Strategic Networking**: Know your advantage before applying

### 🌐 Supported Job Sites
- LinkedIn Jobs
- Indeed
- Glassdoor
- Monster
- ZipRecruiter
- Dice
- Lever.co
- Ashby HQ
- Greenhouse

## Installation

### Chrome Installation

1. Download and extract the extension files
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" (toggle in top-right)
4. Click "Load unpacked"
5. Select the `linkedin-connections-extension` folder
6. **Important**: Make sure you're logged into LinkedIn in this browser

### Firefox Installation

1. Download and extract the extension files
2. Open Firefox and navigate to `about:debugging#/runtime/this-firefox`
3. Click "Load Temporary Add-on..."
4. Select the `manifest.json` file in the extension folder
5. **Important**: Make sure you're logged into LinkedIn in this browser

**Note**: In Firefox, temporary extensions are removed when you close the browser.

## Prerequisites

⚠️ **Important**: You MUST be logged into LinkedIn in your browser for this extension to work properly.

To verify you're logged in:
1. Open a new tab
2. Go to https://www.linkedin.com
3. You should see your profile/feed (not a login page)

## How to Use

### Basic Usage

1. **Make sure you're logged into LinkedIn** in your browser
2. **Visit any job posting** on a supported site
3. **Wait 2-3 seconds** for the extension to detect the company
4. **View the banner** that appears showing your connections (or lack thereof)

### Understanding the Banner

The banner will show one of three states:

**🔍 Searching** (Blue)
- The extension is detecting the company and searching for connections
- This usually takes 2-3 seconds

**✨ Connections Found!** (Green)
- Shows the number of 1st-degree connections you have at this company
- Click "View Connections" to see their names, titles, and profile links
- Click any profile link to open their LinkedIn profile in a new tab

**ℹ️ No Connections Found** (Gray)
- You don't have any 1st-degree connections at this company
- Click "Search Manually" to open LinkedIn's search with the company pre-filled
- This lets you find 2nd-degree connections or people who work there

### Reaching Out to Connections

When you find connections:

1. **Click their profile link** to view their LinkedIn profile
2. **Send a connection request** if not already connected
3. **Send a message** using the template provided in the extension popup
4. **Be genuine and specific** about your interest in the role
5. **Ask for insights first**, referrals second

### Using the Message Template

1. Click the extension icon in your toolbar
2. Scroll to the "Sample Introduction Message" section
3. Click "📋 Copy Template"
4. Paste into LinkedIn's message composer
5. Personalize it with specific details about:
   - The connection's background
   - Why you're interested in the company
   - What specifically you'd like to know

## Features Explained

### Automatic Detection

The extension automatically:
- Detects when you're on a job posting page
- Extracts the company name from the posting
- Searches your LinkedIn network
- Displays results in an elegant banner

### Connection Banner

The banner includes:
- Company name and your connection count
- Option to view full connection list
- Direct links to connection profiles
- Manual search option if no automatic results

### Manual Search Option

If automatic detection doesn't work or you want to search manually:
1. Click "Search Manually" in the banner
2. LinkedIn opens with a pre-filled search
3. You'll see all people at that company in your network
4. Filter by connection degree (1st, 2nd, 3rd)

### Settings

Access settings by clicking the extension icon:
- **Automatically search for connections**: Enable/disable automatic search
- **Show connection banner**: Show/hide the banner overlay
- **Clear cache**: Remove all cached connection data

## File Structure

```
linkedin-connections-extension/
├── manifest.json           # Extension configuration
├── background.js           # Background service worker
├── content.js             # Content script (detects jobs, searches)
├── content-styles.css     # Styles for connection banner
├── popup.html             # Settings and instructions UI
├── popup.js               # Popup logic
├── popup-styles.css       # Popup styles
├── icons/                 # Extension icons
│   ├── icon16.png
│   ├── icon48.png
│   └── icon128.png
└── README.md              # This file
```

## Tips for Best Results

### Maximize Your Chances

1. **Keep LinkedIn Updated**: Make sure your connections are current
2. **Expand Your Network**: Connect with people in your target industry
3. **Be Strategic**: Focus on companies where you have connections
4. **Personalize Messages**: Generic messages get ignored
5. **Ask for Advice First**: Don't immediately ask for a referral

### Crafting the Perfect Message

**DO:**
- Mention specific things you admire about the company
- Reference the specific role you're interested in
- Ask about their experience first
- Keep it brief (under 200 words)
- Be genuine and professional

**DON'T:**
- Send generic copy-paste messages
- Ask for a referral in the first message
- Write a novel about yourself
- Be pushy or demanding
- Forget to proofread

### When to Reach Out

**Best Times:**
- Weekday mornings (Tuesday-Thursday)
- Within 24 hours of finding the connection
- Before applying (to get insights)
- After first interview (to ask follow-up questions)

**Avoid:**
- Weekends (unless the person is very active)
- Late evenings
- Major holidays
- Right after being rejected (wait a few months)

## Troubleshooting

### Extension not detecting company
- Make sure you're on a supported job site
- Wait 2-3 seconds for the page to fully load
- Try refreshing the page
- Check that the extension is enabled

### Banner not appearing
- Verify you're logged into LinkedIn
- Check extension settings (banner may be disabled)
- Look for any error messages in browser console (F12)
- Try closing and reopening the banner

### No connections showing up
- This is normal! Not every company will have connections
- Click "Search Manually" to see 2nd and 3rd degree connections
- Expand your LinkedIn network over time
- Consider connecting with people in your industry

### LinkedIn login issues
- Make sure you're fully logged into LinkedIn
- Try logging out and back in
- Clear LinkedIn cookies and re-login
- Check that LinkedIn isn't blocked by privacy extensions

### Manual search not working
- Verify LinkedIn isn't blocked
- Try opening LinkedIn in a new tab first
- Check your popup blocker settings
- Manually go to LinkedIn and search

## Privacy & Security

✅ **What we do:**
- Check if you're logged into LinkedIn (via cookies)
- Search for connections at companies you're viewing
- Cache search results locally for 24 hours
- Store settings locally on your device

❌ **What we DON'T do:**
- Store your LinkedIn password
- Access your LinkedIn messages
- Post anything to LinkedIn
- Share your data with third parties
- Track your browsing outside job sites
- Store personal connection data permanently

## Limitations

### Technical Limitations
- Requires active LinkedIn login
- Only searches 1st-degree connections automatically
- Cache expires after 24 hours
- Some company names may not match exactly
- LinkedIn rate limits may apply

### LinkedIn API Restrictions
⚠️ **Important Note**: This extension does not use LinkedIn's official API, which requires special partnerships. Instead:
- It detects your LinkedIn login status
- Opens LinkedIn search pages when needed
- You manually interact with LinkedIn's interface
- All LinkedIn interactions follow their terms of service

### What This Means
- The extension can't automatically pull full connection lists
- You may need to manually search on LinkedIn sometimes
- Results depend on your active LinkedIn session
- LinkedIn's interface changes may affect functionality

## Ethical Use

### Please Use Responsibly

✅ **Good Practices:**
- Only reach out to people you're genuinely interested in connecting with
- Personalize every message
- Respect people's time and boundaries
- Follow up appropriately but don't spam
- Be honest about your intentions

❌ **Don't:**
- Send mass generic messages
- Harass people for referrals
- Misrepresent your qualifications
- Ignore responses
- Use connections solely for personal gain without offering value

## Legal Disclaimer

This extension:
- Is provided "as-is" for personal job search use
- Does not guarantee job referrals or interviews
- Requires compliance with LinkedIn's Terms of Service
- Should be used ethically and professionally
- Does not create employment relationships

Users are responsible for:
- Their own LinkedIn account security
- Messages sent to connections
- Following LinkedIn's policies
- Professional conduct

## Future Enhancements

Planned features:
- 📊 Track which connections were most helpful
- 📧 Integration with email for follow-ups
- 🤖 AI-powered message personalization
- 📈 Analytics on connection response rates
- 🔔 Notifications when connections change companies
- 💼 Integration with job application trackers
- 🎯 Connection quality scoring

## FAQ

**Q: Does this violate LinkedIn's terms of service?**
A: No. The extension only checks if you're logged in and helps you navigate to LinkedIn's search. All interactions with LinkedIn are done manually by you.

**Q: Can I use this for recruiting/hiring?**
A: While designed for job seekers, recruiters can use it to find mutual connections with candidates. Always use ethically.

**Q: Why isn't it finding all my connections?**
A: The extension searches 1st-degree connections only. Use "Search Manually" to see 2nd and 3rd degree connections.

**Q: Will people know I'm using this extension?**
A: No. The extension only affects your browser. Your LinkedIn activity appears normal.

**Q: Can I use this on multiple devices?**
A: Yes, but you'll need to install it on each device. There's no cross-device sync.

**Q: Is my data safe?**
A: Yes. All data is stored locally on your device. Nothing is sent to external servers.

## Support

If you encounter issues:
1. Check this README's Troubleshooting section
2. Verify you're logged into LinkedIn
3. Check browser console for errors (F12)
4. Try disabling and re-enabling the extension
5. Make sure all files are present

## Version History

**v1.0.0** (Current)
- Initial release
- Support for 9 major job sites
- Automatic company detection
- Connection search and display
- Message templates
- Settings and cache management

## Contributing

Want to improve this extension?

### Areas for Contribution
- Add support for more job sites
- Improve company name matching
- Enhance UI/UX
- Add more message templates
- Translate to other languages
- Improve documentation

### Adding New Job Sites

Edit the `siteConfigs` object in `content.js`:

```javascript
'newsite.com': {
  companySelector: '.company-name-class',
  titleSelector: '.job-title-class',
  companyLinkSelector: '.company-link-class'
}
```

## License

This extension is provided as-is for personal use in job searching.

---

**Made with ❤️ for job seekers who want to leverage their network!**

Your next opportunity might be just one connection away. 🤝
