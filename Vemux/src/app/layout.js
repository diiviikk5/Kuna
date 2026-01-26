import './globals.css';

export const metadata = {
    title: 'Vemux - Product Demo Video Generator',
    description: 'Transform messy product context into clean, professional demo videos. Deliberate. Minimal. Founder-ready.',
    keywords: ['demo video', 'product video', 'saas', 'marketing', 'remotion'],
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className="antialiased">
                {children}
            </body>
        </html>
    );
}
