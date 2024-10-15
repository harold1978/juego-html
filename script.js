const cards = document.querySelectorAll(".card");
const gameContainer = document.getElementById("gameContainer");

cards.forEach((card) => {
  card.addEventListener("dragstart", () => {
    card.classList.add("dragging");
  });

  card.addEventListener("dragend", () => {
    card.classList.remove("dragging");
  });
});

gameContainer.addEventListener("dragover", (e) => {
  e.preventDefault();
  const draggingCard = document.querySelector(".dragging");
  const afterElement = getDragAfterElement(gameContainer, e.clientY);
  if (afterElement == null) {
    gameContainer.appendChild(draggingCard);
  } else {
    gameContainer.insertBefore(draggingCard, afterElement);
  }
});

function getDragAfterElement(container, y) {
  const draggableElements = [
    ...container.querySelectorAll(".card:not(.dragging)"),
  ];

  return draggableElements.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child };
      } else {
        return closest;
      }
    },
    { offset: Number.NEGATIVE_INFINITY }
  ).element;
}
