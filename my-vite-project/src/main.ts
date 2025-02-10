import './style.css';

function setupNameInput(container: HTMLDivElement) {
  const card = document.createElement('div');
  card.classList.add('bg-white', 'shadow-lg', 'rounded-2xl', 'p-6', 'max-w-sm', 'text-center', 'space-y-4');
  
  const title = document.createElement('h2');
  title.textContent = 'Greetings my frienibels!';
  title.classList.add('text-xl', 'font-semibold');
  
  const input = document.createElement('input');
  input.type = 'text';
  input.placeholder = 'Enter player name';
  input.id = 'nameInput';
  input.classList.add('input-style', 'border', 'border-gray-300', 'rounded-lg', 'p-2', 'w-full');

  const button = document.createElement('button');
  button.textContent = 'gorabels!';
  button.classList.add('button-style', 'bg-blue-500', 'text-white', 'rounded-lg', 'px-4', 'py-2', 'hover:bg-blue-600');
  
  const output = document.createElement('p');
  output.id = 'nameOutput';
  output.classList.add('text-gray-700', 'font-medium');
  
  button.addEventListener('click', () => {
    output.textContent = `Hello, ${input.value}!`;
  });

  card.appendChild(title);
  card.appendChild(input);
  card.appendChild(button);
  card.appendChild(output);
  container.appendChild(card);
}

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div id="nameContainer" class="flex justify-center items-center min-h-screen bg-gray-100"></div>
`;

setupNameInput(document.querySelector<HTMLDivElement>('#nameContainer')!);
