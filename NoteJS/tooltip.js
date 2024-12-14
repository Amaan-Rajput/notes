export const Tooltip = function ($Element) {
    const tooltip = document.createElement('span');
    tooltip.classList.add('tooltip');

    $Element.addEventListener('mouseenter', function () {
        tooltip.textContent = this.dataset.tooltip;

        const {
            top,
            height,
            left,
            width
        } = this.getBoundingClientRect();

        tooltip.style.top = top + height + 4 + 'px';
        tooltip.style.left = left + (width / 2) + 'px';
        tooltip.style.transfrom = 'translate(-50%, 0%)';
        document.body.appendChild(tooltip)
    });

    $Element.addEventListener('mouseleave', tooltip.remove.bind(tooltip));
}
