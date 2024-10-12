export const getColorClass = (color: string) => {
  switch (color) {
    case 'monochrome':
      return 'bg-white text-black';
    case 'midnight':
      return 'bg-gray-900 text-white';
    case '2000':
      return 'bg-blue-500 text-white';
    case 'electric purple':
      return 'bg-purple-600 text-white';
    default:
      return 'bg-white text-black';
  }
};

export const getFontClass = (font: string) => {
  switch (font) {
    case 'cvpage':
      return 'inherit';
    case 'serif':
      return 'font-serif';
    case 'mono':
      return 'font-mono';
    default:
      return 'font-sans';
  }
};