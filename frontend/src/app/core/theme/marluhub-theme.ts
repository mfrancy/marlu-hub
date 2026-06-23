import { definePreset } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';

export const MarluHubTheme = definePreset(Aura, {
  semantic: {
    primary: {
      50: '{zinc.50}',
      100: '{zinc.100}',
      200: '{zinc.200}',
      300: '{zinc.300}',
      400: '{zinc.400}',
      500: '{zinc.500}',
      600: '{zinc.600}',
      700: '{zinc.700}',
      800: '{zinc.800}',
      900: '{zinc.900}',
      950: '{zinc.950}'
    },

    colorScheme: {
      light: {
        primary: {
          color: '{zinc.950}',
          hoverColor: '{zinc.900}',
          activeColor: '{zinc.800}'
        },

        highlight: {
          background: '{zinc.950}',
          focusBackground: '{zinc.800}',
          color: '#ffffff',
          focusColor: '#ffffff'
        },

        surface: {
          0: '#FFFFFF',
          50: '#FAFAFA',
          100: '#F4F4F5',
          200: '#E4E4E7',
          300: '#D4D4D8',
          400: '#A1A1AA',
          500: '#71717A',
          600: '#52525B',
          700: '#3F3F46',
          800: '#27272A',
          900: '#18181B',
          950: '#09090B'
        }
      },

      dark: {
        primary: {
          color: '{zinc.50}',
          hoverColor: '{zinc.100}',
          activeColor: '{zinc.200}'
        },

        highlight: {
          background: 'rgba(250,250,250,.16)',
          focusBackground: 'rgba(250,250,250,.24)',
          color: 'rgba(255,255,255,.87)',
          focusColor: 'rgba(255,255,255,.87)'
        }
      }
    }
  }
});