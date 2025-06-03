export default function FeatureCard({ 
    items = [],
    title, 
    image, 
    description,
    buttonText = "Дізнатися більше",
    buttonLink = "/",
    textPosition = "right", // Can be 'left' or 'right'
    hideImageOnMobile = false,
    mirrorImage = false,
    showAsPoints = true, // true for points, false for paragraph
    showButton = true, // true to show button, false to hide
    showBackground = false // true to show background, false to hide
}) {
    if (!items) return null;

    const textBlock = (
        <div className={`flex flex-col justify-center items-center`}>
            <div className="w-full p-16 md:text-left max-w-[600px] mx-auto">
                <h2 className="text-2xl font-bold text-gray-200 mb-4">{title}</h2>
                {description && (
                    <p className="mt-4">{description}</p>
                )}
                {items.length > 0 && (
                    showAsPoints ? (
                        <ul className="mb-4 list-none list-inside">
                            {items.map((item, index) => (
                                <li key={index} className="mt-3 flex items-center">
                                    <img src="/icons/point.png" alt="Point icon" className="invert-[1] w-4 h-4 mr-2" />
                                    <span>{typeof item === 'string' ? item : item.title}</span>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className="mb-4">
                            {items.map((item, index) => (
                                <p key={index} className="mt-3">{typeof item === 'string' ? item : item.title}</p>
                            ))}
                        </div>
                    )
                )}
                {showButton && (
                    <a 
                        href={buttonLink} 
                        className="text-center inline-block mt-4 w-[250px] px-6 py-2 bg-[#c5629a] hover:bg-[#f390d0] text-gray-200 font-bold cornerCutSmall transition"
                    >
                        {buttonText}
                    </a>
                )}
            </div>
        </div>
    );

    const imageBlock = (
        <div className={`flex justify-center ${hideImageOnMobile ? 'hidden md:flex' : ''}`}>
            <img 
                src={image} 
                alt={title} 
                className={`fshadow-lg w-64 h-64 md:w-80 md:h-80 ${mirrorImage ? 'md:scale-x-[-1]' : ''}`}
            />
        </div>
    );

    return (
        <section className={`mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 items-center justify-items-center ${showBackground ? 'bg-green-900/20 px-6 py-6 rounded-lg shadow-md' : ''}`}>
            {textPosition === 'left' ? [
                textBlock,
                imageBlock
            ] : [
                imageBlock,
                textBlock
            ]}
        </section>
    );
}
