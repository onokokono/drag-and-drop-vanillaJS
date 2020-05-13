window.addEventListener('load', () => {

    const draggables = document.querySelectorAll('.draggable');
    const containers = document.querySelectorAll('.container');

    draggables.forEach(element => {
        element.addEventListener('dragstart', () => {
            element.classList.add('dragging');
        });
        element.addEventListener('dragend', () => {
            element.classList.remove('dragging');
        });
    });

    containers.forEach(container => {
        container.addEventListener('dragover', (event) => {
            const card = document.querySelector('.dragging');
            const afterElement = getAfterElement(container, event.clientY);
            if(!afterElement)
                container.appendChild(card);
            else
                container.insertBefore(card, afterElement);
        });
    });

    function getAfterElement(container, y) {
        const draggables = [...container.querySelectorAll('.draggable:not(.dragging)')];

        return draggables.reduce((closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = y - box.top - box.height/2;
            if(offset < 0 && offset > closest.offset)
                return {offset: offset, element: child};
            else return closest;

        }, { offset: Number.NEGATIVE_INFINITY }).element;
    };

});

