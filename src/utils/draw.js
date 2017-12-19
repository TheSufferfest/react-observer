import { hand, paint, check, clock, chevron_up, download, trash } from './svg-icons.js';

export const createElement = (type, text, class_name, svg) => {
  let element = document.createElement(type);

  if (text && type !== 'svg') {
    let label = document.createTextNode(text);
    element.appendChild(label);
  }

  if (class_name) {
    element.classList.add(class_name);
  }

  if (type === 'svg') {
    element.innerHTML = svg;
  };

  return element;
};

export const createButton = (click_event, class_name, svg) => {
  let button = document.createElement('button');

  switch (svg) {
    case 'chevron_up':
      button.innerHTML = chevron_up;
      break;
    case 'download':
      button.innerHTML = download;
      break;
    case 'trash':
      button.innerHTML = trash;
      break;
  }

  button.classList.add(class_name);
  button.onclick = click_event;

  return button;
};

export const createComplexElement = (title, render_time, paint_time, total_time, is_render_good, is_paint_good) => {
  let line_ele = createElement('p', null, 'line'),
      title_ele = createElement('span', title, 'title'),
      icon_ele = createElement('svg', null, null, hand),
      paragraph_ele = createElement('span', render_time);

  if (is_render_good) {
    icon_ele.classList.add('good');
  } else {
    icon_ele.classList.add('bad');
  }

  if (!paint_time && !total_time) {
    icon_ele = createElement('svg', null, null, clock);
  }

  line_ele.appendChild(title_ele);
  line_ele.appendChild(icon_ele);
  line_ele.appendChild(paragraph_ele);

  if (paint_time) {
    let icon_2_ele = createElement('svg', null, null, paint),
        paragraph_2_ele = createElement('span', paint_time);

    if (is_paint_good) {
      icon_2_ele.classList.add('good');
    } else {
      icon_2_ele.classList.add('bad');
    }

    line_ele.appendChild(icon_2_ele);
    line_ele.appendChild(paragraph_2_ele);
  }

  if (total_time) {
    let icon_3_ele = createElement('svg', null, null, check),
        paragraph_3_ele = createElement('span', total_time);

    line_ele.appendChild(icon_3_ele);
    line_ele.appendChild(paragraph_3_ele);
  }

  return line_ele;
};
