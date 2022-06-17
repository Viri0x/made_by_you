module.exports = {
  mode: 'jit',
  purge: [],
  darkMode: true, // or 'media' or 'class'
  theme: {
	colors: {
      transparent: 'transparent',
      current: 'currentColor',
      mainColor: {
        light: '#000000',
        DEFAULT: '#000000',
        dark: '#000000',
      },
      mainBg: {
        light: '#ffffff',
        DEFAULT: '#ffffff',
        dark: '#ffffff',
      },
      activeColor: {
        light: '#777B59',
        DEFAULT: '#777B59',
        dark: '#777B59',
      },
       borderColor: {
        light: '#4B4B4B',
        DEFAULT: '#4B4B4B',
        dark: '#4B4B4B',
      },
      inputBg: {
        light: '#fff',
        DEFAULT: '#fff',
        dark: '#fff',
      },
      buttonBg: {
        light: '#fff',
        DEFAULT: '#fff',
        dark: '#fff',
      },
       buttonHoverBg: {
        light: '#fff',
        DEFAULT: '#fff',
        dark: '#fff',
      },
      gridBg: {
        light: '#f6f6f7',
        DEFAULT: '#f6f6f7',
        dark: '#f6f6f7',
      },
      gridBgAlter: {
        light: '#d7d7d6',
        DEFAULT: '#d7d7d6',
        dark: '#d7d7d6',
      },
      modalBg: {
		  light: 'rgba(254,254,254,0.75)',
		  DEFAULT: 'rgba(254,254,254,0.75)',
		  dark: 'rgba(254,254,254,0.75)',
      },
      error: {
        light: '#c31c09',
        DEFAULT: '#c31c09',
        dark: '#c31c09',
      },
      white: {
        light: '#ffffff',
        DEFAULT: '#ffffff',
        dark: '#ffffff',
      },
      black: {
        light: '#000000',
        DEFAULT: '#000000',
        dark: '#000000',
      }
    },
    fontSize: {
	  sm_sm: ['12px', '14px'],
      base_sm: ['15px', '17px'],
      lg_sm: ['17px', '19px'],
      titre_sm: ['20px', '22px'],
      xl_sm: ['28px', '30px'],
      sm: ['11px', '13px'],
      base: ['14px', '16px'],
      lg: ['26px', '28px'],
      xl: ['28px', '30px'],
    },
    extend: {
	    fontFamily: {
	      'sans': ['IBMPlexSans-Regular', 'Helvetica', 'Arial', 'sans-serif'],
	      'serif': ['IBMPlexSans-Regular', 'Helvetica', 'Arial', 'sans-serif']
	    },
	    width: {
	        '30': '30px',
	        '45': '45px',
	    }
	    ,
	    spacing: {
	        '30': '30px',
	        '45': '45px',
	    }
    }
  },
  variants: {
    extend: {},
  },
  plugins: [
	  require('@tailwindcss/forms'),
  ],
  corePlugins: {
      // ...
    }
}
