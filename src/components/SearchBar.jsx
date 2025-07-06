const SearchBar = ({ onSearch }) => {
    const handleSubmit = (e) => {
        e.preventDefault()
        const city = e.target.city.value.trim()
        if (city) {
            onSearch(city)
            e.target.city.value = ''
        }
    }

    return (
        <form onSubmit={handleSubmit} className="mb-6">
            <div className="relative">
                <input
                    type="text"
                    name="city"
                    autoComplete="off"
                    placeholder="Search for a city..."
                    className="w-full px-4 py-3 rounded-lg bg-white/20 backdrop-blur-md text-white placeholder-white/70 outline-none focus:ring-2 focus:ring-white/50"
                />
                <button
                    type="submit"
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-white hover:text-white/70 transition-colors"
                >
                    🔍
                </button>
            </div>
        </form>
    )
}

export default SearchBar