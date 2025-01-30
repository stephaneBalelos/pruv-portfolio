import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'

export default <Partial<Config>>{
    theme: {
        extend: {
            colors: {
                'deco': {
                    '50': '#f6f9ec',
                    '100': '#e9f1d6',
                    '200': '#cade9c',
                    '300': '#bad383',
                    '400': '#9fc05b',
                    '500': '#81a43e',
                    '600': '#63822e',
                    '700': '#4d6427',
                    '800': '#3f5123',
                    '900': '#374522',
                    '950': '#1b250e',
                },
            }
        }
    },
    plugins: [
        require('@tailwindcss/typography'),
    ]
}
