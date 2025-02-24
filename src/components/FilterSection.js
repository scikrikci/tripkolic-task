'use client';

export default function FilterSection({
    title,
    children,
    items = [],
    selectedItems = [],
    onToggle
}) {
    const handleToggle = (itemId) => {
        onToggle(prev => prev.includes(itemId)
            ? prev.filter(id => id !== itemId)
            : [...prev, itemId]
        );
    };

    return (
        <div>
            <h3 className="text-lg font-medium mb-3">{title}</h3>

            {children || (
                <div className="flex flex-wrap gap-2">
                    {items.map(item => (
                        <div key={item.id} className="flex">
                            <input
                                type="checkbox"
                                id={`filter-${item.id}`}
                                checked={selectedItems.includes(item.id)}
                                onChange={() => handleToggle(item.id)}
                                className="peer hidden"
                            />
                            <label
                                htmlFor={`filter-${item.id}`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleToggle(item.id);
                                }}
                                className="select-none cursor-pointer rounded-lg border-2 border-gray-200 py-2 px-4 font-medium text-gray-700 transition-colors duration-200 ease-in-out peer-checked:bg-orange-400 peer-checked:text-white peer-checked:border-orange-400 hover:bg-gray-100 active:scale-95"
                            >
                                {item.label}
                            </label>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};