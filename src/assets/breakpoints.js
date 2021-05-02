const breakpoint = function(point) {
  if (point === 'xs') {
    return `screen and (max-width: 768px)`;
  }

  if (point === 'sm') {
    return `screen and (min-width: 769px)`;
  }

  if (point === 'md') {
    return `screen and (min-width: 992px)`;
  }

  if (point === 'lg') {
    return `screen and (min-width: 1200px)`;
  }

  return `content: 'Breakpoint mixin supports: xs, sm, md, lg'`;
};

export default breakpoint;