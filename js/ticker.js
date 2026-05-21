const WINNERS = [
  { name: "Rahul K.", city: "Mumbai", amount: "₹12,400", game: "Points Rummy" },
  { name: "Priya S.", city: "Delhi", amount: "₹8,750", game: "Pool Rummy" },
  { name: "Amit P.", city: "Bangalore", amount: "₹25,000", game: "Tournament" },
  { name: "Sneha M.", city: "Pune", amount: "₹6,200", game: "Deals Rummy" },
  { name: "Vikram R.", city: "Hyderabad", amount: "₹18,900", game: "Points Rummy" },
  { name: "Anita D.", city: "Chennai", amount: "₹9,100", game: "Teen Patti" },
  { name: "Karan J.", city: "Jaipur", amount: "₹31,500", game: "Tournament" },
  { name: "Meera T.", city: "Kolkata", amount: "₹4,800", game: "Points Rummy" },
];

function renderTickerItem(w) {
  return `<span class="ticker-item">🎉 <strong>${w.name}</strong> from ${w.city} won <em>${w.amount}</em> in ${w.game}</span>`;
}

export function initLiveTicker() {
  const track = document.querySelector(".live-ticker-track");
  if (!track) return;

  const items = [...WINNERS, ...WINNERS].map(renderTickerItem).join('<span class="ticker-dot" aria-hidden="true">•</span>');
  track.innerHTML = items;
}
