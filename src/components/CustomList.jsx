import React from 'react';

// Ця функція залишається. Вона важлива для видалення зайвих <p>
function unwrapParagraph(children) {
  const childArray = React.Children.toArray(children);
  
  // Якщо єдиний дочірній елемент - це <p>, повертаємо його вміст
  if (childArray.length === 1 && React.isValidElement(childArray[0]) && childArray[0].props.node?.tagName === 'p') {
    return childArray[0].props.children;
  }
  
  // Якщо всередині кілька <p> або інший контент, залишаємо як є.
  // Tailwind's `.prose` сам впорається з відступами між ними.
  return children;
}

export function CustomListItem({ children, ordered, index }) {
  return (
    // --- ГОЛОВНА ЗМІНА ТУТ ---
    // `items-baseline` вирівнює маркер і текст по базовій лінії першого рядка.
    // Це створює ідеально рівний вигляд.
    <li className="flex items-baseline gap-3 text-gray-300">
      {ordered ? (
        // Для нумерованого списку. `pt-1` може знадобитися для точного вирівнювання.
        <span className="w-6 text-right flex-shrink-0 text-gray-400 font-mono pt-1">{index + 1}.</span>
      ) : (
        // Для маркованого списку. `mt-1.5` залишаємо для вирівнювання іконки.
        <img src="/icons/point.png" alt="bullet" className="w-4 h-4 mt-1.5 invert flex-shrink-0" />
      )}
      
      {/* 
        Контейнер для тексту тепер має клас `flex-1`, щоб він займав весь доступний простір.
        Це важливо для правильної роботи з кількома абзацами.
      */}
      <div className="flex-1">
        {unwrapParagraph(children)}
      </div>
    </li>
  );
}

export function CustomList({ ordered, children, ...props }) {
  const ListTag = ordered ? 'ol' : 'ul';

  // --- ЗМІНА ТУТ ---
  // Додаємо `space-y-4` для рівномірного відступу між пунктами <li>
  return (
    <ListTag className="my-6 list-none pl-2">
      {React.Children.map(children, (child, index) => {
        if (React.isValidElement(child) && child.props.node?.tagName === 'li') {
          return React.cloneElement(child, {
            ...child.props,
            ordered: ordered,
            index: index,
          });
        }
        return child;
      })}
    </ListTag>
  );
}