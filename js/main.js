/*
grid.addEventListener('click', function (event) {
	if (event.target.tagName !== 'TH') return;

	let type = event.target.dataset.type;
	let index = event.target.cellIndex;

	sort(type, index, this);
});

function sort(type, index, table) {
	let arr = Array.from(table.tBodies[0].children);

	if (type === "number") {
		arr.sort((a, b) => a.cells[index].textContent - b.cells[index].textContent);
	}
	if (type === "string") {
		arr.sort((a, b) => a.cells[index].textContent > b.cells[index].textContent ? 1 : -1);
	}

	table.tBodies[0].append(...arr);
}
*/

// пример подсказки
let tooltip = document.createElement('div');
tooltip.className = "tooltip";
tooltip.innerHTML = "Tooltip";

// объект будет отслеживать движение мыши и вызывать функции over/out
/*new HoverIntent({
	elem,
	over() {
		tooltip.style.left = elem.getBoundingClientRect().left + 'px';
		tooltip.style.top = elem.getBoundingClientRect().bottom + 5 + 'px';
		document.body.append(tooltip);
	},
	out() {
		tooltip.remove();
	}
});*/

let currentDroppable = null;

ball.onmousedown = function (event) {

	let shiftX = event.clientX - ball.getBoundingClientRect().left;
	let shiftY = event.clientY - ball.getBoundingClientRect().top;

	ball.style.position = 'absolute';
	ball.style.zIndex = 1000;
	document.body.append(ball);

	onMouse(event.pageX, event.pageY);

	function onMouse(pageX, pageY) {
		ball.style.left = pageX - shiftX + 'px';
		ball.style.top = pageY - shiftY + 'px';
	}

	function onMouseMove(event) {
		onMouse(event.pageX, event.pageY);

		ball.hidden = true;
		let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
		ball.hidden = false;

		if (!elemBelow) return;

		let droppableBelow = elemBelow.closest('.droppable');

		if (currentDroppable != droppableBelow) {
			if (currentDroppable) {
				leaveDroppable(currentDroppable);
			}
			currentDroppable = droppableBelow;
			if (currentDroppable) {
				enterDroppable(currentDroppable);
			}
		}
	}

	document.addEventListener('mousemove', onMouseMove);

	ball.onmouseup = function () {
		document.removeEventListener('mousemove', onMouseMove);
	}

	function leaveDroppable(elem) {
		elem.style.background = '';
	}

	function enterDroppable(elem) {
		elem.style.background = 'pink';
	}

	ball.ondragstart = function () {
		return false;
	}
}