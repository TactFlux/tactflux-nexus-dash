
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				sans: ['Inter', 'system-ui', 'sans-serif'],
				mono: ['JetBrains Mono', 'monospace'],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				tactflux: {
					black: '#0D0D0D',
					gray: '#1E1E1E',
					turquoise: '#00FFFF',
					violet: '#8B5CF6',
					pink: '#FF007F',
				},
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
				xl: '16px',
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' },
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' },
				},
				'pulse-glow': {
					'0%': { boxShadow: '0 0 5px rgba(0, 255, 255, 0.3)' },
					'50%': { boxShadow: '0 0 20px rgba(0, 255, 255, 0.6)' },
					'100%': { boxShadow: '0 0 5px rgba(0, 255, 255, 0.3)' },
				},
				'slide-up': {
					from: { transform: 'translateY(10px)', opacity: '0' },
					to: { transform: 'translateY(0)', opacity: '1' },
				},
				'fade-in': {
					from: { opacity: '0' },
					to: { opacity: '1' },
				},
				'background-shine': {
					from: { backgroundPosition: '200% 0' },
					to: { backgroundPosition: '0% 0' },
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'pulse-glow': 'pulse-glow 3s infinite',
				'slide-up': 'slide-up 0.4s ease-out',
				'fade-in': 'fade-in 0.4s ease-out',
				'background-shine': 'background-shine 3s linear infinite',
			},
			boxShadow: {
				'card': '0 8px 16px rgba(0, 0, 0, 0.7)',
				'glow': '0 0 15px rgba(139, 92, 246, 0.5)',
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
				'turquoise-pink': 'linear-gradient(45deg, #00FFFF, #FF007F)',
				'violet-pink': 'linear-gradient(45deg, #8B5CF6, #FF007F)',
				'turquoise-violet': 'linear-gradient(45deg, #00FFFF, #8B5CF6)',
				'shine': 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
			},
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
