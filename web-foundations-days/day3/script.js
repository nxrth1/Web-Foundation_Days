let notes = [
  { id: 1, text: "Buy milk and bread", category: "personal" },
  { id: 2, text: "Finish the Day 3 assignment", category: "study" },
  { id: 3, text: "Email the project report to Grace", category: "work" },
  { id: 4, text: "Revise JavaScript arrays", category: "study" },
  { id: 5, text: "Call mum", category: "personal" },
];

function searchNotes(word) {
  return notes.filter(function (note) {
    return note.text.toLowerCase().includes(word.toLowerCase());
  });
}

function isDuplicate(text) {
  const normalizedText = text.trim().toLowerCase();

  return notes.some(function (note) {
    return note.text.trim().toLowerCase() === normalizedText;
  });
}

function addNote(text, category) {
  if (typeof text !== "string") {
    return false;
  }

  const trimmedText = text.trim();
  const validCategories = ["personal", "work", "study"];

  if (
    trimmedText.length === 0 ||
    !validCategories.includes(category) ||
    isDuplicate(trimmedText)
  ) {
    return false;
  }

  const nextId = notes.reduce(function (highestId, note) {
    return Math.max(highestId, note.id);
  }, 0) + 1;

  notes.push({ id: nextId, text: trimmedText, category: category });
  return true;
}

function longestNote() {
  if (notes.length === 0) {
    return null;
  }

  let longest = notes[0];

  for (let i = 1; i < notes.length; i++) {
    if (notes[i].text.length > longest.text.length) {
      longest = notes[i];
    }
  }

  return longest;
}

function countByCategory() {
  let counts = {};

  for (let note of notes) {
    if (counts[note.category]) {
      counts[note.category]++;
    } else {
      counts[note.category] = 1;
    }
  }

  return counts;
}

function getSummary() {
  let counts = countByCategory();
  let noteWord = notes.length === 1 ? "note" : "notes";

  return `${notes.length} ${noteWord}: ${counts.personal || 0} personal, ${counts.work || 0} work, ${counts.study || 0} study.`;
}

console.log(isDuplicate("  BUY MILK AND BREAD  ")); // Expected: true
console.log(isDuplicate("A note that is not here")); // Expected: false
console.log(addNote("Read a book", "personal")); // Expected: true
console.log(addNote("A note with no text", "invalid")); // Expected: false
console.log(addNote("   ", "personal")); // Expected: false
console.log(addNote("  READ A BOOK ", "personal")); // Expected: false
console.log(searchNotes("day 3")); // Expected: [{ id: 2, text: "Finish the Day 3 assignment", category: "study" }]
console.log(searchNotes("not found")); // Expected: []
console.log(countByCategory()); // Expected: { personal: 3, study: 2, work: 1 }
console.log(longestNote()); // Expected: { id: 3, text: "Email the project report to Grace", category: "work" }
console.log(getSummary()); // Expected: "6 notes: 3 personal, 1 work, 2 study."
const savedNotes = notes;
notes = [];
console.log(countByCategory()); // Expected: {}
console.log(longestNote()); // Expected: null
console.log(getSummary()); // Expected: "0 notes: 0 personal, 0 work, 0 study."
notes = savedNotes;
