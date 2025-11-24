import { useEffect, useRef, useState } from "react"

export const useInView = () => {
    const ref = useRef(null)
    const [visible, setVisible] = useState(false)
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                setVisible(true)
                observer.unobserve(ref.current)
            } 
        }, { threshold: 0.4 })
        observer.observe(ref.current)
        return () => observer.disconnect()
    }, [])

    return [ref, visible]
}


export const useSlideUp = (visible) => ({
    opacity: visible ? 1 : 0,
    animation: visible && 'slideup 2s ease',
    '@keyframes slideup': {
        '0%': {
            transform: 'translateX(-400px)'
        },
        '100%': {
            transform: 'translate(0)'
        }
    }
})