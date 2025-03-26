let shakespeareanEnabled = false;

// Get initial state from storage.
chrome.storage.local.get("shakespeareanify", (data) => {
   shakespeareanEnabled = data.shakespeareanify;
});

// Listen for storage changes to update the flag.
chrome.storage.onChanged.addListener((changes, area) => {
  if (area === "local" && changes.shakespeareanify) {
    shakespeareanEnabled = changes.shakespeareanify.newValue;
  }
});

// Dictionary of modern words to Shakespearean equivalents.
const shakespeareanWords = {
    "you": "thou",
    "your": "thy",
    "are": "art",
    "have": "hast",
    "do": "dost",
    "does": "doth",
    "is": "be",
    "my": "mine",
    "hello": "good morrow",
    "yes": "aye",
    "no": "nay",
    "not": "naught",
    "very": "verily",
    "please": "prithee",
    "friend": "comrade",
    "man": "gentle sir",
    "woman": "fair maiden",
    "goodbye": "fare thee well",
    "excuse me": "pray pardon",
    "stop": "cease",
    "go": "hie thee hence",
    "love": "affection",
    "fool": "knave",
    "king": "sovereign",
    "queen": "gracious lady",
    "rich": "wealthy",
    "poor": "humble",
    "fight": "duel",
    "eat": "feast",
    "drink": "quaff",
    "sleep": "slumber",
    "fast": "fleet",
    "slow": "leisurely",
    "happy": "merry",
    "sad": "woeful",
    "beautiful": "fair",
    "ugly": "hideous"
};

// Function to translate a given text.
function translateToShakespearean(text) {
    return text.split(" ").map(word => shakespeareanWords[word.toLowerCase()] || word).join(" ");
}

// Listen for input events on text fields and textareas.
document.addEventListener("input", function(event) {
    if (!shakespeareanEnabled) return; 
    if (event.target.tagName === "INPUT" || event.target.tagName === "TEXTAREA") {
        let cursorPosition = event.target.selectionStart;
        let words = event.target.value.split(" ");
        let lastWord = words[words.length - 1].toLowerCase();
        
        if (shakespeareanWords[lastWord]) {
            words[words.length - 1] = shakespeareanWords[lastWord];
            event.target.value = words.join(" ");
            event.target.selectionStart = event.target.selectionEnd = cursorPosition;
        }
    }
});
