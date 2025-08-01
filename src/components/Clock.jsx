import { useState, useEffect } from 'react'

const Clock = () => {
    const [time, setTime] = useState(new Date())

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000)
        return () => clearInterval(timer)
    }, [])

    return (
        <div className="text-center mb-6">
            <p className="text-white/90 text-lg">
                {time.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
            <p className="text-white/90 text-4xl font-light">
                {time.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}
            </p>
        </div>
    )
}

export default Clock