type CrawlHeaderProps = {
    title: string;
    subtitle?: string;
};

export default function CrawlHeader({ title, subtitle }: CrawlHeaderProps) {
    return (
        <header className="relative overflow-hidden">
            {/* Background crawl */}
            <div className="absolute inset-0 bg-[length:200%_200%] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-90" />

            {/* Overlay */}
            <div className="relative z-10 px-6 py-10 text-white">
                <h1 className="text-2xl font-bold">{title}</h1>
                {subtitle && <p className="mt-1 text-sm text-white/80">{subtitle}</p>}
            </div>
        </header>
    );
}
