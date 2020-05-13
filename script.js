window.addEventListener('load', () => {

    const cards = document.querySelectorAll('.draggable');
    const containers = document.querySelectorAll('.container');

    cards.forEach(card => {
        card.addEventListener('dragstart', () => {
            card.classList.add('dragging');
        });
        card.addEventListener('dragend', () => {
            card.classList.remove('dragging');
        });
    });

    containers.forEach(container => {
        container.addEventListener('dragover', (event) => {
            const draggingCard = document.querySelector('.dragging');
            const afterElement = getAfterElement(container, event.clientY);
            if (!afterElement) container.appendChild(draggingCard);
            else container.insertBefore(draggingCard, afterElement);
        });
    });

    function getAfterElement(container, y) {
        const cards = [...container.querySelectorAll('.draggable:not(.dragging)')];

        return cards.reduce((closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = y - box.top - box.height / 2;
            if (offset < 0 && offset > closest.offset)
                return { offset: offset, element: child }
            else
                return closest;

        }, { offset: Number.NEGATIVE_INFINITY }).element;
    }

});