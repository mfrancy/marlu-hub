import { definePreset } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';

export const MarluHubTheme = definePreset(Aura, {
  semantic: {
    primary: {
      50: '#f1f7f3',
      100: '#dcece0',
      200: '#bad9c2',
      300: '#8ebf99',
      400: '#62a570',
      500: '#4C8B5B',
      600: '#2A5636',
      700: '#21442B',
      800: '#183220',
      900: '#102115',
      950: '#08100A'
    },

    colorScheme: {
      light: {
        surface: {
          0: '#FFFFFF',
          50: '#F8F7F3',
          100: '#F3F1EA',
          200: '#E8E3D7',
          300: '#DDD4C0',
          400: '#D6B775',
          500: '#C9A75D',
          600: '#B28F4A',
          700: '#8C6F39',
          800: '#665229',
          900: '#40331A'
        }
      }
    }
  }
});