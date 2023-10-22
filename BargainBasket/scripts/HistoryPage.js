window.onload = function () {
    const groceryLists = [
        ['Milk', 'Eggs', 'Bread'],
        ['Apples', 'Bananas', 'Oranges'],
        ['Apples', 'Bananas', 'Oranges'],
    ];

    const groceryListDiv = document.querySelector('.Displaygrocerylists');

    for (const groceryList of groceryLists) {
        const newGroceryListDiv = document.createElement('div');
        newGroceryListDiv.classList.add('grocery-list-item');

        for (const groceryItem of groceryList) {
            const groceryItemDiv = document.createElement('div');
            groceryItemDiv.textContent = groceryItem;

            newGroceryListDiv.appendChild(groceryItemDiv);
        }

        groceryListDiv.appendChild(newGroceryListDiv);
    }

    // Calculate the height of the grocery list.
    let groceryListHeight = 0;

    for (const groceryListItem of groceryListItems) {
        groceryListHeight += groceryListItem.clientHeight;
    }

    // Set the height of the Displaygrocerylists div.
    groceryListDiv.style.height = groceryListHeight + 'px';
};
