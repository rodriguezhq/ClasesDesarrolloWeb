const layoutCopy = {
	grid: {
		text: 'Grid sirve para organizar la estructura general de la página en filas y columnas.',
		points: [
			'Ideal para estructuras de dos dimensiones.',
			'Permite definir áreas claras con grid-template-areas.',
			'Funciona muy bien para el layout principal.',
		],
	},
	flex: {
		text: 'Flexbox sirve para alinear y distribuir elementos en una sola dirección, horizontal o vertical.',
		points: [
			'Ideal para componentes internos como nav, botones y cards.',
			'Alinea elementos con mucho control sin complicar la estructura.',
			'Funciona mejor para una dimensión.',
		],
	},
};

const layoutText = document.querySelector('#layout-guide-text');
const layoutPoints = document.querySelector('#layout-guide-points');
const layoutButtons = document.querySelectorAll('.layout-button');

if (layoutText && layoutPoints && layoutButtons.length) {
	const renderLayout = (mode) => {
		const content = layoutCopy[mode];

		layoutText.textContent = content.text;
		layoutPoints.innerHTML = content.points.map((point) => `<li>${point}</li>`).join('');

		layoutButtons.forEach((button) => {
			button.classList.toggle('is-active', button.dataset.layout === mode);
		});
	};

	layoutButtons.forEach((button) => {
		button.addEventListener('click', () => {
			renderLayout(button.dataset.layout);
		});
	});

	renderLayout('grid');
}
